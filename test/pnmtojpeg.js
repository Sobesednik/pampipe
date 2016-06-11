const pnmtojpeg = require('../lib/pnmtojpeg');
const chai = require('chai');
const expect = chai.expect;

describe.only('pnmtojpeg', function () {
    it('creates a command without filename arg', function () {
        const res = pnmtojpeg();
        expect(res).to.equal('pnmtojpeg');
    });
    it('creates a command with filename arg', function () {
        const res = pnmtojpeg({}, 'pamfile.pnm');
        expect(res).to.equal('pnmtojpeg pamfile.pnm');
    });
    describe('options', function () {
        it('exif', function () {
            const res = pnmtojpeg({
                exif: 'data.exif',
            });
            expect(res).to.equal('pnmtojpeg -exif=data.exif');
        });
        it('quality', function () {
            const res = pnmtojpeg({
                quality: 100,
            });
            expect(res).to.equal('pnmtojpeg -quality=100');
        });
        it('grayscale|greyscale', function () {
            const grayscale = pnmtojpeg({
                grayscale: true,
            });
            expect(grayscale).to.equal('pnmtojpeg -grayscale');
            const greyscale = pnmtojpeg({
                greyscale: true,
            });
            expect(greyscale).to.equal('pnmtojpeg -grayscale');
        });
        it('density', function () {
            const res = pnmtojpeg({
                density: '300x300dpi',
            });
            expect(res).to.equal('pnmtojpeg -density=300x300dpi');
        });
        it('optimise|optimize', function () {
            const optimise = pnmtojpeg({
                optimise: true,
            });
            expect(optimise).to.equal('pnmtojpeg -optimise');
            const optimize = pnmtojpeg({
                optimize: true,
            });
            expect(optimize).to.equal('pnmtojpeg -optimise');
        });
        it('rgb', function () {
            const res = pnmtojpeg({
                rgb: true,
            });
            expect(res).to.equal('pnmtojpeg -rgb');
        });
        it('progressive', function () {
            const res = pnmtojpeg({
                progressive: true,
            });
            expect(res).to.equal('pnmtojpeg -progressive');
        });
        it('comment', function () {
            const res = pnmtojpeg({
                comment: 'We can know only that we know nothing.',
            });
            expect(res).to.equal('pnmtojpeg -comment=We can know only that we know nothing.');
        });
        it('dct', function () {
            const dctInt = pnmtojpeg({
                dct: 'int',
            });
            expect(dctInt).to.equal('pnmtojpeg -dct=int');
            const dctFast = pnmtojpeg({
                dct: 'fast',
            });
            expect(dctFast).to.equal('pnmtojpeg -dct=fast');
            const dctFloat = pnmtojpeg({
                dct: 'float',
            });
            expect(dctFloat).to.equal('pnmtojpeg -dct=float');
            const upsuportedDct = pnmtojpeg({
                dct: 'unsupported',
            });
            expect(upsuportedDct).to.equal('pnmtojpeg');
        });
        it('arithmetic', function () {
            const res = pnmtojpeg({
                arithmetic: true,
            });
            expect(res).to.equal('pnmtojpeg -arithmetic');
        });
        it('restart', function () {
            const res = pnmtojpeg({
                restart: 5,
            });
            expect(res).to.equal('pnmtojpeg -restart=5');
        });
        it('smooth', function () {
            const res = pnmtojpeg({
                smooth: 20,
            });
            expect(res).to.equal('pnmtojpeg -smooth=20');
        });
        it('maxmemory', function () {
            const res = pnmtojpeg({
                maxmemory: '4m',
            });
            expect(res).to.equal('pnmtojpeg -maxmemory=4m');
        });
        it('verbose', function () {
            const res = pnmtojpeg({
                verbose: true,
            });
            expect(res).to.equal('pnmtojpeg -verbose');
        });
        it('baseline', function () {
            const res = pnmtojpeg({
                baseline: true,
            });
            expect(res).to.equal('pnmtojpeg -baseline');
        });
        it('qtables', function () {
            const res = pnmtojpeg({
                qtables: 'qtables.txt',
            });
            expect(res).to.equal('pnmtojpeg -qtables=qtables.txt');
        });
        it('qslots', function () {
            const res = pnmtojpeg({
                qslots: 'A,B,B',
            });
            expect(res).to.equal('pnmtojpeg -qslots=A,B,B');
        });
        it('sample', function () {
            const res = pnmtojpeg({
                sample: '100x100,50x50,25x25',
            });
            expect(res).to.equal('pnmtojpeg -sample=100x100,50x50,25x25');
        });
        it('scans', function () {
            const res = pnmtojpeg({
                scans: 'scans.txt',
            });
            expect(res).to.equal('pnmtojpeg -scans=scans.txt');
        });
        it('tracelevel', function () {
            const res = pnmtojpeg({
                tracelevel: 1,
            });
            expect(res).to.equal('pnmtojpeg -tracelevel=1');
        });
        it('together', function () {
            const res = pnmtojpeg({
                exif: 'data.exif',
                quality: 80,
                grayscale: true,
                density: '300x300dpi',
                optimise: true,
                rgb: true,
                progressive: true,
                comment: 'Peace comes from within',
                dct: 'fast',
                arithmetic: true,
                restart: 5,
                smooth: 20,
                maxmemory: '4m',
                verbose: true,
                baseline: true,
                qtables: 'qtables.txt',
                qslots: 'A,B,B',
                sample: '100x100,50x50,25x25',
                scans: 'scans.txt',
                tracelevel: 1,
            }, 'filename.pnm');
            expect(res).to.equal('pnmtojpeg -exif=data.exif -quality=80 -grayscale ' +
                '-density=300x300dpi -optimise -rgb -progressive -comment=Peace comes ' +
                'from within -dct=fast -arithmetic -restart=5 -smooth=20 -maxmemory=4m ' +
                '-verbose -baseline -qtables=qtables.txt -qslots=A,B,B -sample=100x100,50x50' +
                ',25x25 -scans=scans.txt -tracelevel=1 filename.pnm');
        });
    });
});