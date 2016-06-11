'use strict';

const index = require('../index');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const path = require('path');
const os = require('os');
const fs = require('fs');
const rimraf = require('rimraf');

const testJPG = path.join(__dirname, 'fixtures/original.jpg');

describe.only('pampipe', function () {
    let tmpDir = path.join(os.tmpdir(), `pampipe${Date.now()}`);
    before(function () {
        return new Promise((resolve, reject) => {
            fs.mkdir(tmpDir, (err) => {
                if (err) reject(err);
                return resolve();
            });
        });
    });
    after(function () {
        return new Promise((resolve, reject) => {
            rimraf(tmpDir, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
    it('creates a new pampipe instance', function () {
        const pampipe = new index.Pampipe();
        expect(pampipe).to.be.instanceof(index.Pampipe);
    });
    it('returns piped commands', function () {
        const pampipe = new index.Pampipe();
        const command = pampipe
          .jpegtopnm(testJPG, { dct: 'int' })
          .pamflip('r180')
          .pnmtopng()
          .getCommand();
        expect(command).to.equal(`jpegtopnm -dct int ${testJPG} | pamflip -r180 | pnmtopng`);
    });
    describe('save', function () {
        it('rejects promise if filename is not specified', function () {
            const p = new index.Pampipe()
              .jpegtopnm(testJPG)
              .pamflip('r180')
              .pnmtojpeg()
              .save();
            return expect(p).to.be.rejectedWith('Please specify filename');
        });
        it('saves file correctly', function () {
            const file = path.join(tmpDir, 'rotated180.jpeg');
            const p = new index.Pampipe()
              .jpegtopnm(testJPG)
              .pamflip('r180')
              .pnmtojpeg()
              .save(file);
            return p.then((data) => {
                expect(data).to.equal(file);
                return new Promise((resolve, reject) => {
                    fs.lstat(file, (err, data) => {
                        if (err) {
                            return reject(err);
                        }
                        expect(data.size).to.be.above(0);
                        return resolve(data);
                    });
                });
            });
        });
    });
});