const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'GlobalStore API',
    description: 'E-commerce Backend'
  },
  host: 'localhost:8080',
  schemes: ['http', 'https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Run the autogen
swaggerAutogen(outputFile, endpointsFiles, doc);
