import pg from 'pg';
import config from '../config/config';

require('dotenv').config();


const dbConnection = () => {
  const {
    NODE_ENV
  } = process.env;
  let dbURL;
  if (NODE_ENV === 'development') {
    dbURL = config.development.database;
  } else if (NODE_ENV === 'test') {
    dbURL = config.test.database;
  } else {
    dbURL = config.production.database;
  }
  return dbURL;
};

const pool = new pg.Pool({
  connectionString: dbConnection(),
  ssl: true
});


pool.on('error', console.error);

export default pool;