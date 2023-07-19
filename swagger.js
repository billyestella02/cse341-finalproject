import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'CSE341 Final Project API',
        description: 'A simple API for a basic E-comerce web app'
    },
    host: 'cse341-final-project.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);