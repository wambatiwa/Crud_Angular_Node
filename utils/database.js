// const mysql = require("mysql2");

const config = require("../config/config.json");

// const pool = mysql.createPool({
//     host: config.host,
//     user: config.user,
//     database: config.database,
//     password: config.password
// });

// module.exports = pool.promise();

const mysql = require('mysql2');

let dbConfig;
if (process.env.NODE_ENV === 'test') {
  dbConfig = {
    host: config.host,
    user: config.user,
    database: config.testDb,
    password: config.password
  };
} else {
  dbConfig = {
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
  };
}

const pool = mysql.createPool(dbConfig);

module.exports = pool.promise();

