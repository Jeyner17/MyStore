// libs/postgres.js
const { Client } = require('pg');
const { config } = require('./../config/config');

async function getConnection() {
  const client = new Client({
    connectionString: config.dbUrl || `postgres://${encodeURIComponent(config.dbUser)}:${encodeURIComponent(config.dbPass)}@${config.dbHost}:${config.dbPort}/${config.dbName}`,
    ssl: config.isProd ? {
      rejectUnauthorized: false
    } : false
  });
  await client.connect();
  return client;
}

module.exports = getConnection;