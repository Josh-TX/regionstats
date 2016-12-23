var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = "mongodb://localhost:27017/test";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
	title: 'Regionstats', 
	myArray: [1,2,3],//I'm just experimenting with outputing to the view
	success: req.session.success,
	errors: req.session.errors});
	req.session.errors = null;
});

router.get('/showname/:name/:id', function(req, res, next) {
	//this is an example of how to get variables from the url
	var name = req.params.name;
	var id = req.params.id;
	res.render('test', { title: 'Get example', name: name, id: id});
});

router.get('/users', function(req, res, next){
	
	//********************************************
	//this block shows a mysql connection, right now it just console.logs it
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		database : 'test'
	});

	connection.connect();

	connection.query('SELECT * from users', function(err, rows, fields) {
		if (!err)
			console.log('The solution is: ', rows);
		else
			console.log('mysql error: ' + err.message);
	});

	connection.end();
	//********************************************
	//this section shows a mongodb connection. it outputs it to the view.
	var users = [];
	var db;
	mongo.connect(url, function(err, database){
		if (err){
			console.warn(err.message);  // returns error if no matching object found
			res.send(err.message);
			return;
		}
		db = database;
		assert.equal(null, err);//this is how the tutorial checked against errors
		var rdr = db.collection('users').find();
		rdr.forEach(pushUser, finishedReading);
	});
	function pushUser(doc, err){
		assert.equal(null, err);
		users.push(doc);
	};
	function finishedReading(){
		db.close();
		res.render('users', {users: users});
	};
});

router.post('/insert', function(req, res, next){
	//req.check('name', 'username too short').isLength({min: 4});
	//req.check('password', "passwords don't match").equals(req.body.confirm);

	req.session.success = true;
	var item={
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	}
	mongo.connect(url, function(err, db){
		assert.equal(null, err);//this is how the tutorial checked against errors
		db.collection('users').insertOne(item, function(err, result){
			console.log("item inserted");
			db.close();
		});
	});
	res.redirect('/users');
});
router.post('/update', function(req, res, next){
	var oldname = req.body.oldname
	var item={
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	}
	mongo.connect(url, function(err, db){
		assert.equal(null, err);//this is how the tutorial checked against errors
		db.collection('users').updateOne({"username": oldname}, {$set: item}, function(err, result){
			console.log("item inserted");
			db.close();
		});
	});
	res.redirect('/users');
});

router.post('/delete', function(req, res, next){
	var oldname = req.body.oldname
	mongo.connect(url, function(err, db){
		assert.equal(null, err);//this is how the tutorial checked against errors
		db.collection('users').deleteOne({"username": oldname}, function(err, result){
			console.log("user deleted");
			db.close();
		});
	});
	res.redirect('/users');
});



module.exports = router;
