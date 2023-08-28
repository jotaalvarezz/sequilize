const { Client } = require('pg')

const getConnection = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '12345',
    database: 'my_store'
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
