const Joi = require('joi');

const adminValidator = {
  login: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
};

module.exports = adminValidator;
