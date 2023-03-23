const config = require('../config');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const mediaUtils = require('./media.utils');
const adminUtils = require('../admin/admin.utils');

let adminToken;

before(async () => {
  let adminRes = await adminUtils.login({
    email: config.adminCredentials.email,
    password: config.adminCredentials.password
  });
  console.log(adminRes.body);
  console.log(adminRes.error.text);
  expect(adminRes.status).to.eq(200);
  expect(adminRes.body.success).to.eq(true);
  adminToken = adminRes.body.data;
});

describe('Media', () => {
  describe('Add media', () => {
    it('Add successfully', async () => {
      let payload = {
        // using test media files
        filePaths: ['./uploads/test.jpg'],
        files: [
          {
            url: faker.image.avatar(),
            type: 'image'
          }
        ]
      };
      let res = await mediaUtils.add(payload, adminToken);
      console.log(res.body);
      expect(res.status).to.eq(200);
      expect(res.body.success).to.eq(true);
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.be.greaterThan(0);
      res.body.data.forEach((d) => {
        expect(d).to.haveOwnProperty('id');
      });
    });

    it('No media files are uploaded', async () => {
      let res = await mediaUtils.add({ filePaths: [] }, adminToken);
      console.log(res.body);
      expect(res.status).to.eq(400);
      expect(res.body.success).to.eq(false);
      expect(res.body.error).to.eq('No media files are uploaded');
    });
  });
});
