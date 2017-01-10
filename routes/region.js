function getRouter(router, database){
	router.get('/region/upload', function(req, res, next) {
		res.render('uploadregion');
	});
	
	router.post('/region/upload', function(req, res, next) {
		validateObj.upload(req.body)
			.then(insertSubmission.bind(null, req.session.userid))
			.then(insertSubRegions)
			.then(function(){
				res.send({redirect: true})
			})
			.catch(function(obj){
				res.send(obj)
			})
	});
	
	router.get('/region/edit/:subid', function(req, res, next) {
		getSubmissionInfo(req.params.subid)
			.then(function(submission){
				var permissions = getPermissions(req.session.userid, req.session.admin, submission.user_id);
				if (!permissions.none){
					res.render('regionedit', {
						subid: req.params.subid,
						permissions: permissions
					});
				}else {
					res.send(permissions);
				}
			})
			.catch(function(err){
				res.send(err.message);
			});
		return;
	});
	
	
	router.post('/region/edit', function(req, res, next){
		req.body.userid = req.session.userid;
		req.body.admin =  req.session.admin;
		validateObj.upload(req.body)
			.then(getSubmissionInfo)
			.then(checkValidAction.bind(null, req.body.action, req.session.userid, req.session.admin))
			.then(function(action){
				if (action == 'save'){
					deleteSubRegions(req.body)
						.then(modifySubmission)
						.then(insertSubRegions)
						.then(function(){
							res.send({redirect: true})
						})
				}
				if (action == 'delete'){
					deleteSubRegions(req.body)
						.then(deleteSubmission)
						.then(function(){
							res.send({redirect: true})
						})
				}
				if (action == 'approve'){
					markSubmission("a", req.body)
						.then(insertRegions)
						.then(function(){
							res.send({redirect: true})
						})
				}
				if (action == 'reject'){
					markSubmission("r", req.body)
						.then(function(){
							res.send({redirect: true})
						})
				}
				
			})
			.catch(function(err){
				console.log(err.message);
				res.send(err)
			})
	});
	
	router.post('/region/subregions', function(req, res, next){
		getSubRegions(req.body.subid)
			.then(function(arr){
				res.send(arr);
			})
	});
	
	var validateObj = (function(){
		var getValidator = require('../modules/getvalidator');
		var validate = {};
		validate.upload = getValidator("regionupload");
		return validate;
	})();
	
	function getSubRegions(subid){
		return new Promise(function(resolve, reject){
			database.mysql.query('SELECT name, region_type_id, parent_id FROM sub_regions WHERE sub_id = ?', 
			[subid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				resolve(result);
			}
		});
	}
	
	function insertSubmission(userid, body){
		return new Promise(function(resolve, reject){
			database.mysql.query('INSERT INTO submissions (user_id, date_sub, type, status) VALUES (?, now(), "r", "w")', 
			[userid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				body.subid = result.insertId;
				resolve(body);
			}
		});
	}
	function modifySubmission(body){
		return new Promise(function(resolve, reject){
			database.mysql.query('UPDATE submissions SET date_mod = now() WHERE id = ?', [body.subid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				resolve(body);
			}
		});
	}
	function markSubmission(status, body){
		return new Promise(function(resolve, reject){
			database.mysql.query('UPDATE submissions SET status = ? WHERE id = ?', [status, body.subid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				resolve(body);
			}
		});
	}
	function deleteSubmission(body){
		return new Promise(function(resolve, reject){
			database.mysql.query('DELETE FROM submissions WHERE id = ?', [body.subid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				resolve(body);
			}
		});
	}
	
	
	function checkValidAction(body){
		if (body.submission.type != "r"){
			throw Error("Submission type is not a region");
		}
		if (body.submission.status != "w"){
			throw Error("Submission is not waiting for approval");
		}
		var permissions = getPermissions(body.userid, body.admin, body.submission.user_id);
		if (permissions[action]){
			return action;
		}
		else{
			throw Error("You do not have permission to perform this action");
		}
	}
	
	function getPermissions(userid, admin, submitter_id){
		var permissions = {}
		if (userid == submitter_id){
			permissions.save = true;
			permissions.delete = true;
			if (admin >= 10){
				permissions.approve = true;
			}
		}
		else if (admin >= 5){
			permissions.approve = true
			permissions.reject = true;
		}
		else {
			permissions.none = true;
		}
		return permissions
	}
	
	function getSubmissionInfo(body){
		return new Promise(function(resolve, reject){	
			if (!/\d+/.test(subid)){
				reject({message: "invalid submission id"});
				return;
			}
			database.mysql.query("SELECT user_id, type, status FROM submissions WHERE id = ?", 
				[subid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: " + err.message});
					return;
				}
				if (result.length == 0) {
					reject({message: "submission not found"});
					return;
				}
				body.submission = result[0];
				resolve(body);
			}
		});
	}
	
	function insertRegions(body){
		var sql = 'INSERT INTO regions (sub_id, parent_id, region_type_id, name) VALUES '
		for (var i = 0; i < body.data.length; i++){
			sql += "(" + body.subid + "," + body.parent + "," + body.type + "," + database.mysql.escape(body.data[i]) + "),"
		}
		sql = sql.substring(0, sql.length - 1);
		return new Promise(function(resolve, reject){	
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: " + err.message});
					return;
				}
				resolve(body);
			}
		});
	}
	
	function insertSubRegions(body){
		var sql = 'INSERT INTO sub_regions (sub_id, parent_id, region_type_id, name) VALUES '
		for (var i = 0; i < body.data.length; i++){
			sql += "(" + body.subid + "," + body.parent + "," + body.type + "," + database.mysql.escape(body.data[i]) + "),"
		}
		sql = sql.substring(0, sql.length - 1);
		return new Promise(function(resolve, reject){	
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: " + err.message});
					return;
				}
				resolve();
			}
		});
	}
	
	function deleteSubRegions(body){
		return new Promise(function(resolve, reject){	
			database.mysql.query('DELETE FROM sub_regions WHERE sub_id = ?', [body.subid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: " + err.message});
					return;
				}
				resolve(body);
			}
		});
	}
	
	return router;
}




module.exports = {
	getRouter: getRouter
};
