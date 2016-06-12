/* eslint no-console:off */

'use strict';

const netpbm = require('./netpbm');
const sharp = require('./sharpBench');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

function analyse(data) {
    let min = Infinity;
    let max = -Infinity;
    data.forEach((time) => {
        if (time < min) {
            min = time;
        }
        if (time > max) {
            max = time;
        }
    });
    const avg = data.reduce((prevValue, currentValue) => {
        return prevValue + currentValue;
    }, 0) / data.length;

    return {
        min,
        max,
        avg,
        data,
    };
}

const outputDir = path.join(__dirname, 'output');
fs.mkdirSync(outputDir);

const netpbmPromise = netpbm(5, outputDir).then(analyse).then((res) => {
    console.log(`Netpbm benchmark completed. ${res.data.length} results collected.`)
    console.log(res.data);
    console.log(`Min: ${res.min} ms`);
    console.log(`Max: ${res.max} ms`);
    console.log(`Average: ${res.avg} ms`);
    return res.avg;
});

const sharpPromise = sharp(5, outputDir).then(analyse).then((res) => {
    console.log(`Sharp benchmark completed. ${res.data.length} results collected.`)
    console.log(res.data);
    console.log(`Min: ${res.min} ms`);
    console.log(`Max: ${res.max} ms`);
    console.log(`Average: ${res.avg} ms`);
    return res.avg;
});

Promise.all([netpbmPromise, sharpPromise]).then((res) => {
    console.log('Benchmark completed');
    const summary = res[0] / res[1];
    const dif = Math.floor(summary*100)/100;
    console.log(`Sharp is ${summary < 1 ? 'slower' : 'faster'} than netpbm ${dif} times`);
}).then(() => {
    rimraf.sync(outputDir);
});
