"use strict";
require('dotenv').config();
const server = require('./src/server');
const { sequelize } = require('./src/auth/models/index-model');
// let port = process.env.PORT

sequelize
    .sync()
    .then(() => {
        // server.listen(port, () => {
        //     console.log(`server is listening and running on port ${port}`);
        // });
        require('./src/server.js').start(process.env.PORT);

    })
    // .catch((e) => {
    //     throw new Error("error in app");
    // });
