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
	
	var signupValidator = require('../validators/signup');
	router.post('/signup', function(req, res, next){
		var error = signupValidator(req.body);
		if (error.none){
			//if (req.body.db == "mysql"){
			database.mysql.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
				[req.body.username, req.body.email, req.body.password],
				function(err, result) {
					if (!err){
						res.send("mysql success!");
					}else{
						res.send("mysql error: " + err.message);
					}
				});
			/*} else { //mongodb
				var item={
					username: req.body.username,
					email: req.body.email,
					password: req.body.password
				}
				database.mongo.collection('users').insertOne(item, function(err, result){
					if (!err){
						res.send("mongo success!");
					}else{
						res.send("mongo error: " + err.message);
					}
				});
			}*/
		}else {
			res.send("Client side validation failed: " + JSON.stringify(error));
		}
	});

	var loginValidator = require('../validators/login');
	router.post('/login', function(req, res, next){
		var error = loginValidator(req.body);
		if (error.none){
			//if (req.body.db == "mysql"){
				database.mysql.query('SELECT * FROM users WHERE username=(?) AND password=(?)', 
					[req.body.username, req.body.password],
					function(err, result) {
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
			} /*else { //mongodb
				var item={
					username: req.body.username,
					password: req.body.password
				}
				/*database.mongo.collection('users').find({$and [{username: { $eq: item.username }}, {password: { $eq: item.password }}]}, function(err, result){
					if (!err){
							res.send("mongo success!");
					}else{
						res.send("mongo error: " + err.message);
					}
				});*/
			}*/
		}else {
			res.send("Client side validation failed: " + JSON.stringify(error));
		}
	});
	//old code from tutorial
	/*router.post('/delete', function(req, res, next){
		return;
		var oldname = req.body.oldname
		mongo.connect(url, function(err, db){
			assert.equal(null, err);//this is how the tutorial checked against errors
			db.collection('users').deleteOne({"username": oldname}, function(err, result){
				console.log("user deleted");
				db.close();
			});
		});
		res.redirect('/users');
	});*/
	return router;
}


module.exports = {
	getRouter: getRouter
};
