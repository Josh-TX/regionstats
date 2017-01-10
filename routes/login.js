function getRouter(router, database){
	/* GET home page. */

	router.get('/signup', function(req, res, next){
		res.render('signup', { 
			title: 'Regionstats'
			});
	});

	router.get('/login', function(req, res, next){
		res.render('login', { 
			title: 'Regionstats'
		});
	});

	router.get('/logout', function(req, res,next){
		req.session.userid = 0;
		res.redirect('/');
	})

	
	router.post('/signup', function(req, res, next){
		validateObj.signup(req.body)
			.then(checkExistingUser)
			.then(insertUser)
			.then(function(obj){
				req.session.userid = obj.userid;
				req.session.username = obj.username;
				req.session.admin = obj.admin;
				req.session.message = "Account successfully created";
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
				req.session.admin = obj.admin;
				req.session.message = "successfully logged in";
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
						username: result[0].username,
						admin: result[0].admin
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
			database.mysql.query('INSERT INTO users (username, email, password, date_created) VALUES (?, ?, ?, now())', 
				[body.username, body.email, body.password], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: " + err.message});
					return;
				}
				resolve({
					userid: result.insertId,
					username: body.username,
					admin: 0
				});
			};
		});
	}

		/*router.get('/mongo', function(req, res, next){
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
	});*/

	return router;
}




module.exports = {
	getRouter: getRouter
};
