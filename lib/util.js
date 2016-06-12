function pushBooleanArg(options, arg, args) {
    if (options[arg]) {
        args.push(`-${arg}`);
    }
}
function pushValueArg(options, arg, args) {
    if (options[arg]) {
        args.push(`-${arg}=${options[arg]}`);
    }
}
module.exports = {
    pushBooleanArg,
    pushValueArg,
};