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
   * @description Gets all the red-flags record
   *
  * @static allRedFlags
   * @param {object} request Request object
   * @param {object} response Response object
   * @memberof RedFlagController

   * @returns {object} List of all red-flags records
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

}