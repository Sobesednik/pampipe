const allowedDCT = ['int', 'fast', 'float'];

module.exports = function jpegtopnm(filename, options) {
    const opts = options !== undefined ? options : {};
    const args = [];
    if (opts.dct && allowedDCT.indexOf(opts.dct) !== -1) {
        args.push(`-dct ${opts.dct}`);
    }
    if (opts.nosmooth) {
        args.push('-nosmooth');
    }
    if (opts.maxmemory) {
        args.push(`-maxmemory ${opts.maxmemory}`);
    }
    if (opts.adobe === true) {
        args.push('-adobe');
    } else if (opts.adobe === false) {
        args.push('-notadobe');
    }
    if (opts.dumpexif) {
        args.push('-dumpexif');
    }
    if (opts.exif) {
        args.push(`-exif=${opts.exif}`);
    }
    if (opts.multiple) {
        args.push('-multiple');
    }
    if (opts.repair) {
        args.push('-repair');
    }
    if (opts.comments) {
        args.push('-comments');
    }
    if (opts.verbose) {
        args.push('-verbose');
    }
    if (opts.tracelevel) {
        args.push(`-tracelevel ${opts.tracelevel}`);
    }
    if (filename) {
        args.push(filename);
    }
    const argsString = args.join(' ');
    return argsString ? `jpegtopnm ${argsString}` : 'jpegtopnm';
};