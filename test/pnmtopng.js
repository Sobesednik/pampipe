const pnmtopng = require('../lib/pnmtopng');
const chai = require('chai');
const expect = chai.expect;

describe('pngtopng', function () {
    it('creates a command without pnmfile arg', function () {
        const res = pnmtopng();
        expect(res).to.equal('pnmtopng');
    });
    it('creates a command with pnmfile arg', function () {
        const res = pnmtopng({}, 'pamfile.pnm');
        expect(res).to.equal('pnmtopng pamfile.pnm');
    });
});