const Router = require("express").Router();

const multer = require("../services/multer");
const mediaController = require("../controllers/media");

/**
 * @typedef MediaAdd
 * @property {file} medias - - eg: some media
 */
/**
 * @typedef MediaData
 * @property {integer} id - - eg: 19
 * @property {string} url - - eg: localhost:3000/images/dc377a441cea4f9a9f02230f698e35ba.jpg
 * @property {string} type - - eg: image/jpeg
 * @property {string} createdAt - - eg: 2022-10-20T07:33:36.000Z
 * @property {string} updatedAt - - eg: 2022-10-20T07:33:36.000Z
 */
/**
 * @typedef MediaAddResponse
 * @property {boolean} success - - eg: true
 * @property {MediaData.model} data
 */
/**
 * @route POST /media/add
 * @group Media Module
 * @security JWT
 * @param {file} medias.formData - Media data
 * @returns {MediaAddResponse.model} 200
 * @produces application/json
 * @consumes multipart/form-data
 */
Router.post("/add", multer.array("medias"), mediaController.add);

module.exports = Router;
