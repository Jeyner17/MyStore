// config/config.js
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  
  // Soporte para DATABASE_URL completa (utilizada por Render)
  dbUrl: process.env.DATABASE_URL,
  
  // Configuración individual para desarrollo local
  dbUser: process.env.DB_USER || 'postgres',
  dbPass: process.env.DB_PASSWORD || 'tu_contraseña',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5432,
  dbName: process.env.DB_NAME || 'my_store'
};

module.exports = { config };