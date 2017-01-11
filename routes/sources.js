function getRouter(router, database){
	router.all("/source", function(req, res, next) {
		if (req.session.userid > 0){
			next();
		}
		else {
			req.session.message = "You must be logged in to view that page";
			if (req.method == "GET"){
				res.redirect("/login");
			}else {
				res.send({redirect: "/login"});
			}	
		}
	});

	
	router.get('/source/upload', function(req, res, next) {
		res.render('sourceupload');
	});
	
	router.post('/source/upload', function(req, res, next) {
		validateObj.upload(req.body)
			.then(insertSubmission.bind(null, req.session.userid))
			.then(insertSubSources)
			.then(function(){
				req.session.message = "source successfully uploaded!";
				res.send({redirect: "/dashboard"})
			})
			.catch(function(obj){
				res.send(obj)
			})
	});
	
	router.get('/source/edit/:subid', function(req, res, next) {
		getSubmissionInfo(req.params)
			.then(function(body){
				var permissions = getPermissions(req.session.userid, req.session.admin, body.submission.user_id);
				if (!permissions.none){
					res.render('sourceedit', {
						subid: req.params.subid,
						permissions: permissions
					});
				}else {
					req.session.message = "You do not have permission to edit this submission!";
					res.redirect('/dashboard');
				}
			})
			.catch(function(err){
				res.send(err.message);
			});
		return;
	});
	
	
	router.post('/source/edit', function(req, res, next){
		req.body.userid = req.session.userid;
		req.body.admin =  req.session.admin;
		validateObj.upload(req.body)
			.then(getSubmissionInfo)
			.then(checkValidAction)
			.then(function(body){
				if (body.action == 'save'){
					deleteSubRegions(body)
						.then(modifySubmission)
						.then(insertSubRegions)
						.then(function(){
							req.session.message = "changes saved";
							res.send({redirect: "/dashboard"})
						})
				}
				if (body.action == 'delete'){
					deleteSubRegions(body)
						.then(deleteSubmission)
						.then(function(){
							req.session.message = "submission deleted";
							res.send({redirect: "/dashboard"})
						})
				}
				if (body.action == 'approve'){
					markSubmission("a", body)
						.then(insertRegions)
						.then(function(){
							req.session.message = "submission approved";
							res.send({redirect: "/dashboard"})
						})
				}
				if (body.action == 'reject'){
					markSubmission("r", body)
						.then(function(){
							req.session.message = "submissin rejected";
							res.send({redirect: "/dashboard"})
						})
				}
				
			})
			.catch(function(err){
				res.send(err)
			})
	});
	
	router.post('/source/subsources', function(req, res, next){
		getSubSources(req.body.subid)
			.then(function(arr){
				res.send(arr);
			})
			.catch(function(err){
				res.send(err);
			})
	});
	
	var validateObj = (function(){
		var getValidator = require('../modules/getvalidator');
		var validate = {};
		validate.upload = getValidator("sourceupload");
		return validate;
	})();
	
	function getSubSources(subid){
		return new Promise(function(resolve, reject){
			database.mysql.query('SELECT region_id, publisher, title, url FROM sub_sources WHERE sub_id = ?', 
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
			database.mysql.query('INSERT INTO submissions (user_id, date_sub, type, status) VALUES (?, now(), "s", "w")', 
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
			database.mysql.query('UPDATE submissions SET status = ?, date_eval = now(), admin_id = ? WHERE id = ?', 
				[status, body.userid, body.subid], databaseHandler);
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
		if (body.submission.type != "s"){
			throw Error("Submission type is not a source");
		}
		if (body.submission.status != "w"){
			throw Error("Submission is not waiting for approval");
		}
		var permissions = getPermissions(body.userid, body.admin, body.submission.user_id);
		if (permissions[body.action]){
			return body;
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
			if (!/\d+/.test(body.subid)){
				reject({message: "invalid submission id"});
				return;
			}
			database.mysql.query("SELECT user_id, type, status FROM submissions WHERE id = ?", 
				[body.subid], databaseHandler);
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
	
	function insertSources(body){
		var sql = 'INSERT INTO sources (sub_id, parent_id, region_type_id, name) VALUES '
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
	
	function insertSubSources(body){
		var sql = 'INSERT INTO sub_sources (sub_id, region_id, publisher, title, url) VALUES ';
		sql += "(" + body.subid + "," + body.parent + "," + body.type + "," + database.mysql.escape(body.title) + "," + database.mysql.escape(body.url) + ")";
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
	
	function deleteSubSources(body){
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