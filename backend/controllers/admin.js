const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const adminValidator = require('../validators/admin');
const { validateRequestInput } = require('../services/joi');
const constants = require('../utils/constants');
const config = require('../config/config');

exports.login = async (req, res) => {
  try {
    const requestBody = req.body;
    const validation = validateRequestInput(adminValidator.login, requestBody);
    if (!validation.isValid)
      return res
        .status(constants.CODES.BAD_REQUEST)
        .json({ success: false, error: validation.error });

    const admin = await Admin.findOne({ where: { email: requestBody.email } });
    if (!admin) {
      return res
        .status(constants.CODES.BAD_REQUEST)
        .json({ success: false, error: constants.MESSAGES.ADMIN.NOT_FOUND });
    }

    const isPasswordVerified = await bcrypt.compare(
      requestBody.password,
      admin.password
    );
    if (!isPasswordVerified) {
      return res.status(constants.CODES.BAD_REQUEST).json({
        success: false,
        error: constants.MESSAGES.ADMIN.WRONG_PASSWORD
      });
    }

    const token = jwt.sign({ id: admin.id }, config.JWT_SECRET_KEY);

    return res
      .status(constants.CODES.SUCCESS)
      .json({ success: true, data: token });
  } catch (error) {
    console.log(error);
    return res
      .status(constants.CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};
