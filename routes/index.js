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
		validateObj.signup(req.body)
			.then(checkExistingUser)
			.then(insertUser)
			.then(function(obj){
				req.session.userid = obj.userid;
				req.session.username = obj.username;
				res.send({redirect: true})
			})
			.catch(function(obj){
				res.send(obj);
			});
	});

	router.post('/login', function(req, res, next){
		validateObj.login(req.body)
			.then(verifyUser)
			.then(function(obj){
				req.session.userid = obj.userid;
				req.session.username = obj.username;
				res.send({redirect: true})
			})
			.catch(function(obj){
				res.send(obj);
			});
	});
	
	var validateObj = (function(){
		var getValidator = require('../modules/getvalidator');
		var validate = {};
		validate.signup = getValidator("signup");
		validate.login = getValidator("login");
		return validate;
	})();
	
	
	function verifyUser(body){
		return new Promise(function(resolve, reject){
			database.mysql.query('SELECT * FROM users WHERE username=(?) AND password=(?)', 
				[body.username, body.password], databaseHandler);
			function databaseHandler(err, result) {
				if (err) {
					reject({message: "internal database error"});
				}
				if (result.length > 0) {
					resolve({
						userid: result[0].id,
						username: result[0].username
					});
				}
				else {
					reject({password: "wrong username/password"});
				}
			}
		});
	}
	
	function checkExistingUser(body){
		return new Promise (function(resolve, reject){
			database.mysql.query('SELECT * FROM users WHERE username=(?)', 
				[body.username], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error"});
					return;
				}
				if (result.length > 0){
					reject({username: "username already taken"});
				}else {
					resolve(body);
				}
			};
		});
	}

	function insertUser(body){
		return new Promise (function(resolve, reject){
			database.mysql.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
				[body.username, body.email, body.password], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error"});
					return;
				}
				resolve({
					userid: result.insertId,
					username: body.username
				});
			};
		});
	}
	return router;
}




module.exports = {
	getRouter: getRouter
};
