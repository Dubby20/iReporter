import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';


import router from './routes/routes';

const app = express();
const port = process.env.PORT || 5000;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/', (request, response) => response.status(200).json({
  message: 'Welcome to iReporter API'
}));

app.use('/api/v1', router);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;