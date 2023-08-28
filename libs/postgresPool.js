const { Pool } = require('pg')
const { config } = require('.././config/config');

//protegemos datos sensibles
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  /* const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '12345',
    database: 'my_store'
  }); */

  const pool = new Pool({connectionString:URI})

module.exports = pool;
