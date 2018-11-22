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
    const userId = users.find(user => user.id === postRedFlag.createdBy);
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
        message: 'Created red-flag record'
      }]
    });
  }

  /**
   * Gets all red-flag records
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
        error: 'No red-flag record found'
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

  /**
   * Gets a specific red-flag record
   * @param {object} request Request object
   * @param {object} response Response object
   *
   * @returns {json} List of a specific red-flag record
   * @memberof RedFlagControllers
   */

  static getRedFlagId(request, response) {
    const getId = incidents.find(item => item.id === parseInt(request.params.id, 10));
    if (!Number(request.params.id)) {
      return response.status(400).json({
        status: 400,
        error: 'The given id is not a number'
      });
    }
    if (!getId) {
      return response.status(404).json({
        status: 404,
        error: 'The red-flag record with the given ID was not found'
      });
    }
    return response.status(200).json({
      status: 200,
      data: [{
        getId,
        message: 'The given red-flag id retrieved successfullly'
      }]
    });
  }

  /**
   * Updates a specific red-flag record location
   * @param {object} request Request object
   * @param {object} response Response object
   *
   * @returns {json} A specific red-flag record location
   * @memberof RedFlagControllers
   */
  static updateRedFlagLocation(request, response) {
    const locationRegex = /^([-+]?\d{1,2}([.]\d+)?),\s*([-+]?\d{1,3}([.]\d+)?)$/;
    const redFlagId = incidents.find(item => item.id === parseInt(request.params.id, 10));
    if (!Number(request.params.id)) {
      return response.status(400).json({
        status: 400,
        error: 'The given id is not a number'
      });
    }
    if (!redFlagId) {
      return response.status(404).json({
        status: 404,
        error: 'The red-flag record with the given ID was not found'
      });
    }

    const {
      location
    } = request.body;
    if (!location || location.trim().length < 1) {
      return response.status(400).json({
        status: 400,
        error: 'Please enter a location'
      });
    }
    if (!locationRegex.test(location)) {
      return response.status(400).json({
        status: 400,
        error: 'Please enter a valid location'
      });
    }
    const locationId = incidents.indexOf(redFlagId);
    redFlagId.locationId = request.body.location;
    incidents[locationId] = redFlagId;
    return response.status(200).json({
      status: 200,
      data: [{
        id: redFlagId.id,
        message: 'Updated red-flag record’s location'
      }]
    });
  }

  /**
   * Deletes a specific red-flag record
   * @param {object} request Request object
   * @param {object} response Response object
   *
   * @returns {object} response object
   * @memberof RedFlagControllers
   */
  static deleteRedFlagId(request, response) {
    const redFlagId = incidents.find(item => item.id === parseInt(request.params.id, 10));
    if (!Number(request.params.id)) {
      return response.status(400).json({
        status: 400,
        error: 'The given id is not a number'
      });
    }
    if (!redFlagId) {
      return response.status(404).json({
        status: 404,
        error: 'The red-flag record with the given ID was not found'
      });
    }
    const index = incidents.indexOf(redFlagId);
    console.log(index);
    incidents.splice(index, 1);
    return response.status(200).json({
      status: 200,
      data: [{
        id: redFlagId.id,
        message: 'red-flag record has been deleted successfully'
      }]
    });
  }
}


export default RedFlagControllers;