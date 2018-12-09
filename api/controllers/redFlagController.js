import pool from '../models/database';
import {
  RedFlagValidator
} from '../middlewares/validateRedFlag';

const validateRedFlag = new RedFlagValidator();
export default class RedFlagController {
  /**
   * @description creates a red-flag
   *
   * @static creates a red-flag
   * @memberof RedFlagController
   * @param {object} request The request.
   * @param {object} response The response.
   *@function addMenu

   * @returns {object} response.
   */

  static createRedFlag(request, response) {
    const results = validateRedFlag.testRedFlag(request.body);
    if (!results.passing) {
      return response.status(422).json({
        status: 422,
        message: results.err
      });
    }
    /**
 * Create new red-flag
 * @property {string} request.body.location- The location of the incident
 * @property {string} request.body.comment - The description of the incident.
 * @property {array} request.body.images - Images of the incident.
 * @property {array} request.body.videos- Videos of the incident.

 * @returns {RedFlag}
 */
    const {
      location,
      images,
      videos,
      comment
    } = request.body;
    pool.query('INSERT INTO red_flags (user_id, location, images, videos, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [request.user.id, location, images, videos, comment])
      .then((data) => {
        const redFlag = data.rows[0];
        return response.status(201).json({
          status: 201,
          data: [{
            id: redFlag.id,
            message: 'Created red-flag record'
          }]
        });
      })
      .catch(err => response.status(500).json({
        status: 500,
        error: 'Database Error'
      }));
  }

  /**
    * @description Gets all the red-flags record
    *
   * @static allRedFlags
    * @param {object} request Request object
    * @param {object} response Response object
    * @memberof RedFlagController

    * @returns {object} List of all red-flags records
    */

  static allRedFlags(request, response) {
    pool.query('SELECT * FROM red_flags')
      .then((data) => {
        const redFlag = data.rows;
        if (redFlag.length === 0) {
          return response.status(404).json({
            status: 404,
            error: 'No red-flag record yet'
          });
        }
        return response.status(200).json({
          status: 200,
          data: [{
            redFlag,
            message: 'All red-flags was retrieved successfully'
          }]
        });
      }).catch(err => response.status(500).json({
        status: 500,
        error: 'Database Error'
      }));
  }

  /**
   * @description Gets a specific order by id
   *
   * @static orderId
   * @param {object} request Request Object with the given order id
   * @param {object} response Response object
   * @memberof OrderController
   *
   * @returns {object} orders object or error message if order is not found
   */
  static redFlagId(request, response) {
    if (!Number(request.params.id)) {
      return response.status(400).json({
        status: 400,
        error: 'The given red-flag id is not a number'
      });
    }
    pool.query('SELECT * FROM red_flags where id = $1', [request.params.id])
      .then((data) => {
        const redFlag = data.rows[0];
        if (!redFlag) {
          return response.status(404).json({
            status: 404,
            error: 'The id of the given red-flag was not found'
          });
        }
        return response.status(200).json({
          status: 200,
          data: [{
            redFlag,
            message: 'Get a specific red-flag was successful'
          }]
        });
      }).catch(err => response.status(500).json({
        status: 500,
        error: 'Database Error'
      }));
  }
}