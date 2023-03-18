const Router = require("express").Router();

const workerController = require("../controllers/worker");

/**
 * @typedef WorkerAdd
 * @property {string} name - - eg: John Doe
 * @property {string} profession - - eg: Mechanic
 * @property {string} PictureId - - eg: 31319d55-b399-410e-8d3a-e162a0825dc6
 */
/**
 * @typedef WorkerData
 * @property {integer} id - - eg: 19
 * @property {string} name - - eg: John Doe
 * @property {string} profession - - eg: Mechanic
 * @property {string} PictureId - - eg: 31319d55-b399-410e-8d3a-e162a0825dc6
 * @property {boolean} isActive - - eg: true
 * @property {string} createdAt - - eg: 2022-10-20T07:33:36.000Z
 * @property {string} updatedAt - - eg: 2022-10-20T07:33:36.000Z
 */
/**
 * @typedef WorkerAddResponse
 * @property {boolean} success - - eg: true
 * @property {WorkerData.model} data
 */
/**
 * @route POST /worker/add
 * @group Worker
 * @param {WorkerAdd.model} data.body - Worker data
 * @returns {WorkerAddResponse.model} 200
 * @produces application/json
 * @consumes application/json
 */
Router.post("/add", workerController.add);

/**
 * @typedef WorkerListResponse
 * @property {boolean} success - - eg: true
 * @property {boolean} count - - eg: 50
 * @property {WorkerData.model} data
 */
/**
 * @route GET /worker/list
 * @group Worker
 * @param {boolean} isActive.query - - eg: true
 * @param {integer} startRange.query - - eg: 0
 * @param {integer} rangeLimit.query - - eg: 10
 * @param {string} name.query - - eg: John Doe
 * @param {string} profession.query - - eg: Mechanic
 * @returns {WorkerListResponse.model} 200
 * @produces application/json
 * @consumes application/json
 */
Router.get("/list", workerController.list);

module.exports = Router;
