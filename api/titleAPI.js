function getRouter(router, database){
	/*router.get('/region/upload', function(req, res, next) {
		res.render('uploadregion');
	});*/

	router.post('/title', function(req, res, next) {
		//validateObj.upload(req.body)
		if (!/\d+/.test(req.body.cat)){
			res.send({message: "cat not a valid number"});
			return;
		}	
		getTitlesFromCat(req.body.cat)
			.then(function(obj) {
				res.send(obj);
			})
			.catch(function(obj){
				res.send(obj);
			})
	});

	function getTitlesFromCat(cat) {
		return new Promise(function(resolve, reject) {
			database.mysql.query('SELECT id, name FROM titles WHERE category_id = ?', [cat], databaseHandler);
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