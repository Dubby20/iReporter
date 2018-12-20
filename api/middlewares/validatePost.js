/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-operators */
import {
  handleError
} from '../utils/errorHandler';

const locationRegex = /^([-+]?\d{1,2}([.]\d+)?),\s*([-+]?\d{1,3}([.]\d+)?)$/;
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
    if (typeof location !== 'string') {
      return handleError(response, 'Location must be a string');
    }
    if (!(location && location.trim().length)) {
      return handleError(response, 'Please enter your location');
    }
    if (typeof location !== 'string' || !locationRegex.test(location)) {
      return handleError(response, 'location does not match a Lat Long coordinates');
    }

    if (!images) {
      return handleError(response, 'Please enter an image url');
    }

    if (!Array.isArray(images)) {
      return handleError(response, 'Images must be an array');
    }

    const notAString = images.filter(image => typeof image !== 'string' || image.length < 1);
    // if (typeof image !== 'string') {
    //   return handleError(response, 'Please enter an image url...');
    // }
    if (notAString.length >= 1) {
      return handleError(response, 'image must be a string and not empty');
    }

    if (!videos) {
      return handleError(response, 'Please enter a video url');
    }
    if (!Array.isArray(videos)) {
      return handleError(response, 'videos must be an array');
    }

    const notAVideoString = videos.filter(video => typeof video !== 'string' || video.length < 1);
    // if (typeof video !== 'string') {
    //   return handleError(response, 'Please enter a video url.......');
    // }
    if (notAVideoString.length >= 1) {
      return handleError(response, 'video must be a string and not empty');
    }
    // if (!(notAVideoString && notAVideoString.trim().length)) {
    //   return handleError(response, 'Please enter a video url');
    // }`

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
      return handleError(response, 'location does not match a Lat Long coordinates');
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