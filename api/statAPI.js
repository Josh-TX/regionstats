function getRouter(router, database){
	router.post("*", function(req, res, next) {
		if (req.body.hasOwnProperty("region_id") && req.body.hasOwnProperty("title_id")){
			if (!/\d+/.test(req.body.region_id)){
				res.send({message: "region id not a valid number"});
				return;
			}	
			if (!/\d+/.test(req.body.title_id)){
				res.send({message: "title id not a valid number"});
				return;
			}	
			getStatsFromRegionAndTitle(req.body.region_id, req.body.title_id)
				.then(function(obj) {
					res.send(obj);
				})
				.catch(function(obj){
					res.send(obj);
				})
			return;
		}
		else if (req.body.hasOwnProperty("group_id") && req.body.hasOwnProperty("title_id")){
			if (!/\d+/.test(req.body.group_id)){
				res.send({message: "group id not a valid number"});
				return;
			}	
			if (!/\d+/.test(req.body.title_id)){
				res.send({message: "title id not a valid number"});
				return;
			}	
			getGroupInfo(req.body)
				.then(getStatsFromGroupAndTitle)
				.then(function(obj) {
					res.send(obj);
				})
				.catch(function(obj){
					res.send(obj);
				})
			return;
		}
		
		else {
			res.send({message: "failed ot match any parameter set"});
		}
	});

	function getStatsFromRegionAndTitle(region_id, title_id) {
		return new Promise(function(resolve, reject) {
			var sql =  "SELECT sq.stat_id, sq.count, GROUP_CONCAT(criteria_id) AS criteria FROM ( \
							SELECT stats.id AS stat_id, count(*) AS count FROM stats \
							JOIN data ON data.stat_id = stats.id \
							WHERE stats.title_id = ? AND data.region_id = ? \
							GROUP BY stats.id \
						    ) AS sq \
						LEFT JOIN criteria_items ON criteria_items.stat_id = sq.stat_id \
						GROUP BY sq.stat_id "
			database.mysql.query(sql, [title_id, region_id], databaseHandler);
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
	function getStatsFromGroupAndTitle(body) {
		return new Promise(function(resolve, reject) {
			console.log(JSON.stringify(body))
			var sql =  "SELECT sq.stat_id, sq.count, GROUP_CONCAT(criteria_id) AS criteria FROM ( \
							SELECT stats.id AS stat_id, count(*) AS count FROM stats \
							JOIN data ON data.stat_id = stats.id \
							JOIN ( \
								SELECT id FROM regions \
								WHERE parent_id = ? AND region_type_id = ? \
								) AS r ON r.id = data.region_id \
							WHERE stats.title_id = ?\
							GROUP BY stats.id \
						    ) AS sq \
						LEFT JOIN criteria_items ON criteria_items.stat_id = sq.stat_id \
						GROUP BY sq.stat_id "
			database.mysql.query(sql, [body.region_id, body.region_type_id, body.title_id], databaseHandler);
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