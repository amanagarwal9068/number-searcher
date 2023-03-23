const Worker = require('../models/worker');
const Media = require('../models/media');
const workerValidator = require('../validators/worker');
const { validateRequestInput } = require('../services/joi');
const constants = require('../utils/constants');
const Sequelize = require('sequelize');
const sequelize = require('../services/sequelize')();

exports.add = async (req, res) => {
  try {
    let requestBody = req.body;
    let validation = validateRequestInput(workerValidator.add, requestBody);
    if (!validation.isValid)
      return res
        .status(constants.CODES.BAD_REQUEST)
        .json({ success: false, error: validation.error });

    let worker = await Worker.bulkCreate(requestBody.workers);
    return res
      .status(constants.CODES.SUCCESS)
      .json({ success: true, data: worker });
  } catch (error) {
    console.log(error);
    return res
      .status(constants.CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    let requestBody = req.query;
    let validation = validateRequestInput(workerValidator.list, requestBody);
    if (!validation.isValid)
      return res
        .status(constants.CODES.BAD_REQUEST)
        .json({ success: false, error: validation.error });

    let workersOpts = {
      where: {},
      include: { model: Media, as: 'Picture' },
      order: sequelize.random(), // for testing purpose only
      offset: 0,
      limit: 50
    };
    if (requestBody.name) {
      workersOpts.where.name = {
        [Sequelize.Op.iLike]: `%${requestBody.name}%`
      };
    }
    if (requestBody.profession) {
      workersOpts.where.profession = {
        [Sequelize.Op.iLike]: `%${requestBody.profession}%`
      };
    }
    if (requestBody.hasOwnProperty('startRange')) {
      workersOpts.offset = parseInt(requestBody.startRange);
    }
    if (requestBody.hasOwnProperty('rangeLimit')) {
      workersOpts.limit = parseInt(requestBody.rangeLimit);
    }
    let workers = await Worker.findAll(workersOpts);
    return res
      .status(constants.CODES.SUCCESS)
      .json({ success: true, count: workers.length, data: workers });
  } catch (error) {
    console.log(error);
    return res
      .status(constants.CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};
