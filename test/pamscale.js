const pamscale = require('../lib/pamscale');
const chai = require('chai');
const expect = chai.expect;

describe('pamscale', function () {
    it('creates a command without pnmfile arg', function () {
        const res = pamscale();
        expect(res).to.equal('pamscale');
    });
    it('creates a command with pnmfile arg', function () {
        const res = pamscale({}, 'pamfile.pnm');
        expect(res).to.equal('pamscale pamfile.pnm');
    });
    describe('options', function () {
        it('xyfit', function () {
            const res = pamscale({
                xyfit: [480, 640],
            });
            expect(res).to.equal('pamscale -xyfit 480 640');
            const res2 = pamscale({
                xyfit: 100,
            });
            expect(res2).to.equal('pamscale -xyfit 100 100');
        });
        it('xyfill', function () {
            const res = pamscale({
                xyfill: [480, 640],
            });
            expect(res).to.equal('pamscale -xyfill 480 640');
            const res2 = pamscale({
                xyfill: 100,
            });
            expect(res2).to.equal('pamscale -xyfill 100 100');
        });
        // it('xysize', function () {
        //     const res = pamscale({
        //         xysize: [480, 640],
        //     });
        //     expect(res).to.equal('pamscale -xysize 480 640');
        //     const res2 = pamscale({
        //         xysize: 100,
        //     });
        //     expect(res2).to.equal('pamscale -xysize 100 100');
        // });
        it('xsize', function () {
            const res = pamscale({
                xsize: 480,
            });
            expect(res).to.equal('pamscale -xsize=480');
        });
        it('ysize', function () {
            const res = pamscale({
                ysize: 640,
            });
            expect(res).to.equal('pamscale -ysize=640');
        });
        it('width', function () {
            const res = pamscale({
                width: 480,
            });
            expect(res).to.equal('pamscale -width=480');
        });
        it('height', function () {
            const res = pamscale({
                height: 640,
            });
            expect(res).to.equal('pamscale -height=640');
        });
        it('xscale', function () {
            const res = pamscale({
                xscale: 0.5,
            });
            expect(res).to.equal('pamscale -xscale=0.5');
        });
        it('yscale', function () {
            const res = pamscale({
                yscale: 0.5,
            });
            expect(res).to.equal('pamscale -yscale=0.5');
        });
        it('pixels', function () {
            const res = pamscale({
                pixels: 100000,
            });
            expect(res).to.equal('pamscale -pixels 100000');
        });
        it('verbose', function () {
            const res = pamscale({
                verbose: true,
            });
            expect(res).to.equal('pamscale -verbose');
        });
        it('nomix', function () {
            const res = pamscale({
                nomix: true,
            });
            expect(res).to.equal('pamscale -nomix');
        });
        describe('filter functions', function () {
            const filters = [
                'point',
                'box',
                'triangle',
                'quadratic',
                'cubic',
                'catrom',
                'mitchell',
                'gauss',
                'sinc',
                'bessel',
                'hanning',
                'hamming',
                'blackman',
                'kaiser',
                'normal',
                'hermite',
                'lanczos',
            ];
            it('filter', function () {
                filters.forEach((filter) => {
                    const res = pamscale({
                        filter: filter,
                    });
                    expect(res).to.equal(`pamscale -filter=${filter}`);
                });
                const res = pamscale({
                    filter: 'unknown',
                });
                expect(res).to.equal('pamscale');
            });
            it('window', function () {
                filters.forEach((filter) => {
                    const res = pamscale({
                        filter: 'point',
                        window: filter,
                    });
                    expect(res).to.equal(`pamscale -filter=point -window=${filter}`);
                });
                const resNoFilter = pamscale({
                    window: 'point',
                });
                expect(resNoFilter).to.equal('pamscale');

                const resUnknowWindow = pamscale({
                    filter: 'point',
                    window: 'unknown',
                });
                expect(resUnknowWindow).to.equal('pamscale -filter=point');
            });
        });
        it('linear', function () {
            const res = pamscale({
                linear: true,
            });
            expect(res).to.equal('pamscale -linear');
        });
        it('together', function () {
            const res = pamscale({
                xyfit: 480,
                xyfill: [480, 640],
                reduce: 0.5,
                xsize: 1024,
                ysize: 768,
                width: 250,
                height: 500,
                xscale: 0.5,
                yscale: 0.7,
                pixels: 100000,
                verbose: true,
                nomix: true,
                filter: 'point',
                window: 'sinc',
                linear: true,
            }, 'filename.pam');
            expect(res).to.equal('pamscale -xyfit 480 480 -xyfill 480 640 ' +
            '-reduce 0.5 -xsize=1024 -ysize=768 -width=250 -height=500 -xscale=0.5 -yscale=0.7 ' +
            '-pixels 100000 -verbose -nomix -filter=point -window=sinc -linear filename.pam');
        });
    });
});