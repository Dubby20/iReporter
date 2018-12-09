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
}