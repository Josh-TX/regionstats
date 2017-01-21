var config = {};

config.port = 3000
config.secret = "RandomizeMePlease";

config.mongo = {};
config.mongo.host = "localhost:27017";
config.mongo.db = "test";
config.mongo.username = "username";
config.mongo.password = "password";

config.mysql = {};
config.mysql.host = "127.0.0.1";
config.mysql.db = "main";
config.mysql.username = "root";
config.mysql.password = "";

module.exports = config;