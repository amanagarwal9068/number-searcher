const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const workerUtils = require('./worker.utils');
const mediaUtils = require('../media/media.utils');
const professions = ['Mechanic', 'Carpenter', 'Plumber'];

before(async () => {});

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
      let mediaRes = await mediaUtils.add({
        files
      });
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
          PictureId: mediaId
        });
      });
      let res = await workerUtils.add({ workers });
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

    // it('Worker media list successfully', async () => {
    //   let payload = {
    //     workerId: workerId,
    //     startRange: 0,
    //     rangeLimit: 10
    //   };
    //   let res = await workerUtils.listWorkerMedias(payload);
    //   console.log(res.body);
    //   console.log(res.error.text);
    //   expect(res.status).to.eq(200);
    //   expect(res.body.success).to.eq(true);
    // });
  });
});
