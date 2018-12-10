/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-operators */
const locationRegex = /^([-+]?\d{1,2}([.]\d+)?),\s*([-+]?\d{1,3}([.]\d+)?)$/;

export class InterventionValidator {
  /**
   * @description Validate intervention input
   *
   * @constructor
   * @param {String} request
   * @param {Object} response
   *
   * @returns {Object} Object
   */
  constructor() {
    this.passing = true;
    this.errMessage;
  }


  /** @function testForLocation
   *  @param {string}
   *
   * @returns {boolean}
   */
  testForLocation(location) {
    if (typeof location !== 'string' || !locationRegex.test(location)) {
      this.passing = false;
      this.errMessage = 'Input does not match a Lat Long coordinates';
    }
  }

  /** @function testForImages
   *  @param {string}
   *
   * @returns {boolean}
   */
  testForImages(images) {
    for (let i = 0; i < images.length; i++) {
      if (typeof images[i] !== 'string' || !images[i].includes('.jpg') && !images[i].includes('.png') && !images[i].includes('.jpeg')) {
        this.passing = false;
        this.errMessage = 'Input is not an array or a valid image extension';
      }
    }
  }

  /** @function testForVideos
   *  @param {string}
   *
   * @returns {boolean}
   */
  testForVideos(videos) {
    for (let i = 0; i < videos.length; i++) {
      if (typeof videos[i] !== 'string') {
        this.passing = false;
        this.errMessage = 'Video input is not an array or a string';
      }
    }
  }

  /** @function testForComment
   *  @param {string}
   *
   * @returns {boolean}
   */
  testForComment(comment) {
    if (typeof comment !== 'string') {
      this.passing = false;
      this.errMessage = 'Comment must be characters';
    }
  }

  /** @function resetValid
   *
   * @returns {boolean}
   */
  resetValid() {
    this.passing = true;
    this.errMessage = '';
  }

  /** @function testForType
   *  @param {object}
   *
   * @returns {boolean}
   */
  testForEmptyStringInput(interventions) {
    let check = Object.values(interventions);
    check = check.every(data => data !== '');
    if (!check) {
      this.passing = false;
      this.errMessage = 'Input fields must not be empty';
    }
  }

  testIntervention(interventions) {
    this.resetValid();
    this.testForLocation(interventions.location);
    this.testForImages(interventions.images);
    this.testForVideos(interventions.videos);
    this.testForComment(interventions.comment);
    this.testForEmptyStringInput(interventions);
    const obj = {
      passing: this.passing,
      err: this.errMessage
    };
    return obj;
  }
}

export default InterventionValidator;