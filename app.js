function getApp(config, database){
	var express = require('express');
	var path = require('path');
	var favicon = require('serve-favicon');
	var hbs = require('express-handlebars');
	var helpers = require('./helpers');
	var bodyParser = require('body-parser');
	//var expressValidator = require('express-validator');
	var expressSession = require('express-session');

	var ajax = require('./routes/ajax');
	
	var router = express.Router();
	var indexRouter = require('./routes/index').getRouter(router, database);
	
	var app = express();


	//***** View Engine *****

	//set the engine to handlebars, the extension to hbs, and layout file to layout
	app.engine('hbs', hbs({
		extname: 'hbs', 
		defaultLayout: 'layout', 
		layoutsDir: __dirname + '/views/layouts',
		partialsDir: __dirname + '/views/partials/',
		helpers: helpers 
	}));
	//this sets the view folder to be views
	app.set('views', path.join(__dirname, 'views'));
	//this might be unnecessary
	app.set('view engine', 'hbs');

	//***** Middleware *****

	app.use(favicon(path.join(__dirname, 'content', 'favicon.ico')));
	//this parses the post requests
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	//app.use(expressValidator());//this line must be after I use bodyparser
	//app.use(cookieParser()); probably will need this later
	//the secret should be a random string stored in a gitignored folder
	app.use(expressSession({secret: 'idk', saveUninitialized: false, resave: false})) 

	//***** Routes *****
	app.use(function(req, res, next){
		res.locals.test = "hello world";
		if (!req.session.userid > 0)
			req.session.userid = 0;
		res.locals.session = {}
		res.locals.session.userid = req.session.userid;
		res.locals.session.username = req.session.username;
		next();
	});
	//this allows caching anything in the content folder
	app.use('/content', express.static(path.join(__dirname, 'content')));
	app.use(indexRouter); // equivalent to app.use('/', indexRouter);
	app.use('/ajax', ajax);

	// ***** Errors

	app.use(function(req, res, next){
		res.locals.test = app.get('env')
		next();
	});
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
	// development error handler
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
		  message: err.message,
		  error: err
		});
	  });
	}
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
		message: err.message,
		error: {}
	  });
	});
	return app;
}

module.exports = {
	getApp: getApp
}