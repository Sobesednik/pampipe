const util = require('./util');

const filterFuncitons = [
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

module.exports = function pamscale(options, pnmfile) {
    const opts = options !== undefined ? options : {};
    const args = [];
    if (Array.isArray(opts.xyfit) && opts.xyfit.length === 2) {
        args.push(`-xyfit ${opts.xyfit[0]} ${opts.xyfit[1]}`);
    } else if (opts.xyfit) {
        args.push(`-xyfit ${opts.xyfit} ${opts.xyfit}`);
    }
    if (Array.isArray(opts.xyfill) && opts.xyfill.length === 2) {
        args.push(`-xyfill ${opts.xyfill[0]} ${opts.xyfill[1]}`);
    } else if (opts.xyfill) {
        args.push(`-xyfill ${opts.xyfill} ${opts.xyfill}`);
    }
    // if (Array.isArray(opts.xysize) && opts.xysize.length === 2) {
    //     args.push(`-xysize ${opts.xysize[0]} ${opts.xysize[1]}`);
    // } else if (opts.xysize) {
    //     args.push(`-xysize ${opts.xysize} ${opts.xysize}`);
    // }
    if (opts.reduce) {
        args.push(`-reduce ${opts.reduce}`);
    }
    ['xsize', 'ysize', 'width', 'height', 'xscale', 'yscale'].forEach((arg) => {
        util.pushValueArg(opts, arg, args);
    });
    if (opts.pixels) {
        args.push(`-pixels ${opts.pixels}`);
    }
    util.pushBooleanArg(opts, 'verbose', args);
    util.pushBooleanArg(opts, 'nomix', args);
    if (opts.filter && filterFuncitons.indexOf(opts.filter) !== -1) {
        util.pushValueArg(opts, 'filter', args);
        if (opts.window && filterFuncitons.indexOf(opts.window) !== -1 ) {
            util.pushValueArg(opts, 'window', args);
        }
    }
    util.pushBooleanArg(opts, 'linear', args);

    if (pnmfile) {
        args.push(pnmfile);
    }
    const argsString = args.join(' ');
    return argsString ? `pamscale ${argsString}` : 'pamscale';
};