import jwt from 'jsonwebtoken';

class verifyToken {
  /**
   * Verify User Token
   * @param {object} request
   * @param {object} response
   * @param {object} next
   *
   * @returns {object} response object
   */

  static userAuthentication(request, response, next) {
    const token = request.header('x-access-token');
    if (!token) {
      return response.status(401).json({
        status: 401,
        error: 'Unauthorized'
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      request.user = decoded;
      return next();
    } catch (err) {
      return response.status(403).json({
        status: 403,
        error: 'Authentication failed'
      });
    }
  }
  /**
   * Verify Admin Token
   * @param {object} request
   * @param {object} response
   * @param {object} next
   *
   * @returns {object} response object
   */

  static adminAuthentication(request, response, next) {
    if (request.user.isAdmin === false) {
      return response.status(403).json({
        status: 403,
        error: 'Access denied'
      });
    }
    return next();
  }
}
export default verifyToken;