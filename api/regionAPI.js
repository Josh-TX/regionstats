function getRouter(router, database){
	/*router.get('/region/upload', function(req, res, next) {
		res.render('uploadregion');
	});*/

	router.post('/region', function(req, res, next) {
		//validateObj.upload(req.body)
		if (!/\d+/.test(req.body.id)){
			res.send({message: "id not a valid number"});
			return;
		}
	
		getChildRegions(req.body)
			.then(getCurrentRegion)
			.then(getRegionGroups)
			.then(function(obj) {
				res.send(obj);
			})
			.catch(function(obj){
				res.send(obj);
			})
	});

	router.post('/regionType', function(req, res, next) {
		getRegionTypes()
			.then(function(obj) {
				res.send(obj);
			})
			.catch(function(obj) {
				res.send(obj);
			})
	});
	
	function getRegionTypes() {
		return new Promise(function(resolve, reject) {
			database.mysql.query('SELECT id,name FROM `region_types`', databaseHandler);
			function databaseHandler(err, result) {
				if(err) {
					reject({message: "internal database error: " + err.message});
					return;
				}
				if(result.length > 0) {
					resolve(result);
					return;
				}
				else {
					reject({message: "database contains no region_types"});
					return;
				}
			}
		})
	};

	function getCurrentRegion(body){
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
					reject({message: "internal database error: " + err.message});
					return;
				}
				if (result.length > 0) {
					body.parent = result[0].parent_id;
					body.name = result[0].name;
					resolve(body);
					return;
				}
				else {
					reject({message: "Couldn't find region for id = " + body.id});
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
					reject({message: "internal database error: " + err.message});
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
	
	function getRegionGroups(body){
		return new Promise(function(resolve, reject){
			database.mysql.query('SELECT id, region_type_id AS type FROM region_groups WHERE region_id=(?)', 
				[body.id], databaseHandler);
			function databaseHandler(err, result) {
				if (err) {
					reject({message: "internal database error: " + err.message});
					return;
				}
				if (result.length > 0) {
					body.rg = result;
					resolve(body);
					return;
				}
				else {
					body.rg = [];
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