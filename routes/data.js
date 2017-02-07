function getRouter(router, database){
	
	router.all("*", function(req, res, next) {
		next();return;
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
			title: "RegionStats",
			permissions: {},
			subid: 0
		});
	});
	router.get('/edit/:subid', function(req, res, next) {
		submissions.getInfo(req.params)
			.then(function(body){
				var permissions = submissions.getPermissions(req.session.userid, req.session.admin, body.submission.user_id);
				if (!permissions.none){
					res.render('dataupload', {
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
		console.log("post upload")
		req.body.userid = req.session.userid;
		req.body.submissionType = "d";
		validateUpload(req.body)	
			.then(submissions.insert)
			.then(insertSubStats)
			.then(insertSubData)
			.then(function(){
				req.session.message = "data successfully uploaded!";
				res.send({redirect: "/dashboard"})
			})
			.catch(function(obj){
				console.log("ERROR MESSAGE: " + obj.message + " : " + JSON.stringify(obj))
				res.send(obj)
			})
	});
	
	/*
	.statCount
	.cats
	.titles
	.years
	.criteria
	.action
	.subid
	*/
	router.post('/edit', function(req, res, next){
		console.log("post edit")
		req.body.userid = req.session.userid;
		req.body.admin =  req.session.admin;
		req.body.submissionType = "d";
		validateUpload(req.body)
			.then(submissions.getInfo)
			.then(submissions.checkValidAction)
			.then(function(body){
				if (body.action == 'save'){
					console.log("not supported yet");
					return;
					deleteSubRegions(body)
						.then(modifySubmission)
						.then(insertSubRegions)
						.then(function(){
							req.session.message = "changes saved";
							res.send({redirect: "/dashboard"})
						})
				}
				if (body.action == 'delete'){
					console.log("not supported yet");
					return;
					deleteSubRegions(body)
						.then(deleteSubmission)
						.then(function(){
							req.session.message = "submission deleted";
							res.send({redirect: "/dashboard"})
						})
				}
				if (body.action == 'approve'){
					body.status = "a";
					submissions.changeStatus(body)
						.then(insertTitles)
						.then(insertStats)
						.then(insertCriteria)
						.then(insertCriteriaItems)
						.then(insertData)
						.then(function(){
							req.session.message = "submission approved";
							res.send({redirect: "/dashboard"})
						})
						.catch(function(err){
							console.log("CATCH: " + err.message + " : " + JSON.stringify(err))
							res.send(err);
						});
				}
				if (body.action == 'reject'){
					body.status = "r";
					submissions.changeStatus(body)
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
	
	router.post('/subdata', function(req, res, next) {
		Promise.all([
			getSubStats(req.body.subid),
			getSubData(req.body.subid)
		])
			.then(function(arr){
				console.log("sending subdata")
				res.send({
					stats: arr[0],
					data: arr[1]
				});
			})
			.catch(function(err){
				console.log("error: " + err);
			})
	});
	
	//getValidator is a function that takes in a filename and returns a function that returns a promise
	var getValidator = require('../modules/getvalidator');
	var validateUpload = getValidator("dataupload");
	
	var submissions = require('../modules/submissions').getFunctions(database);
	/*
	available functions:
	
	.insert(obj) EXPECTS: obj.userid, .submissionType, ADDS: .subid
	.changeDate(obj) EXPECTS: obj.subid
	.changeStatus(obj) EXPECTS: obj.userid, obj.subid, obj.status
	.delete(obj) EXPECTS: obj.subid
	.getInfo(obj) EXPECTS: obj.subid, ADDS: obj.submission{.user_id, .type, .status}
	.checkValidAction(obj) EXPECTS  obj.submissionType, obj.userid, obj.admin, obj.action, obj.submission{...}
	.getPermissions(userid, admin, submitterid) RETURNS permission {.save, .approve, .reject, .delete, .none}
	
	*/
	
	
	
	
	function insertSubStats(body){
		return new Promise(function(resolve, reject){
			console.log("title array: " + JSON.stringify(body.titles))
			var sql = "INSERT INTO sub_stats (sub_id, source_id, category_id, year, title, criteria) VALUES "
			for (var i = 0; i < body.statCount; i++){
				sql += "(" + body.subid + "," + 0 + "," + body.cats[i] + "," + body.years[i] + "," + database.mysql.escape(body.titles[i]) + ",'" + JSON.stringify(body.criteria[i]) + "'),"
			}
			sql = sql.substring(0, sql.length - 1);
			console.log("sub stats: " + sql);
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				console.log("sub stats handler")
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				body.stats = [];
				var insertId = result.insertId;
				console.log("before substat insertid = " + insertId + " : " + result.insertId)
				for (var i = 0; i < body.titles.length; i++){
					body.stats.push(insertId);
					insertId++;
				}
				console.log("after substat insertid = " + insertId)
				resolve(body);
			}
		});
	}
	function insertSubData(body){
		return new Promise(function(resolve, reject){
			console.log(body.data.length + " : " + body.stats.length)
			var sql = "INSERT INTO sub_data (sub_id, sub_stat_id, region_id, val) VALUES "
			for (var i = 0; i < body.data.length; i++){
				for (var j = 0; j < body.data[i].values.length; j++){
					if (typeof body.data[i].values[j] != "number"){
						console.log("i = " + i + ", j = " + j);
						continue;
					}
					sql += "(" + body.subid + "," + body.stats[j] + "," + body.data[i].id + "," + body.data[i].values[j] + "),";
				}
			}
			sql = sql.substring(0, sql.length - 1);
			console.log("sub data: " + sql);
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				console.log("sub data handler")
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				/*why is this here?
				body.stats = [];
				var insertId = result.insertId;
				for (var i = 0; i < body.titles.length; i++){
					body.stats.unshift(insertId);
					insertId--;
				}
				*/
				resolve(body);
			}
		});
	}	
	
	
	function getSubStats(subid){
		return new Promise(function(resolve, reject){
			database.mysql.query('SELECT id, source_id, category_id, year, title, criteria FROM sub_stats WHERE sub_id = ?', 
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
	function getSubData(subid){
		return new Promise(function(resolve, reject){
			database.mysql.query('SELECT sub_stat_id, region_id, val FROM sub_data WHERE sub_data.sub_id = ?', 
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
	
	function insertTitles(body){
		return new Promise(function(resolve, reject){
			var sql = "INSERT INTO titles (sub_id, category_id, name) VALUES ";
			var insertionCount = 0;
			for (var i = 0; i < body.statCount; i++){
				if (typeof body.titles[i] == "number"){
					console.log("before continuing " + body.titles[i]);
					continue;
				}
				insertionCount++;
				sql += "(" + body.subid + "," + body.cats[i] + "," + database.mysql.escape(body.titles[i]) + "),"
			}
			sql = sql.substring(0, sql.length - 1);
			console.log("titles: " + sql);
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				console.log("title handler")
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				var insertId = result.insertId;
				console.log("before title insertid = " + insertId + " : " + result.insertId)
				for (var i = 0; i < body.statCount; i++){
					if (typeof body.titles[i] == "number"){
						console.log("after continuing " + body.titles[i]);
						continue;
					}
					body.titles[i] = insertId;
					insertId++;
				}
				console.log("after title  insertid = " + insertId)
				resolve(body);
			}
		});
	}
	
	function insertStats(body){
		return new Promise(function(resolve, reject){
			console.log("title array: " + JSON.stringify(body.titles))
			var sql = "INSERT INTO stats (sub_id, title_id, source_id, year) VALUES ";
			for (var i = 0; i < body.statCount; i++){
				sql += "(" + body.subid + "," + body.titles[i] + "," + 0 + ", " + body.years[i] + "),"
			}
			sql = sql.substring(0, sql.length - 1);
			console.log("stats: " + sql);
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				console.log("stats handler")
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				console.log("past err: " + JSON.stringify(result))
				var insertId = result.insertId;
				body.stats = [];
				console.log("before stat insertid = " + insertId)
				for (var i = 0; i < body.statCount; i++){
					body.stats.push(insertId);
					insertId++;
				}
				console.log("after stat insertid = " + insertId)
				console.log("body.stats = " + JSON.stringify(body.stats));
				resolve(body);
			}
		});
	}
	
	function insertCriteria(body){
		return new Promise(function(resolve, reject){
			console.log("before body.criteria = " + JSON.stringify(body.criteria));
			var sql = "INSERT INTO criteria (sub_id, name) VALUES ";
			var insertionCount = 0;
			var criteriaToIndex = {};
			for (var i = 0; i < body.criteria.length; i++){
				console.log(i + " : " + body.criteria[i].length)
				for (var j = 0; j < body.criteria[i].length; j++){
					if (typeof body.criteria[i][j] == "number"){
						console.log("cont number: " + body.criteria[i][j])
						continue;
					}
					if (criteriaToIndex[body.criteria[i][j]]){
						console.log("cont key match: " + body.criteria[i][j] + " : " + JSON.stringify(criteriaToIndex))
						continue;
					}
					criteriaToIndex[body.criteria[i][j]] = insertionCount;
					console.log("insertionCount++;")
					insertionCount++;
					sql += "(" + body.subid + "," + database.mysql.escape(body.criteria[i][j]) + "),"
				}
			}
			if (insertionCount == 0){
				console.log("no new criteria")
				resolve(body);
				return;
			}
			sql = sql.substring(0, sql.length - 1);
			console.log("criteria: " + sql);
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				console.log("criteria handler")
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				var insertId = result.insertId;
				console.log("insertid = " + insertId)
				for (var i = 0; i < body.criteria.length; i++){
					for (var j = 0; j < body.criteria[i].length; j++){
						if (typeof body.criteria[i][j] == "number"){
							continue;
						}
						body.criteria[i][j] = criteriaToIndex[body.criteria[i][j]] + insertId;
					}
				}
				console.log("after body.criteria = " + JSON.stringify(body.criteria));
				resolve(body);
			}
		});
	}
	function insertCriteriaItems(body){
		return new Promise(function(resolve, reject){
			console.log("criteriaItems");
			
			var insertionCount = 0;
			var sql = "INSERT INTO criteria_items (sub_id, criteria_id, stat_id) VALUES ";
			for (var i = 0; i < body.statCount; i++){
				for (var j = 0; j < body.criteria[i].length; j++){
					insertionCount++;
					sql += "(" + body.subid + "," + body.criteria[i][j] + "," + body.stats[i] + "),"
				}
			}
			if (insertionCount == 0){
				console.log("no new criteria items")
				resolve(body);
				return;
			}
			sql = sql.substring(0, sql.length - 1);
			console.log("criteriaItems sql: " + sql);
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				console.log("criteriaItems handler")
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				resolve(body);
			}
		});
	}
	
	function insertData(body){
		return new Promise(function(resolve, reject){
			console.log("insertData");
			
			var sql = "INSERT INTO data (sub_id, stat_id, region_id, val) VALUES ";
			for (var i = 0; i < body.data.length; i++){
				for (var j = 0; j < body.data[i].values.length; j++){
					if (typeof body.data[i].values[j] != "number"){
						console.log("i = " + i + ", j = " + j);
						continue;
					}
					sql += "(" + body.subid + "," + body.stats[j] + "," + body.data[i].id + "," + body.data[i].values[j] + "),";
				}
			}
			sql = sql.substring(0, sql.length - 1);
			console.log("data: " + sql);
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				console.log("data handler")
				if (err){
					reject({message: "internal database error: "  + err.message});
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
