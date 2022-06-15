"use strict";
const server = require('./src/server');
const { db } = require('./src/auth/models/index-model');
let port= process.env.PORT

db
    .sync()
    .then(() => {
        server.listen(port, () => {
            console.log(`server is listening and running on port ${port}`);
        });
    })
    .catch((e) => {
        throw new Error("error in app");
    });