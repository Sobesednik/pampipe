'use strict';

const pamflip = require('./lib/pamflip');
const jpegtopnm = require('./lib/jpegtopnm');

class Pampipe {
    constructor() {
        this.commands = [];
    }
    pamflip(transform, options) {
        const command = pamflip.flip(transform, options);
        this.commands.push(command);
        return this;
    }
    jpegtopnm(filename, options) {
        const command = jpegtopnm(filename, options);
        this.commands.push(command);
        return this;
    }
    getCommand() {
        return this.commands.join(' | ');
    }
}

module.exports = {
    Pampipe,
    pamflip,
};