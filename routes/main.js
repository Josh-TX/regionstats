function getRouter(router, database){
	/* GET home page. */
	router.get('/mysql', function(req, res, next){
		database.mysql.query('SELECT * from users', function(err, rows, fields) {
			if (err){
				res.send('mysql error: ' + err.message);
			}else{
				res.send('mysql results: ' + JSON.stringify(rows))
			}

		});
	});

	router.get('/', function(req, res, next) {
		res.render('index', { 
			title: 'RegionStats'
		});
	});
	
	
	router.get('/test', function(req, res, next) {
		res.render('test', { 
			title: 'Test - RegionStats'
		});
	});
	//***** check logged in ******
	router.all("/dashboard", function(req, res, next) {
		if (req.session.userid > 0){
			next();
		}
		else {
			req.session.message = "You must be logged in to view that page";
			console.log("set message to " + req.session.message)
			if (req.method == "GET"){
				res.redirect("/login");
			}else {
				res.send({redirect: "/login"});
			}	
		}
	});
	router.get('/dashboard', function(req, res, next){	
		res.render('dashboard', {
			title: 'RegionStats'
		});
	})
	router.post('/dashboard', function(req, res, next){
		var data = {};
		getOwnSubmissions(req.session.userid, data)
			.then(getOtherSubmissionsIfAdmin
				.bind(null, req.session.userid, req.session.admin))
			.then(function(data){
				res.send(data);
			})
			.catch(function(err){
				console.log(err.message)
			});
	});
	
	function getOwnSubmissions(userid, data){
		return new Promise (function(resolve, reject){
			database.mysql.query('SELECT id, type, date_sub FROM submissions WHERE status="w" AND user_id=?', 
				[userid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: " + err.message});
					return;
				}
				data.own = result;
				resolve(data);
			};
		});
	}
	
	
	function getOtherSubmissionsIfAdmin(userid, admin, data){
		return new Promise (function(resolve, reject){
			if (admin < 5){
				resolve(data);
			}
			database.mysql.query('SELECT username, submissions.id, type, date_sub FROM submissions JOIN users ON users.id = submissions.user_id WHERE status="w" AND user_id != ?', 
				[userid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: " + err.message});
					return;
				}
				data.others = result;
				resolve(data);
			};
		});
	}
	
	return router;
}




module.exports = {
	getRouter: getRouter
};
