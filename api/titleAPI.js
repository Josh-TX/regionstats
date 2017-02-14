function getRouter(router, database){
	/*router.get('/region/upload', function(req, res, next) {
		res.render('uploadregion');
	});*/

	router.post("*", function(req, res, next) {
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
		
		else if (req.body.hasOwnProperty("group_id")){
			if (!/\d+/.test(req.body.group_id)){
				res.send({message: "group id not a valid number"});
				return;
			}
			getGroupInfo(req.body)
				.then(getTitlesFromGroup)
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
	function getTitlesFromGroup(body) {
		return new Promise(function(resolve, reject) {
			var sql = "SELECT titles.name, titles.id, titles.category_id, count(*) AS count FROM titles \
						JOIN stats ON stats.title_id = titles.id \
						JOIN data ON data.stat_id = stats.id \
						JOIN ( \
							SELECT id FROM regions \
							WHERE parent_id = ? AND region_type_id = ? \
							) AS r ON r.id = data.region_id \
						GROUP BY titles.id"
			database.mysql.query(sql, [body.region_id, body.region_type_id], databaseHandler);
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
	//EXPECTS: .group_id ADDS: .region_id, .region_type_id
	function getGroupInfo(body){
		return new Promise(function(resolve, reject) {
			var sql = 'SELECT region_id, region_type_id FROM region_groups WHERE id = ?';
			database.mysql.query(sql, [body.group_id], databaseHandler);
			function databaseHandler(err, result) {
				if(err) {
					reject({message: "internal database error: " + err.message});
					return;
				}
				if (result.length == 0){
					reject({message: "error finding group for id " + group_id});
					return;
				}
				body.region_id = result[0].region_id;
				body.region_type_id = result[0].region_type_id;
				resolve(body);
				return;
			}
		})
	}
	
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