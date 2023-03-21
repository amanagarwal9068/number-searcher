// Loading environment variables from .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Setting database connection
const getSqlConnection = require('./services/sequelize.js');
global.DATABASE = getSqlConnection();

// Setting database associations
const associations = require('./models/associations.js');
associations();

const config = require('./config/config.js');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const expressSwaggerGenerator = require('express-swagger-generator');
const fs = require('fs');
const cors = require('cors');

// Attaching media files
app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));

// API call logs
app.use(morgan('tiny'));

app.use(express.json());
app.use('/api/worker', require('./routers/worker'));
app.use('/api/media', require('./routers/media'));

// Creating uploads folder for media files
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Setting swagger
const options = {
  swaggerDefinition: {
    info: {
      title: config.SWAGGER_TITLE,
      version: '1.0.0'
    },
    host: config.SWAGGER_DOMAIN_URL,
    basePath: '/api',
    produces: ['application/json'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    }
  },
  basedir: `./`,
  files: ['./routers/*.js']
};
expressSwaggerGenerator(app)(options);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening at ${process.env.SERVER_PORT}`);
});
