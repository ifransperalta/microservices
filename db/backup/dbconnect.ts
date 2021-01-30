let mysql = require("mysql");
let config = require("./dbconfig");

let connection = mysql.createPool({
   host: config.HOST,
   user: config.USER,
   password: config.PASSWORD,
   database: config.DATABASE
});

module.exports = connection;