const config = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

exports.login = async (payload) => {
  try {
    let res = await chai
      .request(config.baseUrl)
      .post('admin/login')
      .send(payload);
    return res;
  } catch (e) {
    throw new Error(e);
  }
};
