const Pampipe = require('../index').Pampipe;
const path = require('path');

const file = path.join(__dirname, 'test.jpg');

// recursive function
function runBenchPam(dir, times, res) {
    const results = Array.isArray(res) ? res : [];
    if (results.length < times) {
        return benchPam(dir, results.length).then((data) => {
            results.push(data);
            return runBenchPam(dir, times, results);
        });
    }
    return Promise.resolve(results);
}

function benchPam(dir, id) {
    id = id !== undefined ? id : '';
    const start = new Date();
    return new Pampipe()
        .jpegtopnm(file)
        .pamscale({
            xyfit: 450,
        })
        .pamflip('r90')
        .pnmtojpeg()
        .save(path.join(dir, `pam${id}.jpg`))
        .then(() => {
            const end = new Date();
            return end.getTime() - start.getTime();
        });
}

module.exports = function bench(times, dir) {
    return runBenchPam(dir, times);
};