function getRouter(router, database){
	/*router.get('/region/upload', function(req, res, next) {
		res.render('uploadregion');
	});*/
	
	router.post('/ajax/region', function(req, res, next) {
		//validateObj.upload(req.body)
		if (!/\d+/.test(req.body.id)){
			res.send({message: "id not a valid number"});
			return;
		}
	
		getChildRegions(req.body)
			.then(getParentRegion)
			.then(function(obj) {
				res.send(obj);
			})
			.catch(function(obj){
				res.send(obj);
			})
		//res.send({message: "valid id"});
			/*.then(insertSubmission.bind(null, req.session.userid))
			.then(insertRegions)
			.then(function(){
				res.send({redirect: true})
			})
			.catch(function(obj){
				res.send(obj)
			})*/
	});
	function getParentRegion(body){
		return new Promise(function(resolve, reject){
			if (body.id == 0)
			{
				body.parent = -1;
				body.name = "World";
				resolve(body);
				return;
			}

			database.mysql.query('SELECT parent_id, name FROM regions WHERE id=(?)', 
				[body.id], databaseHandler);
			function databaseHandler(err, result) {
				if (err) {
					reject({message: "internal database error"});
					return;
				}
				if (result.length > 0) {
					body.parent = result[0].parent_id;
					body.name = result[0].name;
					resolve(body);
					return;
				}
				else {
					reject({message: "SQL ERROR!"});
					return;
				}
			}
		})
	};

	function getChildRegions(body){
		return new Promise(function(resolve, reject){
			database.mysql.query('SELECT id, name FROM regions WHERE parent_id=(?)', 
				[body.id], databaseHandler);
			function databaseHandler(err, result) {
				if (err) {
					reject({message: "internal database error"});
					return;
				}
				if (result.length > 0) {
					body.r = result;
					resolve(body);
					return;
				}
				else {
					body.r = [];
					resolve(body);
					return;
				}
			}
		})
	};
	
	return router;
}

module.exports = {
	getRouter: getRouter
};