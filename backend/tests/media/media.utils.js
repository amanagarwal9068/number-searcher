const config = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

exports.add = async (payload, authToken) => {
  try {
    let res = chai
      .request(config.baseUrl)
      .post('media/add')
      .set({ Authorization: `Bearer ${authToken}` });
    if (payload.files && payload.files.length) {
      res.field('files', JSON.stringify(payload.files));
    }
    if (payload.filePaths && payload.filePaths.length) {
      payload.filePaths.forEach((filePath) => {
        res.attach('medias', filePath);
      });
    }
    res = await res;
    return res;
  } catch (e) {
    throw new Error(e);
  }
};
