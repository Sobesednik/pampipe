module.exports = function pnmtojpeg(options, filename) {
    const opts = options !== undefined ? options : {};
    const args = [];
    if (filename) {
        args.push(filename);
    }
    const argsString = args.join(' ');
    return argsString ? `pnmtojpeg ${argsString}` : 'pnmtojpeg';
};