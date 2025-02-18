// api-docs/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Event Manager API',
            version: '1.0.0',
            description: 'API for managing events, users, RSVPs, and categories',
        },
        host: "event-manager-api-8x3w.onrender.com",
        schemes: ["https"],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };