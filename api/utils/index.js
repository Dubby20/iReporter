import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
* Generate Token
* @param {string} id
* @param {string} email

* @returns {string} token
*/
const generateToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: '48h'
  });
  return token;
};

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};


const checkPasswordMatch = (hashedPassword, password) => bcrypt.compareSync(hashedPassword, password);


export {
  generateToken,
  hashPassword,
  checkPasswordMatch
};