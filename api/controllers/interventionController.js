import pool from '../models/database';
import {
  InterventionValidator
} from '../middlewares/validateIntervention';

const validateIntervention = new InterventionValidator();

export default class InterventionController {
  /**
    * @description creates an intervention
    *
    * @static creates an intervention
    * @memberof RedFlagController
    * @param {object} request The request.
    * @param {object} response The response.
    *@function add  intervention

    * @returns {object} response.
    */
  static createIntervention(request, response) {
    const results = validateIntervention.testIntervention(request.body);
    if (!results.passing) {
      return response.status(422).json({
        status: 422,
        message: results.err
      });
    }
    /**
 * Create new intervention
 * @property {string} request.body.location- The location of the incident
 * @property {string} request.body.comment - The description of the incident.
 * @property {array} request.body.images - Images of the incident.
 * @property {array} request.body.videos- Videos of the incident.

 * @returns {Intervention}
 */
    const {
      location,
      images,
      videos,
      comment
    } = request.body;
    pool.query('INSERT INTO interventions (user_id, location, images, videos, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [request.user.id, location, images, videos, comment])
      .then((data) => {
        const intervention = data.rows[0];
        return response.status(201).json({
          status: 201,
          data: [{
            id: intervention.id,
            message: 'Created intervention record'
          }]
        });
      })
      .catch(err => response.status(500).json({
        status: 500,
        error: 'Database Error'
      }));
  }

  /**
   * @description Gets all the interventions record
   *
  * @static allInterventions
   * @param {object} request Request object
   * @param {object} response Response object
   * @memberof InterventionController

   * @returns {object} List of all interventions records
   */

  static allInterventions(request, response) {
    pool.query('SELECT * FROM interventions')
      .then((data) => {
        const intervention = data.rows;
        if (intervention.length === 0) {
          return response.status(404).json({
            status: 404,
            error: 'No intervention record yet'
          });
        }
        return response.status(200).json({
          status: 200,
          data: [{
            intervention,
            message: 'All interventions was retrieved successfully'
          }]
        });
      }).catch(err => response.status(500).json({
        status: 500,
        error: 'Database Error'
      }));
  }

  /**
   * @description Gets a specific intervention by id
   *
   * @static interventionId
   * @param {object} request Request Object with the given intervention id
   * @param {object} response Response object
   * @memberof RedFlagController
   *
   * @returns {object} interventions object or error message if intervention is not found
   */
  static interventionId(request, response) {
    if (!Number(request.params.id)) {
      return response.status(422).json({
        status: 422,
        error: 'The given intervention id is not a number'
      });
    }
    pool.query('SELECT * FROM interventions where id = $1', [request.params.id])
      .then((data) => {
        const intervention = data.rows[0];
        if (!intervention) {
          return response.status(404).json({
            status: 404,
            error: 'The id of the given intervention was not found'
          });
        }
        return response.status(200).json({
          status: 200,
          data: [{
            intervention,
            message: 'Get a specific intervention was successful'
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

  static interventionLocation(request, response) {
    const locationRegex = /^([-+]?\d{1,2}([.]\d+)?),\s*([-+]?\d{1,3}([.]\d+)?)$/;

    if (!Number(request.params.id)) {
      return response.status(422).json({
        status: 422,
        error: 'The given intervention id is not a number'
      });
    }
    pool.query('SELECT  * FROM interventions WHERE interventions.id = $1', [request.params.id])
      .then((interventionId) => {
        if (interventionId.rowCount < 1) {
          return response.status(404).json({
            status: 404,
            error: 'The intervention with the given id does not exists'
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
        if (request.user.id === interventionId.rows[0].user_id) {
          pool.query(`UPDATE interventions SET location = '${location}' WHERE interventions.id = $1 RETURNING *`, [request.params.id])
            .then((data) => {
              const editInterventionLocation = data.rows[0];
              return response.status(200).json({
                status: 200,
                data: [{
                  id: editInterventionLocation.id,
                  message: 'Updated intervention record’s location'
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
        error: 'Server Error'
      }));
  }

}