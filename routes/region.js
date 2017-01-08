function getRouter(router, database){
	router.get('/region/upload', function(req, res, next) {
		res.render('uploadregion');
	});
	
	router.post('/region/upload', function(req, res, next) {
		validateObj.upload(req.body)
			.then(insertSubmission.bind(null, req.session.userid))
			.then(insertRegions)
			.then(function(){
				res.send({redirect: true})
			})
			.catch(function(obj){
				res.send(obj)
			})
	});
	
	
	var validateObj = (function(){
		var getValidator = require('../modules/getvalidator');
		var validate = {};
		validate.upload = getValidator("regionupload");
		return validate;
	})();
	
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
	
	function insertRegions(body){
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
	
	return router;
}




module.exports = {
	getRouter: getRouter
};
