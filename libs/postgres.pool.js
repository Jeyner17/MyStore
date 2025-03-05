// libs/postgres.pool.js
const { Pool } = require('pg');
const { config } = require('./../config/config');

// Usar DATABASE_URL si está disponible (para Render), o construir la URI
const URI = config.dbUrl || `postgres://${encodeURIComponent(config.dbUser)}:${encodeURIComponent(config.dbPass)}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  connectionString: URI
};

// Agregar configuración SSL para producción
if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false // Necesario para Render
  };
  
  // Agregar configuración de pool para producción
  options.max = 5; // Máximo número de clientes en el pool
  options.idleTimeoutMillis = 30000; // Tiempo máximo que un cliente puede estar inactivo
  options.connectionTimeoutMillis = 2000; // Tiempo máximo para establecer conexión
}

const pool = new Pool(options);

module.exports = pool;