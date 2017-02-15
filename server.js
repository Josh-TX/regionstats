var config = require('./config');
var database = {}
database.mongo = require('./database').getMongo(config, database);
database.mysql = require('./database').getMysql(config);
var app = require('./app').getApp(config, database);
app.listen(config.port, function(){
	console.log("listening on port " + config.port);
});