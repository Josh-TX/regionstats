var config = {};

config.port = 3000
config.secret = "randomstring";

config.mongo = {};
config.mongo.host = "localhost:27017";
config.mongo.db = "test";
config.mongo.username = "username";
config.mongo.password = "password";

config.mysql = {};
config.mysql.host = "localhost";
config.mysql.db = "main";
config.mysql.username = "root";
config.mysql.password = "";

module.exports = config;