const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const mediaUtils = require('./media.utils');

before(async () => {});

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
      let res = await mediaUtils.add(payload);
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
      let res = await mediaUtils.add({ filePaths: [] });
      console.log(res.body);
      expect(res.status).to.eq(400);
      expect(res.body.success).to.eq(false);
      expect(res.body.error).to.eq('No media files are uploaded');
    });
  });
});
