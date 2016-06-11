const jpegtopnm = require('../lib/jpegtopnm');
const chai = require('chai');
const expect = chai.expect;

describe('jpegtopnm', function () {
    it('returns correct command when only filename is specified', function () {
        const res = jpegtopnm('filename.jpg');
        expect(res).to.equal('jpegtopnm filename.jpg');
    });
    it('returns correct command when filename is not specified', function () {
        const res = jpegtopnm();
        expect(res).to.equal('jpegtopnm');
    });
    describe('options', function () {
        it('dct', function () {
            const dctInt = jpegtopnm('filename.jpg', {
                dct: 'int',
            });
            expect(dctInt).to.equal('jpegtopnm -dct int filename.jpg');
            const dctFast = jpegtopnm('filename.jpg', {
                dct: 'fast',
            });
            expect(dctFast).to.equal('jpegtopnm -dct fast filename.jpg');
            const dctFloat = jpegtopnm('filename.jpg', {
                dct: 'float',
            });
            expect(dctFloat).to.equal('jpegtopnm -dct float filename.jpg');
            const upsuportedDct = jpegtopnm('filename.jpg', {
                dct: 'unsupported',
            });
            expect(upsuportedDct).to.equal('jpegtopnm filename.jpg');
        });
        it('nosmooth', function () {
            const res = jpegtopnm('filename.jpg', {
                nosmooth: true,
            });
            expect(res).to.equal('jpegtopnm -nosmooth filename.jpg');
        });
        it('maxmemory', function () {
            const res = jpegtopnm('filename.jpg', {
                maxmemory: '4m',
            });
            expect(res).to.equal('jpegtopnm -maxmemory 4m filename.jpg');
        });
        it('adobe - notadobe', function () {
            const adobe = jpegtopnm('filename.jpg', {
                adobe: true,
            });
            expect(adobe).to.equal('jpegtopnm -adobe filename.jpg');
            const notadobe = jpegtopnm('filename.jpg', {
                adobe: false,
            });
            expect(notadobe).to.equal('jpegtopnm -notadobe filename.jpg');
        });
        it('dumpexif', function () {
            const res = jpegtopnm('filename.jpg', {
                dumpexif: true,
            });
            expect(res).to.equal('jpegtopnm -dumpexif filename.jpg');
        });
        it('exif', function () {
            const res = jpegtopnm('filename.jpg', {
                exif: 'data.exif',
            });
            expect(res).to.equal('jpegtopnm -exif=data.exif filename.jpg');
        });
        it('multiple', function () {
            const res = jpegtopnm('filename.jpg', {
                multiple: true,
            });
            expect(res).to.equal('jpegtopnm -multiple filename.jpg');
        });
        it('repair', function () {
            const res = jpegtopnm('filename.jpg', {
                repair: true,
            });
            expect(res).to.equal('jpegtopnm -repair filename.jpg');
        });
        it('comments', function () {
            const res = jpegtopnm('filename.jpg', {
                comments: true,
            });
            expect(res).to.equal('jpegtopnm -comments filename.jpg');
        });
        it('verbose', function () {
            const res = jpegtopnm('filename.jpg', {
                verbose: true,
            });
            expect(res).to.equal('jpegtopnm -verbose filename.jpg');
        });
        it('tracelevel', function () {
            const res = jpegtopnm('filename.jpg', {
                tracelevel: 1,
            });
            expect(res).to.equal('jpegtopnm -tracelevel 1 filename.jpg');
        });
        it('together', function () {
            const res = jpegtopnm('filename.jpg', {
                dct: 'int',
                nosmooth: true,
                maxmemory: '4m',
                adobe: true,
                dumpexif: true,
                exif: 'data.exif',
                multiple: true,
                repair: true,
                comments: true,
                verbose: true,
                tracelevel: 1,
            });
            expect(res).to.equal('jpegtopnm -dct int -nosmooth -maxmemory 4m -adobe -dumpexif ' +
                '-exif=data.exif -multiple -repair -comments -verbose -tracelevel 1 filename.jpg');
        });
    });
});