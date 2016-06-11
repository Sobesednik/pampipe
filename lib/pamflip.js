'use strict';

const allowedTransforms = [
    'leftright',
    'lr',
    'topbottom',
    'tb',
    'transpose',
    'xy',
    'rotate90',
    'r90',
    'ccw',
    'rotate180',
    'r180',
    'rotate270',
    'r270',
    'cw',
    'null',
];

function validateTransform(transform) {
    if (allowedTransforms.indexOf(transform) === -1) {
        throw new Error(`Transform ${transform} is not allowed`);
    }
}

function flip(transform, options, filename) {
    const opts = options !== undefined ? options : {};
    const args = [];
    if (Array.isArray(transform)) {
        transform.forEach(validateTransform);
        args.push(`-xform=${transform.join(',')}`);
    } else {
        validateTransform(transform);
        args.push(`-${transform}`);
    }
    if (opts.memsize) {
        args.push(`-memsize=${opts.memsize}`);
    }
    if (filename) {
        args.push(filename);
    }

    return `pamflip ${args.join(' ')}`;
}

// http://jpegclub.org/exif_orientation.html
function getFlipFromExifOrientation(orientation) {
    switch (orientation) {
    case 2:
        return 'leftright';
    case 3:
        return 'rotate180';
    case 4:
        return 'topbottom';
    case 5:
        return 'transpose';
    case 6:
        return 'rotate270';
    case 7:
        // transverse
        return 'null';
    case 8:
        return 'rotate90';
    default:
        return 'null';
    }
}

module.exports = {
    flip,
    getFlipFromExifOrientation,
};