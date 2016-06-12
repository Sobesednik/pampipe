const sharp = require('sharp');
const path = require('path');

sharp.cache({
    items: 0,
});

const file = path.join(__dirname, 'test.jpg');

// recursive function
function runBenchSharp(dir, times, res) {
    const results = Array.isArray(res) ? res : [];
    if (results.length < times) {
        return benchSharp(dir, results.length).then((data) => {
            results.push(data);
            return runBenchSharp(dir, times, results);
        });
    }
    return Promise.resolve(results);
}

function benchSharp(dir, id) {
    id = id !== undefined ? id : '';
    const start = new Date();
    return new Promise((resolve, reject) => {
        sharp(file)
            .resize(300)
            .rotate(270)
            .toFile(path.join(dir, `sharp${id}.jpg`), function(err) {
                if (err) {
                    return reject(err);
                }
                const end = new Date();
                return resolve(end.getTime() - start.getTime());
            });
    });
}

module.exports = function bench(times, dir) {
    return runBenchSharp(dir, times);
};