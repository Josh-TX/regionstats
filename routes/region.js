function getRouter(router, database){
	/* GET home page. */
	router.get('/region/upload', function(req, res, next) {
		global.counter++;
		res.render('uploadregion');
	});
	return router;
}




module.exports = {
	getRouter: getRouter
};
