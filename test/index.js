const index = require('../index');
const expect = require('chai').expect;

describe('pampipe', function () {
    it('creates a new pampipe instance', function () {
        const pampipe = new index.Pampipe();
        expect(pampipe).to.be.instanceof(index.Pampipe);
    });
    it('returns piped commands', function () {
        const pampipe = new index.Pampipe();
        const command = pampipe
          .jpegtopnm('filename.jpg', { dct: 'int' })
          .pamflip('r180')
          .getCommand();
        expect(command).to.equal('jpegtopnm -dct int filename.jpg | pamflip -r180');
    });
});