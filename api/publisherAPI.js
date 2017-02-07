function getRouter(router, database){
	/*router.get('/region/upload', function(req, res, next) {
		res.render('uploadregion');
	});*/

	/*router.post('/region', function(req, res, next) {
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
	});*/

	router.post('/newPublisher', function(req, res,next) {
		//console.log("Name: " + req.body.name);
		addPublisher(req.body.name)
			.then(function(obj) {
				res.send(obj);
			})
			.catch(function(obj) {
				res.send(obj);
			})
	});

	router.post('/publisherType', function(req, res, next) {
		getPublisherTypes()
			.then(function(obj) {
				res.send(obj);
			})
			.catch(function(obj) {
				res.send(obj);
			})
	});
	
	function getPublisherTypes() {
		return new Promise(function(resolve, reject) {
			database.mysql.query('SELECT id,name FROM `publishers`', databaseHandler);
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
					reject({message: "database contains no publishers"});
					return;
				}
			}
		})
	};

	function addPublisher(newName) {
		//console.log("name: " + name);
		return new Promise(function(resolve, reject) {
			database.mysql.query('INSERT INTO `publishers` (name) VALUES (?)', newName, databaseHandler);
			function databaseHandler(err, result) {
				if(err) {
					reject({message: "internal database error: " + err.message});
					return;
				}
				else {
					//console.log(result);
					resolve(result);
					return;
				}
			}
		})
	}
	
	return router;
}

module.exports = {
	getRouter: getRouter
};