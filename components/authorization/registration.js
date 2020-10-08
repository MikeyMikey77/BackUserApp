const jwt = require('jsonwebtoken');
const {tokenKey} = require('../../config');
const { pool } = require('../dbConnection/mySqlpool');

exports.registration = function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const login = req.body.login;
    const password = req.body.password;

    pool.query("INSERT INTO users (name, login, password) VALUES (?,?,?)", [name, login, password], function (err, data) {
        if (err) {
            res.send({ err: err.sqlMessage });
            return console.log(err.sqlMessage);
        }
        res.send({ token: jwt.sign({ Name: name, Login: login, Password: password }, tokenKey),
                   message: 'User successfully registered!' });
    });
}