const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const adminUtils = require('./admin.utils');
const config = require('../config');

before(async () => {});

describe('Admin', () => {
  describe('Login', () => {
    it('Login successfully', async () => {
      let res = await adminUtils.login({
        email: config.adminCredentials.email,
        password: config.adminCredentials.password
      });
      console.log(res.body);
      console.log(JSON.stringify(res.body));
      console.log(res.error.text);
      expect(res.status).to.eq(200);
      expect(res.body.success).to.eq(true);
    });

    it('Wrong password', async () => {
      let res = await adminUtils.login({
        email: config.adminCredentials.email,
        password: faker.lorem.word()
      });
      console.log(res.body);
      console.log(JSON.stringify(res.body));
      console.log(res.error.text);
      expect(res.status).to.eq(400);
      expect(res.body.success).to.eq(false);
    });

    it('Email not found', async () => {
      let res = await adminUtils.login({
        email: faker.internet.email(),
        password: faker.lorem.word()
      });
      console.log(res.body);
      console.log(JSON.stringify(res.body));
      console.log(res.error.text);
      expect(res.status).to.eq(400);
      expect(res.body.success).to.eq(false);
    });
  });
});
