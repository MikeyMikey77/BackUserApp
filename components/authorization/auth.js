const jwt = require('jsonwebtoken');
const {tokenKey} = require('../../config');
const { pool } = require('../dbConnection/mySqlpool.js');

exports.auth = (req, res) => {

    if (!req.body) {
        return res.sendStatus(400);
    }

    const login = req.body.login;
    const password = req.body.password;

    const sql = `SELECT * FROM users WHERE Login=?`;
    const filter = [login];

    pool.query(sql, filter, function (err, results) {
        if (err) res.status(404).json({ message: err.message });
        else if (results.length === 0) {
            return res.send({ message: "User not found!" });
        }
        else {

            if (results[0].Password === password) {
                res.status(200).json({
                    token: jwt.sign({ results }, tokenKey),
                    message: 'You are successfully logged in!'
                });
            }
            else res.send({ message: "bad password" });
        }
    });
}