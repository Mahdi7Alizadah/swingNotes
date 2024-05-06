const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Swagger.json');
const opn = require('opn');

const setupSwagger = (app, PORT) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  opn(`http://localhost:${PORT}/api-docs`);
};

module.exports = setupSwagger;