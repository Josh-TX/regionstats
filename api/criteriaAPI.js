function getRouter(router, database){
	router.post("*", function(req, res, next) {
		getAllCriteria2()
			.then(function(obj) {
				res.send(obj);
			})
			.catch(function(obj){
				res.send(obj);
			})
	});

	function getAllCriteria() {
		return new Promise(function(resolve, reject) {
			database.mysql.query('SELECT id, name FROM criteria', databaseHandler);
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
	
	function getAllCriteria2() {
		return new Promise(function(resolve, reject) {
			var sql =  "SELECT criteria.name, criteria.id, count(*) as count FROM criteria \
						JOIN criteria_items ON criteria.id = criteria_items.criteria_id \
						JOIN stats ON stats.id = criteria_items.stat_id \
						JOIN data ON data.stat_id = stats.id \
						GROUP BY criteria.id"
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