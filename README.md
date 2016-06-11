# pampipe
A Node.js module to enable chaining of netpbm programs.

## Usage
```javascript
const Pampiple = require('pampipe').Pampipe;

const pampipe = new Pampipe();
const command = pampipe
  .jpegtopnm('image.jpg')
  .pamflip('r180')
  .pnmtojpeg().
  .getCommand();

console.log(command);
// jpegtopnm image.jpg | pamflip -r180 | pnmtojpeg

new Pampipe()
  .jpegtopnm('image.jpg')
  .pamflip('r180')
  .pnmtojpeg().
  .save('filename.jpg')
  .then((data) => {
      console.log(data); // filename.jpg
  });
```

### jpegtopnm
Reads a jpeg file and converts it into a pnm image.

Options:
- **dct** [int, fast, float, default int]: which DCT method to use
- **nosmooth** Boolean: faster, lower-quality unsampling route
- **maxmemory** int|String: how much memory to use, e.g., 2500000 or '4mb'
- **adobe** Boolean: true to add -adobe arg and false to add -notadobe arg
- **dumpexif** Boolean: print exif to _stderr_
- **exif** String: extract exif header and wirte it to file
- **multiple** Boolean: read multiple files from _stdin_
- **repair** Boolean: try to repair invalid input
- **comments** Boolean: print comments in file to _stderr_
- **verbose** Boolean: print details to _stderr_
- **tracelevel** int: debug level, higher level will print more info

Usage:

```javascript
const pampipe = new Pampipe();
pampipe
  .jpegtopnm('image.jpg', {
    dct: 'fast',
    nosmooth: true,
    maxmemory: '1m',
    adobe: false,
    exif: 'data.exif',
  })
  .getCommand();
// jpegtopnm -dct fast -nosmooth -maxmemory 1m -notadobe -exif=data.exif image.jpg
```

[http://netpbm.sourceforge.net/doc/jpegtopnm.html](http://netpbm.sourceforge.net/doc/jpegtopnm.html)

### pnmtojpeg
Converts a pnm image to a JPEG.

Options:
- **exif** String: add exif data from specified file
- **quality** int (0 to 100, default 75): adjust image quality
- **grayscale|greyscale** Boolean: produce a grayscale image
- **rgb** Boolean: use RGB colour space instead of YCbCr
- **density** String (nxn[dpi,dpcm]): resolution information, e.g., 1x1, 3x2, 300x300dpi, 100x200dpcm
- **optimise|optimize** Boolean: perform entropy optimisation
- **progressive** Boolean: create a progressive JPEG
- **comment** String: add a comment marker
- **dct** [int, fast, float, default int]: which DCT method to use
- **arithmetic** String: use arithmetic coding instead of Huffman encoding
- **restart** int: emit a JPEG restart marker every _n_ MCU rows
- **smooth** int (0 to 100, default 0): eliminate dithering noise
- **maxmemory** int|String: how much memory to use, e.g., 2500000 or '4mb'
- **verbose** Boolean: print details to _stderr_
- **baseline** Boolean: force baseline-compatible quantization tables
- **qtables** String: use quantisation tables from specified file
- **qslots** String (n[,...]): which quantisation table to use for each colour component
- **sample** String (HxV[,...]): samplint factors for each colour component
- **scans** String: use scan script from specified file
- **tracelevel** int: debug level, higher level will print more info

Usage:

```javascript
const pampipe = new Pampipe();
pampipe
  .jpegtopnm('image.jpg', {
      exif: 'data.exif',
  })
  .pamflip('r180')
  .pnmtojpeg({
      exif: 'data.exif', // copy exif from original
      quality: 80,
      progressive: true,
      dct: 'fast',
      qtables: 'qtables.txt',
  })
  .getCommand();
// jpegtopnm -exif=data.exif image.jpg | pamflip -r180 | \
// pnmtojpeg -exif=data.exif -quality=80 -progressive -dct=fast -qtables=qtables.txt
```

[http://netpbm.sourceforge.net/doc/pnmtojpeg.html](http://netpbm.sourceforge.net/doc/pnmtojpeg.html)

### pamflip
Allows to transform an image, e.g., rotate, flip, transpose, _etc_.
Allowed transforms are:
- leftright (lr)
- topbottom (tb)
- transpose (xy)
- rotate90 (r90, ccw)
- rotate180 (r180)
- rotate270 (r270, cw)
- null

Options:
- **memsize** int: size in megabytes of memory available for pamflip (see doc)

Usage:
```javascript
const pampipe = new Pampipe();
pampipe
  .jpegtopnm('image.jpg')
  .pamflip('r90');
  .getCommand();
// jpegtopnm image.jpg | pamflip -r90

// you can also specify transforms as array, as well as memsize
pampipe
  .jpegtopnm('image.jpg')
  .pamflip(['r180', 'leftright'], {
    memsize: 4,
  })
  .getCommand();
// jpegtopnm image.jpg | pamflip -xform=r180,leftright -memsize=4
```

[http://netpbm.sourceforge.net/doc/pamflip.html](http://netpbm.sourceforge.net/doc/pamflip.html)