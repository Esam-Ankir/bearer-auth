"use strict";

require('dotenv').config();
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');

const users=require('./auth/models/users-model');
const notFoundHandler = require("./middleware/404");
const errorHandler = require("./middleware/500");
const basic = require("./auth/middleware/basic");
const bearer = require("./auth/middleware/bearer");


app.get("/",(req,res) => {
    res.send("This is the home page");
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/signin", basic, async (req, res) => {
    res.status(200).json(req.user);
});

app.post("/signup", async (req, res) => {
    try {
        let username = req.body.username;
        let password = await bcrypt.hash(req.body.password, 10);
            const record = await users.create({
            username: username,
            password: password,
        });
        res.status(201).json(record);
    } catch (e) {
        console.log(e);
    }
});

app.get('/myorders', bearer, (req, res) => {
    res.json({
        'message': 'You are authorized to view the user orders',
        'user': req.user
    });
});

app.use("*", notFoundHandler);
app.use(errorHandler); 

// module.exports = app;
module.exports = {
    server: app,
    start: (port) => {
      app.listen(port, () => {
        console.log(`Server Up on ${port}`);
      });
    },
  };

