const config = require('../config');
const professions = ['Mechanic', 'Carpenter', 'Plumber'];
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const workerUtils = require('./worker.utils');
const mediaUtils = require('../media/media.utils');
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

describe('Worker', () => {
  describe('Add worker', () => {
    it('Add successfully', async () => {
      let files = [];
      for (let i = 0; i < 50; i++) {
        files.push({
          url: faker.image.avatar(),
          type: 'image'
        });
      }
      let mediaRes = await mediaUtils.add(
        {
          files
        },
        adminToken
      );
      expect(mediaRes.status).to.eq(200);
      expect(mediaRes.body.data.length).to.eq(files.length);

      let addedMediaIds = mediaRes.body.data.map((media) => {
        return media.id;
      });
      let workers = [];
      addedMediaIds.forEach((mediaId) => {
        workers.push({
          name: faker.name.fullName(),
          profession: faker.helpers.arrayElement(professions),
          number: faker.phone.number(),
          PictureId: mediaId
        });
      });
      let res = await workerUtils.add({ workers }, adminToken);
      console.log(res.body);
      console.log(JSON.stringify(res.body));
      console.log(res.error.text);
      expect(res.status).to.eq(200);
      expect(res.body.success).to.eq(true);
    });
  });

  describe('List', () => {
    it('Worker list successfully', async () => {
      let payload = {
        isActive: true,
        startRange: 0,
        rangeLimit: 100
      };
      let res = await workerUtils.list(payload);
      console.log(res.body);
      console.log(res.error.text);
      expect(res.status).to.eq(200);
      expect(res.body.success).to.eq(true);
    });
  });
});
