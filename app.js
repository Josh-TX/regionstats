function getApp(config, database){
	//there's more requires in their corresponding section.
	//I think it's more organized that way. 
	var express = require('express');
	var path = require('path');
	var favicon = require('serve-favicon');
	var bodyParser = require('body-parser');
	var expressSession = require('express-session');
	
	var app = express();


	//***** View Engine *****

	var hbs = require('express-handlebars');
	var helpers = require('./modules/helpers');

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
	app.set('view engine', 'hbs');

	
	
	//***** Middleware *****

	app.use(favicon(path.join(__dirname, 'content', 'favicon.ico')));
	
	//this parses the post requests
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	//app.use(cookieParser()); probably will need this later
	
	//***** Session variables *****
	
	app.use(expressSession({secret: config.secret, saveUninitialized: false, resave: false})) 
	
	//Make views have access to session variables
	app.use(function(req, res, next) {
		if (!req.session.userid > 0)
			req.session.userid = 0;
		res.locals.session = {}
		res.locals.session.userid = req.session.userid;
		res.locals.session.username = req.session.username;		
		if (req.session.message){
			res.locals.session.message = req.session.message;
			delete req.session.message;
		}
		next();
	});
	
	//***** Routes *****
	
	//var router = express.Router();
	//this allows caching anything in the content folder
	app.use('/content', express.static(path.join(__dirname, 'content')));
	
	app.use(function(req, res, next){ //DELAY ALL POST REQUESTS
		if (req.method == "GET"){
			next();
		}
		else {
			setTimeout(function(){
				next();
			}, 1000);
		}
	});
	
	var mainRouter = require('./routes/main').getRouter(express.Router(), database);
	app.use(mainRouter);
	
	var loginRouter = require('./routes/login').getRouter(express.Router(), database);
	app.use(loginRouter);
	
	var regionRouter = require('./routes/region').getRouter(express.Router(), database);
	app.use("/region", regionRouter);

	var sourceRouter = require('./routes/sources').getRouter(express.Router(), database);
	app.use("/source", sourceRouter);
	
	var dataRouter = require('./routes/data').getRouter(express.Router(), database);
	app.use("/data", dataRouter);
	
	var regionAPI = require('./api/regionAPI').getRouter(express.Router(), database);
	app.use("/api", regionAPI);
	

	
	

	
	
	// ***** Error handling *****
	
	/*app.use(function(req, res, next){
		res.locals.test = app.get('env')
		next();
	});*/
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