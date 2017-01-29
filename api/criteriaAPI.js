function getRouter(router, database){

	router.post('/criteria', function(req, res, next) {
		getCriteria()
			.then(function(obj) {
				res.send(obj);
			})
			.catch(function(obj){
				res.send(obj);
			})
	});

	function getCriteria() {
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
	
	return router;
}

module.exports = {
	getRouter: getRouter
};