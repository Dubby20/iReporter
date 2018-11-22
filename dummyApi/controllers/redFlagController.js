import incidents from '../models/redFlag';
import users from '../models/users';
import {
  RedFlagValidator
} from '../Helpers/validateRedFlag';

/**
 * Creates a new redFlagValidator.
 * @class redFlagValidator
 */

const red_Flag_Validator = new RedFlagValidator();
class RedFlagControllers {
  /**
   * Creates a red-flag
   * * @api {post} /api/user Create red-flag
   *
   * @param {object} request - Request object
   * @param {object} response - Response object

   * @returns {json} created object
   * @memberof redFlagControllers
   */

  static createRedFlag(request, response) {
    const result = red_Flag_Validator.testRedFlag(request.body);
    if (!result.passing) {
      return response.status(400).json({
        status: 400,
        error: result.err
      });
    }
    const postRedFlag = {
      id: incidents.length + 1,
      createdOn: new Date(),
      createdBy: request.body.createdBy,
      type: request.body.type,
      location: request.body.location,
      status: request.body.status,
      images: request.body.images,
      videos: request.body.videos,
      comment: request.body.comment
    };
    const userId = incidents.map(item => users.find(id => item.createdBy == id.id));
    console.log(userId);
    incidents.createdBy = userId;
    if (!userId) {
      return response.status(404).json({
        status: 404,
        error: 'The userId is not found'
      });
    }
    incidents.push(postRedFlag);
    return response.status(201).json({
      status: 201,
      data: [{
        id: postRedFlag.id,
        // incidents,
        message: 'Created red-flag record'
      }]
    });
  }

  /**
   * Gets all the incidents
   * @param {object} request Request object
   * @param {object} response Response object
   *
   * @returns {json} List of all incidents array
   * @memberof RedFlagControllers
   */

  static getAllRedFlag(request, response) {
    if (!incidents) {
      return response.status(404).json({
        status: 404,
        error: 'No incidents found'
      });
    }
    return response.status(200).json({
      status: 200,
      data: [{
        incidents,
        message: 'All red-flag records retrieved successfully'
      }]
    });
  }
}


export default RedFlagControllers;