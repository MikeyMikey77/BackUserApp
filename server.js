const express = require('express');
const bodyParser = require('body-parser');
const { verify } = require('./components/authorization/verify');
const { pool } = require('./components/dbConnection/mySqlpool.js');
const { registration } = require('./components/authorization/registration.js');
const { getUsers } = require('./components/users/getUsers.js');
const { auth } = require('./components/authorization/auth.js');
const { port } = require('./bin/www');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next(); // make sure we go to the next routes and don't stop here
});

// авторизация
app.post('/api/auth', auth)

// получение списка пользователей
app.get("/users", verify, getUsers);
// Регистрация новых пользователей
app.post("/registration", registration);

app.listen(port, function () {
    console.log('Server is listening on port 8080');
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    pool.end(function (err) {
        if (err) {
            return console.log(err.message);
        }
    });
    process.exit();
});
