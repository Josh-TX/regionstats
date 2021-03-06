function getRouter(router, database){
	//make sure the user is logged in
	var globalResponse;
	router.all("*", function(req, res, next) {
		globalResponse = res;
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

	router.get('/upload', function(req, res, next) {
		res.render('regionupload', {
			title: "RegionStats"
		});
	});

	router.get('/edit/:subid', function(req, res, next) {
		getSubmissionInfo(req.params)
			.then(function(body){
				var permissions = getPermissions(req.session.userid, req.session.admin, body.submission.user_id);
				if (!permissions.none){
					res.render('regionedit', {
						subid: req.params.subid,
						permissions: permissions,
						title: "RegionStats"
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
	
	
	router.post('/upload', function(req, res, next) {
		req.body.userid = req.session.userid;
		req.body.submissionType = 'r';
		validateUpload(req.body)
			.then(submissions.insert)
			.then(insertSubRegions)
			.then(function(){
				req.session.message = "Region Successfully Uploaded!";
				res.send({redirect: "/dashboard"})
			})
			.catch(errorHandler)
	});	
	
	router.post('/edit', function(req, res, next){
		req.body.userid = req.session.userid;
		req.body.admin =  req.session.admin;
		validateUpload(req.body)
			.then(getSubmissionInfo)
			.then(checkValidAction)
			.then(function(body){
				if (body.action == 'save'){
					deleteSubRegions(body)
						.then(modifySubmission)
						.then(insertSubRegions)
						.then(function(){
							req.session.message = "Changes Saved";
							res.send({redirect: "/dashboard"})
						})
						.catch(errorHandler)
				}
				if (body.action == 'delete'){
					deleteSubRegions(body)
						.then(deleteSubmission)
						.then(function(){
							req.session.message = "Submission Deleted";
							res.send({redirect: "/dashboard"})
						})
						.catch(errorHandler)
				}
				if (body.action == 'approve'){
					markSubmission("a", body)
						.then(insertRegions)
						.then(insertRegionGroup)
						.then(function(){
							req.session.message = "Submission Approved";
							res.send({redirect: "/dashboard"})
						})
						.catch(errorHandler)
				}
				if (body.action == 'reject'){
					markSubmission("r", body)
						.then(function(){
							req.session.message = "Submission Rejected";
							res.send({redirect: "/dashboard"})
						})
						.catch(errorHandler)
				}
				
			})
			.catch(errorHandler)
	});
	
	router.post('/subregions', function(req, res, next){
		getSubRegions(req.body.subid)
			.then(function(arr){
				res.send(arr);
			})
			.catch(errorHandler)
	});
	
	function errorHandler(obj){
		console.log("errorHandler: " + obj.message + " : " + JSON.stringify(obj));
		globalResponse.send(obj);
	}

	//getValidator is a function that takes in a filename and returns a function that returns a promise
	var getValidator = require('../modules/getvalidator');
	var validateUpload = getValidator("regionupload");
	
	var submissions = require('../modules/submissions').getFunctions(database);
	/*
	available functions:

	.insert EXPECTS: .userid, .submissionType, ADDS: .subid
	.changeDate EXPECTS: obj.subid
	.changeStatus EXPECTS: obj.userid, obj.subid, obj.status
	.delete EXPECTS: obj.subid
	*/
	
	function getSubRegions(subid){
		return new Promise(function(resolve, reject){
			database.mysql.query('SELECT name, region_type_id AS type, parent_id AS parent FROM sub_regions WHERE sub_id = ?', 
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
		if (body.submission.type != "r"){
			throw Error("Submission type is not a region");
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
					reject({message: "Submission not found"});
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
	
	function insertRegionGroup(body){
		return new Promise(function(resolve, reject){	
			database.mysql.query('SELECT id FROM region_groups WHERE region_id = ? AND region_type_id = ?', 
				[body.parent, body.type], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: " + err.message});
					return;
				}
				if (result.length > 0){ //region group already exists
					resolve(body);
					return;
				}
				database.mysql.query('INSERT INTO region_groups (sub_id, region_id, region_type_id) VALUES (?, ?, ?)', 
					[body.subid, body.parent, body.type], insertionHandler);
			}
			function insertionHandler(err, result){
				if (err){
					reject({message: "internal database error: " + err.message});
					return;
				}
				console.log("region group inserted")
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
