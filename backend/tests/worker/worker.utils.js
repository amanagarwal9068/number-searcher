const config = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

exports.add = async (payload, authToken) => {
  try {
    let res = await chai
      .request(config.baseUrl)
      .post('worker/add')
      .set({ Authorization: `Bearer ${authToken}` })
      .send(payload);
    return res;
  } catch (e) {
    throw new Error(e);
  }
};

exports.list = async (payload) => {
  try {
    let queryParams = `?`;
    if (payload.startRange) queryParams += `startRange=${payload.startRange}&`;
    if (payload.rangeLimit) queryParams += `rangeLimit=${payload.rangeLimit}&`;
    if (payload.isActive) queryParams += `isActive=${payload.isActive}&`;
    if (payload.name) queryParams += `name=${payload.name}&`;
    if (payload.profession) queryParams += `profession=${payload.profession}&`;

    let res = await chai
      .request(config.baseUrl)
      .get(`worker/list${queryParams}`);
    return res;
  } catch (e) {
    throw new Error(e);
  }
};
