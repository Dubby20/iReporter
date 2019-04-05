import bcrypt from 'bcrypt';
import 'dotenv/config';
import pool from './database';

const salt = bcrypt.genSaltSync(10);
const logger = console;

const userQuery = `INSERT INTO users(
  firstname,
  lastname,
  othernames,
  username,
  email,
  password,
  phone_number,
  is_admin
) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

const data = {
  firstname: 'Dubby',
  lastname: 'Alex',
  othernames: 'Dubem',
  username: 'admin',
  email: 'admin@yahoo.com',
  password: bcrypt.hashSync('password', salt),
  phoneNumber: '07056734563',
  isAdmin: true
};

const users = `CREATE TABLE IF NOT EXISTS
  users(
    id serial PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    othernames VARCHAR NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`;

const redFlags = `CREATE TABLE IF NOT EXISTS
  red_flags(
    id serial PRIMARY KEY,
    user_id INTEGER NOT NULL,
    location VARCHAR NOT NULL,
    comment VARCHAR NOT NULL,
    images TEXT NOT NULL,
    videos TEXT NOT NULL,
    status VARCHAR DEFAULT 'draft',
    type VARCHAR DEFAULT 'red-flag',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY( user_id ) REFERENCES users( id ) ON DELETE CASCADE
  )`;

const interventions = `CREATE TABLE IF NOT EXISTS
  interventions(
    id serial PRIMARY KEY,
    user_id INTEGER NOT NULL,
    location VARCHAR NOT NULL,
    comment VARCHAR NOT NULL,
    images TEXT NOT NULL,
    videos TEXT NOT NULL,
    status VARCHAR DEFAULT 'draft',
    type VARCHAR DEFAULT 'intervention',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY( user_id ) REFERENCES users( id ) ON DELETE CASCADE
  )`;

const createTables = () => {
  pool.query(users)
    .then(res => pool.query(redFlags))
    .then(res => pool.query(interventions))

    .then((res) => {
      logger.info('Migration succesful.');
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};

const seedData = () => {
  const values = Object.values(data);
  pool.query(userQuery, values, (err, result) => {
    if (err) throw err;
  });
};


const dropDatabase = () => {
  pool.query('DROP TABLE IF EXISTS users, red_flags, interventions')
    .then((res) => {
      logger.info('Tables dropped succesfully.');
    });
};

module.exports = {
  createTables,
  dropDatabase,
  seedData
};

require('make-runnable');