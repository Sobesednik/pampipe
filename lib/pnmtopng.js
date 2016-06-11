module.exports = function pnmtopng(options, pnmfile) {
    const opts = options !== undefined ? options : {};
    const args = [];
    if (pnmfile) {
        args.push(pnmfile);
    }
    const argsString = args.join(' ');
    return argsString ? `pnmtopng ${argsString}` : 'pnmtopng';
};