import swaggerJsDoc from 'swagger-jsdoc'; 
import swaggerUi from 'swagger-ui-express'; 

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API Documentation',
      contact: {
        name: 'Developer',
      },
      servers: ['http://localhost:3000'],
    },
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rota
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Exportando como uma função para integrar com o Express
export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
