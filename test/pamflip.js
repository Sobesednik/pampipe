const pamflip = require('../lib/pamflip');
const chai = require('chai');
const expect = chai.expect;

const transforms = [
    'leftright',
    'lr',
    'topbottom',
    'tb',
    'transpose',
    'xy',
    'rotate90',
    'r90',
    'ccw',
    'rotate180',
    'r180',
    'rotate270',
    'r270',
    'cw',
    'null',
];

describe('pamflip', function () {
    it('throws an error if transform is not allowed', function () {
        const fn = () => {
            pamflip.flip('rotate190');
        };
        expect(fn).to.throw('Transform rotate190 is not allowed');
    });
    it('throws an error if array contain incorrect transform', function () {
        const fn = () => {
            pamflip.flip(['r180', 'rotate190']);
        };
        expect(fn).to.throw('Transform rotate190 is not allowed');
    });
    it('composes command with xform argument', function () {
        const res = pamflip.flip(['r180', 'transpose', 'r270', 'null']);
        expect(res).to.equal('pamflip -xform=r180,transpose,r270,null');
    });
    it('composes command with an argument', function () {
        transforms.forEach((transform) => {
            const res = pamflip.flip(transform);
            expect(res).to.equal(`pamflip -${transform}`);
        });
    });
    it('appends memsize argument', function () {
        const res = pamflip.flip('rotate180', {
            memsize: 1024,
        });
        expect(res).to.equal('pamflip -rotate180 -memsize=1024');
    });
    it('appends memsize argument when using array', function () {
        const res = pamflip.flip(['rotate180','leftright'], {
            memsize: 1024,
        });
        expect(res).to.equal('pamflip -xform=rotate180,leftright -memsize=1024');
    });
    it('includes filename if specified', function () {
        const res = pamflip.flip('r180', {}, 'filename.pam');
        expect(res).to.equal('pamflip -r180 filename.pam');
    });
});