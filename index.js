require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const setupSecurity = require('./middlewares/security'); // Importar el módulo de seguridad

// Inicialización de la aplicación
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parseo de JSON
app.use(express.json());

// Aplicar configuraciones de seguridad
// IMPORTANTE: setupSecurity es una función que recibe app como parámetro
// NO se usa con app.use()
setupSecurity(app);

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Hola servidor de express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Configuración de rutas principales
routerApi(app);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log('Mi puerto ' + port);
});