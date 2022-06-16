"use strict";
const server = require('./src/server');
const { sequelize } = require('./src/auth/models/index-model');
let port= process.env.PORT

sequelize
    .sync()
    .then(() => {
        server.listen(port, () => {
            console.log(`server is listening and running on port ${port}`);
        });
    })
//     .catch((e) => {
//         throw new Error("error in app");
//     });
