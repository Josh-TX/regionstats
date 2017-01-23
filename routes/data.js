function getRouter(router, database){
	router.all("*", function(req, res, next) {
		
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
		res.render('dataupload', {
			title: "RegionStats"
		});
	});
	
	router.post('/upload', function(req, res, next) {
		req.body.userid = req.session.userid;
		req.body.type = "d";
		validateUpload(req.body)
			.then(submissions.insert)
			.then(insertSubTitles)
			.then(insertSubStats)
			.then(function(){
				req.session.message = "data successfully uploaded!";
				res.send({redirect: "/dashboard"})
			})
			.catch(function(obj){
				console.log("ERROR MESSAGE: " + obj.message)
				res.send(obj)
			})
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
	
	
	router.post('/edit', function(req, res, next){
		res.send("not supported")
		return;
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
	
	//getValidator is a function that takes in a filename and returns a function that returns a promise
	var getValidator = require('../modules/getvalidator');
	validateUpload = getValidator("dataupload");
	
	
	
	var submissions = require('../modules/submissions').getFunctions(database);
	/*
	available functions:

	.insert EXPECTS: .userid, .type, ADDS: .subid
	.changeDate EXPECTS: obj.subid
	.changeStatus EXPECTS: obj.userid, obj.subid, obj.status
	.delete EXPECTS: obj.subid
	*/
	
	
	
	
	
	function insertSubTitles(body){
		console.log("subtitles")
		return new Promise(function(resolve, reject){		
			var sql = "INSERT INTO sub_titles (sub_id, category_id, name) VALUES "
			for (var i = 0; i < body.titles.length; i++){
				if (body.titles[i].id > 0){
					continue;
				}
				sql += "(" + body.subid + "," + body.cats[i] + "," + database.mysql.escape(body.titles[i].name) + "),"
			}
			sql = sql.substring(0, sql.length - 1);
			console.log(sql);
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				var insertId = result.insertId;
				for (var i = body.titles.length - 1; i >= 0; i--){
					if (body.titles[i].id > 0){
						continue;
					}
					body.titles[i].id = -insertId;
					insertId--;
				}		
				resolve(body);
			}
		});
	}
	
	function insertSubStats(body){
		return new Promise(function(resolve, reject){		
			var sql = "INSERT INTO sub_stats (sub_id, title_id, source_id, year) VALUES "
			for (var i = 0; i < body.titles.length; i++){
				sql += "(" + body.subid + "," + body.titles[i].id + "," + 0 + "," + body.years[i] + "),"
			}
			sql = sql.substring(0, sql.length - 1);
			console.log(sql);
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				var body.stats = [];
				var insertId = result.insertId;
				for (var i = 0; i < body.titles.length; i++){
					body.stats.unshift(insertId);
					insertId--;
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
					reject({message: "submission not found"});
					return;
				}
				body.submission = result[0];
				resolve(body);
			}
		});
	}
	
	
	
	return router;
}




module.exports = {
	getRouter: getRouter
};
