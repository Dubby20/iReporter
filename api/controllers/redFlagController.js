import pool from '../models/database';
import {
  errors
} from '../utils/errorHandler';

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
            redFlag,
            message: 'Created red-flag record'
          }]
        });
      })
      .catch(err => response.status(400).json({
        status: 400,
        error: errors.validationError
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
        if (redFlag.rowCount < 1) {
          return response.status(200).json({
            status: 200,
            data: []
          });
        }
        return response.status(200).json({
          status: 200,
          data: [{
            redFlag,
            type: 'Red-flag',
            message: 'All red-flags was retrieved successfully'
          }]
        });
      }).catch(err => response.status(400).json({
        status: 400,
        error: errors.validationError
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
    pool.query('SELECT * FROM red_flags where id = $1', [request.params.id])
      .then((data) => {
        const report = data.rows[0];
        if (!report) {
          return response.status(404).json({
            status: 404,
            error: 'The id of the given red-flag was not found'
          });
        }
        return response.status(200).json({
          status: 200,
          data: [{
            report,
            message: 'Get a specific red-flag was successful'
          }]
        });
      }).catch(err => response.status(400).json({
        status: 400,
        error: errors.validationError
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
        if (request.user.id === redFlagId.rows[0].user_id) {
          pool.query(`UPDATE red_flags SET location = '${location}' WHERE red_flags.id = $1 RETURNING *`, [request.params.id])
            .then((data) => {
              const editRedFlagLocation = data.rows[0];
              return response.status(200).json({
                status: 200,
                data: [{
                  id: editRedFlagLocation.id,
                  editRedFlagLocation,
                  message: 'Updated red-flag record’s location'
                }]
              });
            }).catch(error => response.status(400).json({
              status: 400,
              error: errors.validationError
            }));
        } else {
          return response.status(401).json({
            status: 401,
            error: 'You must signup or login to access this route'
          });
        }
      }).catch(error => response.status(400).json({
        status: 400,
        error: errors.validationError
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
        if (request.user.id === redFlagId.rows[0].user_id) {
          pool.query(`UPDATE red_flags SET comment = '${comment}' WHERE red_flags.id = $1 RETURNING *`, [request.params.id])
            .then((data) => {
              const editComment = data.rows[0];
              return response.status(200).json({
                status: 200,
                data: [{
                  id: editComment.id,
                  editComment,
                  message: 'Updated red-flag record’s comment'
                }]
              });
            }).catch(error => response.status(400).json({
              status: 400,
              error: 'Database Error'
            }));
        } else {
          return response.status(401).json({
            status: 401,
            error: 'You must signup or login to access this route'
          });
        }
      }).catch(error => response.status(400).send({
        status: 400,
        error: errors.validationError
      }));
  }

  /**
       * @description delete red-flag
       *
       * @static delete a red-flag
       * @memberof RedFlagController
       * @param {object} request The request.
       * @param {object} response The response.
       *@function delete red-flag

       * @returns {object} response.
       */
  static deleteRedFlag(request, response) {
    pool.query('SELECT  * FROM red_flags WHERE red_flags.id = $1', [request.params.id])
      .then((redFlagId) => {
        if (redFlagId.rowCount < 1) {
          return response.status(404).json({
            status: 404,
            error: 'The red-flag with the given id does not exists'
          });
        }
        if (request.user.id === redFlagId.rows[0].user_id) {
          pool.query('DELETE FROM red_flags WHERE red_flags.id = $1 RETURNING *', [request.params.id])
            .then((data) => {
              const delRedFlag = data.rows[0];
              response.status(202).json({
                status: 202,
                data: [{
                  id: delRedFlag.id,
                  type: 'red-flag',
                  message: 'Red-flag record has been deleted'
                }]
              });
            }).catch(error => response.status(400).json({
              status: 400,
              error: errors.validationError
            }));
        } else {
          return response.status(401).json({
            status: 401,
            error: 'You must signup or login to access this route'
          });
        }
      }).catch(error => response.status(400).json({
        status: 400,
        error: errors.validationError
      }));
  }


  /**
      * @description update red-flag status
      *
      * @static update a red-flag status
      * @memberof RedFlagController
      * @param {object} request The request.
      * @param {object} response The response.
      *@function update red-flag status

      * @returns {object} response.
      */

  static updateRedFlagStatus(request, response) {
    const {
      status
    } = request.body;
    pool.query(`UPDATE red_flags SET status = '${status}' WHERE id = $1 RETURNING *`, [request.params.id])
      .then((data) => {
        const redFlagStatus = data.rows;
        if (redFlagStatus.length < 1) {
          return response.status(404).json({
            status: 404,
            error: 'The status with the given red-flag id was not found'
          });
        }
        return response.status(200).json({
          status: 200,
          data: [{
            id: redFlagStatus.id,
            redFlagStatus,
            message: 'Updated red-flag record’s status'

          }]
        });
      }).catch(err => response.status(400).json({
        status: 400,
        error: errors.validationError
      }));
  }

  static userRedFlagRecords(request, response) {
    /**
    * @description gets a user red-flags record

    * @static userRedFlagfRecords
    * @memberof RedFlagController
    * @param {object} request object
    * @param {object} response object
    *@function userRedFlagfRecords

    * @returns {object} object
    */
    pool.query('SELECT  * FROM red_flags WHERE user_id = $1', [request.params.id])
      .then((data) => {
        const redFlags = data.rows;
        if (redFlags.length === 0) {
          return response.status(404).json({
            status: 404,
            error: 'User has no red-flag record'
          });
        }
        return response.status(200).json({
          status: 200,
          data: [{
            redFlags,
            type: 'Red-flag',
            message: 'Successful'
          }]
        });
      }).catch(error => response.status(400).json({
        status: 400,
        error: errors.validationError
      }));
  }
}