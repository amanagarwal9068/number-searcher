const config = require('../config/config');
const Media = require('../models/media');
const constants = require('../utils/constants');

exports.add = async (req, res) => {
  try {
    let files = req.dir;
    let requestBody = req.body;
    if (!files && (!requestBody.files || !requestBody.files.length)) {
      return res.status(constants.CODES.BAD_REQUEST).json({
        success: false,
        error: constants.MESSAGES.MEDIA.NO_MEDIA_FILES_ARE_UPLOADED
      });
    }
    let medias = [];
    if (files && files.length) {
      files.forEach((file) => {
        medias.push({
          url: config.DOMAIN_URL + '/' + file.fullName,
          type: file.type
        });
      });
    }
    if (requestBody.files) {
      if (typeof requestBody.files === 'string') {
        requestBody.files = JSON.parse(requestBody.files);
      }
      if (requestBody.files.length) {
        requestBody.files.forEach((file) => {
          medias.push({
            url: file.url,
            type: file.type
          });
        });
      }
    }

    let mediaData = await Media.bulkCreate(medias);
    return res
      .status(constants.CODES.SUCCESS)
      .json({ success: true, data: mediaData });
  } catch (error) {
    console.log(error);
    return res
      .status(constants.CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};
