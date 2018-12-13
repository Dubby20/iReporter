/* eslint-disable prefer-const */
import pool from '../models/database';
import {
  generateToken,
  hashPassword,
  checkPasswordMatch
} from '../utils';
import {
  errors
} from '../utils/errorHandler';


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
    let {
      firstname,
      lastname,
      othernames,
      username,
      email,
      phoneNumber,
      password
    } = request.body;
    password = hashPassword(password.trim());
    pool.query(
        'INSERT INTO users (firstname, lastname, othernames, username, email, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, firstname, lastname, othernames, username, email, phone_number',
        [firstname, lastname, othernames, username, email, phoneNumber, password]
      )
      .then((data) => {
        const user = data.rows[0];
        const result = {
          id: user.id,
          email: user.email,
          username: user.username
        };
        const token = generateToken(result);
        return response.status(201).json({
          status: 201,
          data: [{
            token,
            user
          }],
          message: 'User created successfully'
        });
      }).catch((err) => {
        response.status(400).json({
          status: 400,
          error: errors.validationError
        });
      });
  }


  /**
    * @description login a  user

    * @memberof UserController
    *@static login a user
    * @param {object} request object
    * @param {object} response  object
    *
    * @returns {object} object

    */

  static login(request, response) {
    /**
* @property {string} request.body.email - The email of user.
* @property {string} request.body.password - The password of user.

* @returns {User}
*/

    const {
      email,
      password
    } = request.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email])
      .then((data) => {
        const user = data.rows[0];
        if (!user) {
          return response.status(422).json({
            status: 422,
            error: 'User does not exists'
          });
        }

        /**
         * comparePassword
         * @param {string} hashPassword
         * @param {string} password

          * @returns {Boolean} return True or False
          */
        if (!checkPasswordMatch(password, user.password)) {
          return response.status(422).json({
            status: 422,
            error: 'Invalid login details. Email or password is wrong'
          });
        }
        /**
         * Gnerate Token
         * @param {string} id
         * @param {string} email
         * @returns {string} token
         */
        const result = {
          id: user.id,
          email: user.email,
          isAdmin: user.is_admin
        };
        const token = generateToken(result);
        return response.status(200).json({
          status: 200,
          data: [{
            token,
            user: {
              email: user.email,
              isAdmin: user.is_admin
            }
          }],
          message: 'Successfully signed in'
        });
      }).catch(err => response.status(400).json({
        status: 400,
        error: err.message
      }));
  }
}