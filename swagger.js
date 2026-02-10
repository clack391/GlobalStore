const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'GlobalStore API',
    description: 'E-commerce Backend'
  },
  host: 'globalstore-94hn.onrender.com',
  schemes: ['http', 'https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Run the autogen
swaggerAutogen(outputFile, endpointsFiles, doc);
