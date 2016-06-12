module.exports = function pnmscale(options, pnmfile) {
    const opts = options !== undefined ? options : {};
    const args = [];
    if (Array.isArray(opts.xyfit) && opts.xyfit.length === 2) {
        args.push(`-xyfit ${opts.xyfit[0]} ${opts.xyfit[1]}`);
    } else if (opts.xyfit) {
        args.push(`-xyfit ${opts.xyfit} ${opts.xyfit}`);
    }
    if (pnmfile) {
        args.push(pnmfile);
    }
    const argsString = args.join(' ');
    return argsString ? `pnmscale ${argsString}` : 'pnmscale';
};