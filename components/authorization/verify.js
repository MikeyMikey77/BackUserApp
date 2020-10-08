const jwt = require('jsonwebtoken');
const {tokenKey} = require('../../config');

exports.verify = function(req, res, next) {

    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization.split(' ')[1], tokenKey, (err, payload) => {

            if (err) return res.status(401).send({ message: "Неверный токен" });
            next();
        })
    }
    else return res.status(403).send({ message: "Доступ запрещен!" });
}