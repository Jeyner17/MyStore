// config/database.js
const { config } = require('./../config/config');

// Usar DATABASE_URL directamente si está disponible (para Render)
const URI = config.dbUrl || `postgres://${encodeURIComponent(config.dbUser)}:${encodeURIComponent(config.dbPass)}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
    // Configuración de pool para entorno de producción
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};