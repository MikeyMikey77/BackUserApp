const mysql = require("mysql2");

exports.pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "usersdb",
    password: "CHANGE_PASS_HERE"
});