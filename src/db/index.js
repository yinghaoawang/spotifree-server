const pgp = require('pg-promise')();
const config = require('./config');

const db = pgp(config.connectionString);

module.exports = db;
