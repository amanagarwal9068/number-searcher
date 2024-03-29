const config = require('../config/config');

module.exports = configurations = {
  baseUrl: `${config.DOMAIN_URL}/api/`,
  adminCredentials: {
    email: config.ADMIN_EMAIL,
    password: config.ADMIN_PASSWORD
  }
};
