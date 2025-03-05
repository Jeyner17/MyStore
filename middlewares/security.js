// middlewares/security.js
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { config } = require('../config/config');

function setupSecurity(app) {
  // Aplicar CORS
  const corsOptions = {
    origin: '*', // En producción, deberías ser más restrictivo
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));

  // Aplicar Helmet (seguridad HTTP)
  app.use(helmet());

  // Limitar peticiones para prevenir ataques de fuerza bruta
  if (config.isProd) {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // limitar a 100 peticiones por ventana
      message: {
        status: 429,
        message: 'Demasiadas peticiones, por favor intenta más tarde.'
      }
    });
    app.use('/api', limiter);
  }
}

module.exports = setupSecurity;