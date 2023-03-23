const Router = require('express').Router();

const adminController = require('../controllers/admin');

/**
 * @typedef AdminLogin
 * @property {string} email - - eg: admin@example.com
 * @property {string} password - - eg: 123456
 */
/**
 * @typedef AdminLoginResponse
 * @property {boolean} success - - eg: true
 * @property {string} data - - eg: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NTIwMDZiLWQ2M2EtNDBhZS1hY2ZjLWViYWRlMjMzYzMyOCIsImlhdCI6MTY3OTQ2MTYxOH0.MmCfglMvh83XQk_7sib63WzBARMhLyXOyTxwHdx2_40
 */
/**
 * @route POST /admin/login
 * @group Admin
 * @param {AdminLogin.model} data.body - Worker data
 * @returns {AdminLoginResponse.model} 200
 * @produces application/json
 * @consumes application/json
 */
Router.post('/login', adminController.login);

module.exports = Router;
