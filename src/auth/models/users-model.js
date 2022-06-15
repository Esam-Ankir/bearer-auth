'use strict';
require("dotenv").config();

const { sequelize, DataTypes } = require("./index-model");
const SECRET=process.env.SECRET
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = sequelize.define("userTable", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.VIRTUAL,
        get() {
            return jwt.sign({
              username: this.username
            }, process.env.SECRET,{ expiresIn: '60s' });
          }
        }
    }
);

users.authenticateBasic = async function (username, password) {
    const user = await users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        let newToken = jwt.sign({ username: user.username }, SECRET);
        user.token = newToken;
        return user;
    }
    else {
        throw new Error("Invalid user");
    }
}
users.authenticateBearer = async function (token) {
    const parsedToken = jwt.verify(token, SECRET);
    const user = await users.findOne({ where: { username: parsedToken.username } });
    if (user.username) {
        return user;
    } else {
        throw new Error("Invalid Token");
    }
}
module.exports = users;
