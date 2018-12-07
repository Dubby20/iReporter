import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/database';
import {
  ValidateUserSignup
} from '../middlewares/validateUser';


/**
 * Creates a new ValidateUserSignup.
 * @class ValidateUserSignup
 */
const validateSignup = new ValidateUserSignup();
export default class UserController {
  /**
   * @description creates new user

   * @static signup a user
   * @memberof UserController
   * @param {object} request object
   * @param {object} response object
   *@function signup

   * @returns {object} object
   */

  static signup(request, response) {
    const results = validateSignup.testUsers(request.body);
    if (!results.passing) {
      return response.status(422).json({
        status: 422,
        error: results.err
      });
    }

    /**
 * Create new user
 * @property {string} request.body.firstname - The firstname of user.
 * @property {string} request.body.lastname - The lastname of user.
 * @property {string} request.body.othernames - The othernames of user.
 * @property {string} request.body.username - The username of user.
 * @property {string} request.body.email - The email of user.
 * @property {string} request.body.password - The password of user.
 * @property {string} request.body.phoneNumber - The phone number of user.

 * @returns {User}
 */
    const {
      firstname,
      lastname,
      othernames,
      username,
      email,
      phoneNumber,
      password
    } = request.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email])
      .then((result) => {
        const emailExists = result.rows[0];
        if (emailExists) {
          return response.status(409).json({
            status: 'Error',
            message: 'Email already exists'
          });
        }
        pool.query('SELECT * FROM users WHERE username = $1', [username])
          // eslint-disable-next-line no-shadow
          .then((result) => {
            const usernameExists = result.rows[0];
            if (usernameExists) {
              return response.status(409).json({
                status: 'Error',
                message: 'Username already exists'
              });
            }

            /**
             * Hash Password Method
             * @param {string} password
             * @returns {string} returns hashed password
             */

            bcrypt.hash(password, 10, (error, hash) => {
              pool.query(
                  'INSERT INTO users (firstname, lastname, other_names, username, email, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, firstname, lastname, other_names, username, email, phone_number',
                  [firstname, lastname, othernames, username, email, phoneNumber, hash]
                )
                .then((data) => {
                  const user = data.rows[0];

                  /**
                   * Gnerate Token
                   * @param {string} id
                   * @param {string} email
                   * @returns {string} token
                   */

                  const token = jwt.sign({
                    id: user.id,
                    email: user.email
                  }, process.env.SECRET, {
                    expiresIn: '48h'
                  });
                  // const {
                  //   password,
                  //   ...newUser
                  // } = user
                  return response.status(201).json({
                    status: 201,
                    data: [{
                      token,
                      user,
                      message: 'User created successfully'
                    }]
                  });
                }).catch((err) => {
                  response.status(500).json({
                    status: 500,
                    error: 'Error'
                  });
                });
            });
          }).catch(err => response.status(501).json({
            status: 501,
            error: 'Error'
          }));
      }).catch(err => response.status(502).json({
        status: 502,
        error: 'Error'
      }));
  }
}