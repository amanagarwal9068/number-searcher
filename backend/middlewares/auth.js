const Admin = require('../models/admin');
const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.verifyToken = (authType) => {
  return async (req, res, next) => {
    try {
      // Checking auth type is valid or not
      const isValidAuthType = config.VALID_AUTH_TYPES.includes(authType);
      if (!isValidAuthType) {
        return res.status(constants.CODES.BAD_REQUEST).json({
          success: false,
          error: constants.MESSAGES.AUTH.INVALID
        });
      }

      // Checking auth token is passed or not
      const requestHeaders = req.headers;
      let authToken = requestHeaders.authorization;
      if (!authToken) {
        return res.status(constants.CODES.UNAUTHORIZED).json({
          success: false,
          error: constants.MESSAGES.AUTH.UNAUTHORIZED
        });
      }
      authToken = authToken.split(' ');
      authToken = authToken[1];
      if (!authToken) {
        return res.status(constants.CODES.UNAUTHORIZED).json({
          success: false,
          error: constants.MESSAGES.AUTH.UNAUTHORIZED
        });
      }

      const data = jwt.verify(authToken, config.JWT_SECRET_KEY);

      // Assigning model according to auth type
      let AuthModel;
      if (authType === 'admin') {
        AuthModel = Admin;
      }
      let auth = await AuthModel.findOne({ where: { id: data.id } });
      if (!auth) {
        return res.status(constants.CODES.UNAUTHORIZED).json({
          success: false,
          error: constants.MESSAGES.AUTH.UNAUTHORIZED
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(constants.CODES.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: error.message
      });
    }
  };
};
