function getRouter(router, database){
	/* GET home page. */
	router.get('/', function(req, res, next) {
		global.counter++;
		res.render('index', { 
		title: 'Regionstats', 
		//counter: counter,
		//myArray: [1,2,3],//I'm just experimenting with outputing to the view
		success: req.session.success,
		errors: req.session.errors});
		req.session.errors = null;
	});

	/*router.get('/getexample/:name/:id', function(req, res, next) {
		//this is an example of how to get variables from the url
		var name = req.params.name;
		var id = req.params.id;
		res.render('test', { title: 'Get example', name: name, id: id});
	});*/

	router.get('/mysql', function(req, res, next){
		database.mysql.query('SELECT * from users', function(err, rows, fields) {
			if (err){
				res.send('mysql error: ' + err.message);
			}else{
				res.send('mysql results: ' + JSON.stringify(rows))
			}

		});
	});
	
	router.get('/mongo', function(req, res, next){
		var users = [];
		var rdr = database.mongo.collection('users').find();
		rdr.forEach(pushUser, finishedReading);
		function pushUser(doc, err){
			if (err){
				throw error(err);
			}
			users.push(doc);
		};
		function finishedReading(){
			res.render('users', {users: users});
		};
	});

	router.get('/signup', function(req, res, next){
		res.render('signup');
	});

	router.get('/login', function(req, res, next){
		res.render('login', {

		});
	});

	router.get('/logout', function(req, res,next){
		req.session.userid = 0;
		res.redirect('/');
	})

	router.get('/dashboard', function(req, res, next){	
		if (req.session.userid > 0) {
			res.render('dashboard', {
				title: 'Regionstats',
				user:  req.session.username
			});
		}
		else {
			res.redirect('login');
			//res.send(req.session.userid);
		}
	})
	
	router.post('/signup', function(req, res, next){
		getSignupPromise(req.body)
			.then(function(obj){
				req.session.userid = obj.userid;
				req.session.username = obj.username;
				res.send({redirect: true})
			})
			.catch(function(value){
				res.send(value);
			});
	});

	router.post('/login', function(req, res, next){
		getLoginPromise(req.body)
			.then(function(obj){
				req.session.userid = obj.userid;
				req.session.username = obj.username;
				res.send({redirect: true})
			})
			.catch(function(value){
				//res.status(400);
				res.send(value);
		});
		
		
		return;
		/*
		var error = loginValidator(req.body);
		if (error.none){
			//if (req.body.db == "mysql"){
				{
						if (!err && result.length > 0){
							var user = result[0].username;
							req.session.username = user;
							req.session.userid = JSON.stringify(result[0].id);
							var messages = {}
							messages.firstMessage = "login success!";
							messages.secondMessage = " Welcome, " + user// + ": " + req.session.userid;
							res.send(messages);
						}else{
							res.send("mysql error: " + err.message);
						}
					});
			} else { //mongodb
				var item={
					username: req.body.username,
					password: req.body.password
				}
				database.mongo.collection('users').find({$and [{username: { $eq: item.username }}, {password: { $eq: item.password }}]}, function(err, result){
					if (!err){
							res.send("mongo success!");
					}else{
						res.send("mongo error: " + err.message);
					}
				});
			}
		}else {
			res.send("Client side validation failed: " + JSON.stringify(error));
		}
		*/
	});

	function getLoginPromise(body) {
		var loginValidator = require('../validators/login');
		return new Promise(function(resolve, reject){
			var error = loginValidator(body);
			//console.log(error.none);
			if (error.none) {
				//console.log("starting query...");
				database.mysql.query('SELECT * FROM users WHERE username=(?) AND password=(?)', 
					[body.username, body.password], databaseHandler);
				//console.log("query complete");
			}
			else {
				//console.log("validation failed");
				reject("Client validation failed: " + JSON.stringify(error));
			}

			function databaseHandler(err, result) {
				//console.log("inside databaseHandler");
				if (!err) {
					//console.log("database successful");
					if (result.length > 0) {
						//console.log("ready to resolve");
						resolve({
							userid: result[0].id,
							username: result[0].username
						});
					}
					else {
						//console.log("no matches found");
						reject("no match found");
					}
				}
				else {
					//console.log("error connecting to database");
					reject("mysql error: " + err.message);
				}
			}
		});
	}

	
	function getSignupPromise(body){
		var signupValidator = require('../validators/signup');
		return new Promise (function(resolve, reject){
			var error = signupValidator(body);
			if (error.none){
				database.mysql.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
					[body.username, body.email, body.password], databaseHandler);
			}
			else {
				reject("Client side validation failed: " + JSON.stringify(error));
			}

			function databaseHandler(err, result) {
				//console.log("databaseHandler")
				if (!err){
					resolve({
						userid: 1,
						username: body.username
					});
				}else{
					reject("mysql error: " + err.message);
				}
			};
		});
	}
	return router;
}




module.exports = {
	getRouter: getRouter
};
