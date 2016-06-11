'use strict';

const index = require('../index');
const expect = require('chai').expect;
const resemblejs = require('node-resemble-js');
const path = require('path');
const fs = require('fs');
const os = require('os');
const rimraf = require('rimraf');

const testJPG = path.join(__dirname, 'fixtures/original.jpg');
const fliphPath = path.join(__dirname, 'fixtures/flip_horizontal.png');
const flipvPath = path.join(__dirname, 'fixtures/flip_vertical.png');
const rotate90Path = path.join(__dirname, 'fixtures/rotate90.png');
const rotate270Path = path.join(__dirname, 'fixtures/rotate270.png');

function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}
function compare(image, to) {
    return new Promise((resolve) => {
        resemblejs(image)
          .compareTo(to)
          .onComplete((data) => {
              resolve(data);
          });
    });
}

describe('integration', function () {
    let fliphBuffer;
    let flipvBuffer;
    let r90Buffer;
    let r270Buffer;

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
    before(function () {
        return Promise.all([
            readFile(fliphPath).then((data) => {
                fliphBuffer = data;
            }),
            readFile(flipvPath).then((data) => {
                flipvBuffer = data;
            }),
            readFile(rotate90Path).then((data) => {
                r90Buffer = data;
            }),
            readFile(rotate270Path).then((data) => {
                r270Buffer = data;
            }),
        ]);
    });

    it('flips image horizontally', function () {
        const file = path.join(tmpDir, 'flipH.png');
        const pampipe = new index.Pampipe();
        return pampipe
          .jpegtopnm(testJPG)
          .pamflip('leftright')
          .pnmtopng()
          .save(file)
          .then((data) => {
              return readFile(data).then((data) => {
                  return compare(data, fliphBuffer).then((data) => {
                      expect(Number(data.misMatchPercentage)).to.be.below(1);
                  });
              });
          });
    });
    it('flips image vertically', function () {
        const file = path.join(tmpDir, 'flipV.png');
        const pampipe = new index.Pampipe();
        return pampipe
          .jpegtopnm(testJPG)
          .pamflip('topbottom')
          .pnmtopng()
          .save(file)
          .then((data) => {
              return readFile(data).then((data) => {
                  return compare(data, flipvBuffer).then((data) => {
                      expect(Number(data.misMatchPercentage)).to.be.below(1);
                  });
              });
          });
    });
    it('rotates image 90 degrees', function () {
        const file = path.join(tmpDir, 'r90.png');
        const pampipe = new index.Pampipe();
        return pampipe
          .jpegtopnm(testJPG)
          .pamflip('rotate270')
          .pnmtopng()
          .save(file)
          .then((data) => {
              return readFile(data).then((data) => {
                  return compare(data, r90Buffer).then((data) => {
                      expect(Number(data.misMatchPercentage)).to.be.below(1);
                  });
              });
          });
    });
    it('rotates image 270 degrees', function () {
        const file = path.join(tmpDir, 'r270.png');
        const pampipe = new index.Pampipe();
        return pampipe
          .jpegtopnm(testJPG)
          .pamflip('rotate90')
          .pnmtopng()
          .save(file)
          .then((data) => {
              return readFile(data).then((data) => {
                  return compare(data, r270Buffer).then((data) => {
                      expect(Number(data.misMatchPercentage)).to.be.below(1);
                  });
              });
          });
    });
    xit('transforms JPEG according to EXIF', function () {

    });
});