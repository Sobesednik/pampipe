const allowedDCT = ['int', 'fast', 'float'];

module.exports = function pnmtojpeg(options, filename) {
    const opts = options !== undefined ? options : {};
    const args = [];
    if (opts.exif) {
        args.push(`-exif=${opts.exif}`);
    }
    if (opts.quality) {
        args.push(`-quality=${opts.quality}`);
    }
    if (opts.grayscale || opts.greyscale) {
        args.push('-grayscale');
    }
    if (opts.density) {
        args.push(`-density=${opts.density}`);
    }
    if (opts.optimize || opts.optimise) {
        args.push('-optimise');
    }
    if (opts.rgb) {
        args.push('-rgb');
    }
    if (opts.progressive) {
        args.push('-progressive');
    }
    if (opts.comment) {
        args.push(`-comment=${opts.comment}`);
    }
    if (opts.dct && allowedDCT.indexOf(opts.dct) !== -1) {
        args.push(`-dct=${opts.dct}`);
    }
    if (opts.arithmetic) {
        args.push('-arithmetic');
    }
    if (opts.restart) {
        args.push(`-restart=${opts.restart}`);
    }
    if (opts.smooth) {
        args.push(`-smooth=${opts.smooth}`);
    }
    if (opts.maxmemory) {
        args.push(`-maxmemory=${opts.maxmemory}`);
    }
    if (opts.verbose) {
        args.push('-verbose');
    }
    if (opts.baseline) {
        args.push('-baseline');
    }
    if (opts.qtables) {
        args.push(`-qtables=${opts.qtables}`);
    }
    if (opts.qslots) {
        args.push(`-qslots=${opts.qslots}`);
    }
    if (opts.sample) {
        args.push(`-sample=${opts.sample}`);
    }
    if (opts.scans) {
        args.push(`-scans=${opts.scans}`);
    }
    if (opts.tracelevel) {
        args.push(`-tracelevel=${opts.tracelevel}`);
    }
    if (filename) {
        args.push(filename);
    }
    const argsString = args.join(' ');
    return argsString ? `pnmtojpeg ${argsString}` : 'pnmtojpeg';
};