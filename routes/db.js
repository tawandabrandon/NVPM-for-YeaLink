mysql = require('mysql');
var dbUrl = 'localhost';
var port = '3306';
var dbUser = 'root';
var dbPassword = ':p';
var dbName = 'Test';
db = {
	dbUrl : dbUrl,
	port : port,
 	dbUser : dbUser,
 	dbPassword : dbPassword,
 	dbName : dbName,
 	con : 
 		mysql.createConnection({
		host : dbUrl,
		user : dbUser,
		password : dbPassword,
		database : dbName
	}),
 test : function () {
	return connection.connect();
}
}

module.exports = db;