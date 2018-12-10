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
   *@function add  Red-flag

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
   * @description Gets a specific red-flag by id
   *
   * @static red-flagId
   * @param {object} request Request Object with the given red-flag id
   * @param {object} response Response object
   * @memberof RedFlagController
   *
   * @returns {object} red-flags object or error message if red-flag is not found
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

  /**
       * @description edit red-flag location
       *
       * @static edit a red-flag
       * @memberof RedFlagController
       * @param {object} request The request.
       * @param {object} response The response.
       *@function get  red-flag

       * @returns {object} response.
       */

  static editRedFlag(request, response) {
    const locationRegex = /^([-+]?\d{1,2}([.]\d+)?),\s*([-+]?\d{1,3}([.]\d+)?)$/;

    if (!Number(request.params.id)) {
      return response.status(422).json({
        status: 422,
        error: 'The given red-flag id is not a number'
      });
    }
    pool.query('SELECT  * FROM red_flags WHERE red_flags.id = $1', [request.params.id])
      .then((redFlagId) => {
        if (redFlagId.rowCount < 1) {
          return response.status(404).json({
            status: 404,
            error: 'The red-flag with the given id does not exists'
          });
        }
        const {
          location
        } = request.body;
        if (!location || location.trim().length < 1) {
          return response.status(422).json({
            status: 422,
            error: 'Please enter a location'
          });
        }
        if (!locationRegex.test(location)) {
          return response.status(422).json({
            status: 422,
            error: 'Please enter a valid location'
          });
        }
        if (request.user.id === redFlagId.rows[0].user_id) {
          pool.query(`UPDATE red_flags SET location = '${location}' WHERE red_flags.id = $1 RETURNING *`, [request.params.id])
            .then((data) => {
              const editRedFlagLocation = data.rows[0];
              return response.status(200).json({
                status: 200,
                data: [{
                  id: editRedFlagLocation.id,
                  message: 'Updated red-flag record’s location'
                }]
              });
            }).catch(error => response.status(500).json({
              status: 500,
              error: 'Database Error'
            }));
        } else {
          return response.status(401).json({
            status: 401,
            error: 'Unauthorized'
          });
        }
      }).catch(error => response.status(500).json({
        status: 500,
        error: 'Database Error'
      }));
  }

  /**
       * @description edit red-flag comment
       *
       * @static edit a red-flag
       * @memberof RedFlagController
       * @param {object} request The request.
       * @param {object} response The response.
       *@function get  red-flag

       * @returns {object} response.
       */
  static editRedFlagComment(request, response) {
    const commentRegex = /^[a-zA-Z0-9,. ]+$/;
    if (!Number(request.params.id)) {
      return response.status(422).json({
        status: 422,
        error: 'The given red-flag id is not a number'
      });
    }
    pool.query('SELECT  * FROM red_flags WHERE red_flags.id = $1', [request.params.id])
      .then((redFlagId) => {
        if (redFlagId.rowCount < 1) {
          return response.status(404).json({
            status: 404,
            error: 'The red-flag with the given id does not exists'
          });
        }
        const {
          comment
        } = request.body;
        if (!comment || comment.trim().length < 1) {
          return response.status(422).json({
            status: 422,
            error: 'Please enter a comment'
          });
        }
        if (typeof comment !== 'string' || !commentRegex.test(comment)) {
          return response.status(422).json({
            status: 422,
            error: 'comment must be a string of characters'
          });
        }
        if (request.user.id === redFlagId.rows[0].user_id) {
          pool.query(`UPDATE red_flags SET comment = '${comment}' WHERE red_flags.id = $1 RETURNING *`, [request.params.id])
            .then((data) => {
              const editComment = data.rows[0];
              return response.status(200).json({
                status: 200,
                data: [{
                  id: editComment.id,
                  message: 'Updated red-flag record’s comment'
                }]
              });
            }).catch(error => response.status(500).json({
              status: 500,
              error: 'Database Error'
            }));
        } else {
          return response.status(401).json({
            status: 401,
            error: 'Unauthorized'
          });
        }
      }).catch(error => response.status(500).json({
        status: 500,
        error: 'Database Error'
      }));
  }
}