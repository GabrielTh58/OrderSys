import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0', 
        info: {
            title: 'API do OrderSys',
            version: '1.0.0',
            description: 'API Docs',
        },
        servers: [
            {
                url: 'http://localhost:4000', 
            },
        ],
    },
    apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}