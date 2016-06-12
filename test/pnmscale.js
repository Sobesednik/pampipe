const pamscale = require('../lib/pnmscale');
const chai = require('chai');
const expect = chai.expect;

describe('pamscale', function () {
    it('creates a command without pnmfile arg', function () {
        const res = pamscale();
        expect(res).to.equal('pnmscale');
    });
    it('creates a command with pnmfile arg', function () {
        const res = pamscale({}, 'pamfile.pnm');
        expect(res).to.equal('pnmscale pamfile.pnm');
    });
    describe('options', function () {
        it('xyfit', function () {
            const res = pamscale({
                xyfit: [480, 640],
            });
            expect(res).to.equal('pnmscale -xyfit 480 640');
            const res2 = pamscale({
                xyfit: 100,
            });
            expect(res2).to.equal('pnmscale -xyfit 100 100');
        });
    });
});