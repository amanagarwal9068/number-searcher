const Joi = require('joi');

const workerValidator = {
  add: {
    workers: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          profession: Joi.string().required(),
          PictureId: Joi.string().allow()
        })
      )
      .min(1)
  },
  list: {
    isActive: Joi.boolean().allow(),
    startRange: Joi.number().allow(),
    rangeLimit: Joi.number().allow(),
    name: Joi.string().allow(),
    profession: Joi.string().allow()
  }
};

module.exports = workerValidator;
