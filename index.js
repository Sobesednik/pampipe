'use strict';

const pamflip = require('./lib/pamflip');
const jpegtopnm = require('./lib/jpegtopnm');
const pnmtopng = require('./lib/pnmtopng');
const pnmtojpeg = require('./lib/pnmtojpeg');
const pamscale = require('./lib/pamscale');

const cp = require('child_process');

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
    pnmtopng(options) {
        const command = pnmtopng(options);
        this.commands.push(command);
        return this;
    }
    pnmtojpeg(options) {
        const command = pnmtojpeg(options);
        this.commands.push(command);
        return this;
    }
    pamscale(options) {
        const command = pamscale(options);
        this.commands.push(command);
        return this;
    }
    getCommand() {
        return this.commands.join(' | ');
    }
    save(file) {
        if (!file) {
            return Promise.reject(new Error('Please specify filename'));
        }
        const cmd = `${this.getCommand()} > ${file}`;
        return new Promise((resolve, reject) => {
            cp.exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    return reject(err);
                }
                return resolve(file);
            });
        });
    }
}

module.exports = {
    Pampipe,
    pamflip,
    jpegtopnm,
    pnmtopng,
    pnmtojpeg,
    pamscale,
};