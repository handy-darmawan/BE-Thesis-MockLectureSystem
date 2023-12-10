require("dotenv").config();

const db = require("knex")({
    client: "pg",
    connection: {
        host: process.env.DB_Host,
        port: process.env.DB_Port,
        user: process.env.DB_User,
        password: process.env.DB_Password,
        database: process.env.DB_Database,
    }
})

module.exports = db;
