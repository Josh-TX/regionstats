function getRouter(router, database){
	/*router.get('/region/upload', function(req, res, next) {
		res.render('uploadregion');
	});*/

	router.post("*", function(req, res, next) {
		console.log("api router");
		if (req.body.hasOwnProperty("category_id")){
			if (!/\d+/.test(req.body.category_id)){
				res.send({message: "category id not a valid number"});
				return;
			}	
			getTitlesFromCat(req.body.category_id)
				.then(function(obj) {
					res.send(obj);
				})
				.catch(function(obj){
					res.send(obj);
				})
			return;
		}
		
		else if (req.body.hasOwnProperty("region_id")){
			if (!/\d+/.test(req.body.region_id)){
				res.send({message: "region id not a valid number"});
				return;
			}	
			getTitlesFromRegion(req.body.region_id)
				.then(function(obj) {
					res.send(obj);
				})
				.catch(function(obj){
					res.send(obj);
				})
		}
		
		else {
			getAllTitles()
				.then(function(obj) {
					res.send(obj);
				})
				.catch(function(obj){
					res.send(obj);
				})
		}
		
	});

	function getTitlesFromCat(category_id) {
		return new Promise(function(resolve, reject) {
			var sql = 'SELECT titles.id, titles.name, titles.category_id, count(*) AS count FROM titles \
				JOIN stats ON stats.title_id = titles.id \
				JOIN data ON data.stat_id = stats.id \
				WHERE titles.category_id = ? \
				GROUP BY titles.id';
			database.mysql.query(sql, [category_id], databaseHandler);
			function databaseHandler(err, result) {
				if(err) {
					reject({message: "internal database error: " + err.message});
					return;
				}
				resolve(result);
				return;
			}
		})
	};
	
	function getTitlesFromRegion(region) {
		return new Promise(function(resolve, reject) {
			var sql = 'SELECT titles.id, titles.name, titles.category_id, count(*) AS count FROM titles \
				JOIN stats ON stats.title_id = titles.id \
				JOIN data ON data.stat_id = stats.id \
				WHERE data.region_id = ? \
				GROUP BY titles.id';	
			database.mysql.query(sql, [region], databaseHandler);
			function databaseHandler(err, result) {
				if(err) {
					reject({message: "internal database error: " + err.message});
					return;
				}
				resolve(result);
				return;
			}
		})
	};
	
	function getAllTitles() {
		return new Promise(function(resolve, reject) {
			var sql = 'SELECT titles.id, titles.name, titles.category_id, count(*) AS count FROM titles \
				JOIN stats ON stats.title_id = titles.id \
				JOIN data ON data.stat_id = stats.id \
				GROUP BY titles.id';	
			database.mysql.query(sql, databaseHandler);
			function databaseHandler(err, result) {
				if(err) {
					reject({message: "internal database error: " + err.message});
					return;
				}
				resolve(result);
				return;
			}
		})
	};
	
	return router;
}

module.exports = {
	getRouter: getRouter
};