const index = require('../index');
const expect = require('chai').expect;
const resemblejs = require('node-resemble-js');

describe('integration', function () {
    it('rotates JPEG by 180 degrees', function () {
        const pampipe = new index.Pampipe();
        pampipe
          .jpegtopnm('filename.jpg', { dct: 'int' })
          .pamflip('r180')
          .pnmtopng()
          .execute()
          .then((data) => {
              console.log(data);
          });
    });
    it('transforms JPEG according to EXIF', function () {

    });
});