import pg from 'pg';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  let database = process.env.DB_NAME;
  if (process.env.NODE_ENV === 'test') {
    database = process.env.DB_NAME_TEST;
  }
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const url = `postgres://${user}:${password}@${host}:${port}/${database}`;
  process.env.DATABASE_URL = url;
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL || false
});


pool.on('error', console.error);

export default pool;