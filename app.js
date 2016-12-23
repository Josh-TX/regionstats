
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
//var expressValidator = require('express-validator');
var expressSession = require('express-session');

var index = require('./routes/index');

var app = express();

//set the engine to handlebars, the extension to hbs, and layout file to layout
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
//this sets the view folder to be views
app.set('views', path.join(__dirname, 'views'));
//this might be unnecessary
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'content', 'favicon.ico')));

//this parses the post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(expressValidator());//this line must be after I use bodyparser
//app.use(cookieParser()); probably will need this later
app.use('/content', express.static(path.join(__dirname, 'content'))); //this allows caching anything in the content folder
//the secret should be a random string stored in a gitignored folder
app.use(expressSession({secret: 'idk', saveUninitialized: false, resave: false})) 

//still not sure how routes work. I think they're similar to controllers in asp.net MVC
app.use('/', index);

// ***** I don't know how the error handling works

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
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
// ***** idk how the above works

//choose the port and listen for connections
var port = 3000;
app.set('port', port);
app.listen(port, function(){
	console.log("listening on port " + port);
});
