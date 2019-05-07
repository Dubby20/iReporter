import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
// import 'dotenv/config';

import swaggerDocument from '../swagger.json';

import router from './routes/routes';


const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// app.use(express.static(path.join(__dirname, '../UI')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (request, response) => response.status(200).json({
  message: 'Welcome to iReporter API'
}));

app.use('/api/v1', router);
app.use((request, response, next) => {
  response.status(404).json({
    status: 404,
    error: 'Endpoint not found'
  });
  next();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;