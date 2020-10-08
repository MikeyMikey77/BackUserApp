const { pool } = require('../dbConnection/mySqlpool.js');

exports.getUsers = function (req, res) {

    pool.query("SELECT * FROM users", function (err, data) {

        if (err) return res.json({ message: "error in database"});

        let users = data.map( user => { return { Name: user.Name, Login: user.Login, Id: user.Id } });
        return res.json(users);
    });
}