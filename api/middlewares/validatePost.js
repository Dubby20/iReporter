/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-operators */
import {
  handleError
} from '../utils/errorHandler';

const locationRegex = /[A-Za-z]/;
const validIdRegex = /^[1-9]{1,}/;

/**
 * @description Validate create record input
 *
 * @constructor
 * @param {String} request
 * @param {Object} response
 *
 * @returns {Object} Object
 */

export default class PostValidator {
  static validatePostRecord(request, response, next) {
    const {
      location,
      images,
      videos,
      comment
    } = request.body;
    if (typeof location !== 'string' || !locationRegex.test(location)) {
      return handleError(response, 'Invalid location');
    }
    if (location.length < 5) {
      return handleError(response, 'Location must be at least 5 characters long');
    }
    if (!(location && location.trim().length)) {
      return handleError(response, 'Please enter your location');
    }

    if (!Array.isArray(images)) {
      return handleError(response, 'Images must be an array');
    }

    const notAString = images.filter(image => typeof image !== 'string');

    if (notAString.length >= 1) {
      return handleError(response, 'image must be a string');
    }

    if (!Array.isArray(videos)) {
      return handleError(response, 'videos must be an array');
    }

    const notAVideoString = videos.filter(video => typeof video !== 'string');

    if (notAVideoString.length >= 1) {
      return handleError(response, 'video must be a string');
    }


    if (typeof comment !== 'string') {
      return handleError(response, 'comment must be a string of characters');
    }

    if (!(comment && comment.trim().length)) {
      return handleError(response, 'Please enter a comment');
    }

    return next();
  }


  static validateLocation(request, response, next) {
    const {
      location
    } = request.body;
    if (typeof location !== 'string') {
      return handleError(response, 'Location must be a string');
    }
    if (!(location && location.trim().length)) {
      return handleError(response, 'Please enter your location');
    }
    if (typeof location !== 'string' || !locationRegex.test(location)) {
      return handleError(response, 'Invalid location');
    }
    return next();
  }

  static validateStatus(request, response, next) {
    const {
      status
    } = request.body;
    if (typeof status !== 'string') {
      return handleError(response, 'Status must be a string');
    }
    if (!(status && status.trim().length)) {
      return handleError(response, 'Status is required');
    }
    if (typeof status !== 'string' || status !== 'under investigation' && status !== 'resolved' && status !== 'rejected') {
      return handleError(response, 'Invalid status, status must be a string containing under investigation, resolved or rejected');
    }
    return next();
  }

  static validateComment(request, response, next) {
    const {
      comment
    } = request.body;

    if (typeof comment !== 'string') {
      return handleError(response, 'comment must be a string of characters');
    }
    if (!(comment && comment.trim().length)) {
      return handleError(response, 'Please enter a comment');
    }

    return next();
  }

  static validateId(request, response, next) {
    if (!validIdRegex.test(request.params.id)) {
      return handleError(response, 'The given id is not a number');
    }
    return next();
  }
}