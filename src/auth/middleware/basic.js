'use strict';

const Users = require('../models/users-model');
const base64 = require('base-64');

function basic(req, res, next) {
    if (req.headers.authorization) {
        let basicHeaderParts = req.headers.authorization.split(" ");
        let encodedValue = basicHeaderParts.pop();
        let decodedValue = base64.decode(encodedValue);
        let [username, password] = decodedValue.split(":");
        Users.authenticateBasic(username, password)
            .then((validUser) => {
                req.user = validUser;
                next();
            })
            .catch((err) => {
                console.log(err);
                next("Invalid Signin");
            })
    }
}

module.exports = basic;