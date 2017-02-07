function getMongo(config, database){
	var mongo = require('mongodb');
	if (config.mongo.host.endsWith("/")) {
		var url = "mongodb://" + config.mongo.host + config.mongo.db;
	} else {
		var url = "mongodb://" + config.mongo.host + "/" + config.mongo.db;
	}
	return mongo.connect(url, function(err, db){
		if (err){
			console.log("Could not connect to mongodb server");
			throw err;
		}
		database.mongo = db;
	});
}
function getMysql(config){
	var mysql = require('mysql');
	var obj = {
	  connectionLimit: 10,
	  host: config.mysql.host,
	  user: config.mysql.username,
	  database: config.mysql.db
	}
	if (config.mysql.password){
		obj.password = config.mysql.password;
	}
	var pool  = mysql.createPool(obj);
	//connections are implicity generated from the pool whenever you do a query on the pool object
	//I explicitly create a connection just to test if I can connect to the server. 
	pool.getConnection(function(err, connection) {
		if (err){
			console.log("Could not connect to mysql server!");
			throw err;
		}
		connection.release();
	});
	return pool;
	
}

module.exports = {
	getMongo: getMongo,
	getMysql: getMysql
}