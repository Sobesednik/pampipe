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

pampipe
  .jpegtopnm('image.jpg')
  .pamflip('r180')
  .pnmtojpeg().
  .execute()
  .then((data) => {
    // result from stdout
  });
```

### jpegtopnm
Reads a jpeg file and converts it into a pnm image.

Options:
- **dct** [int, fast, float]: which DCT method to use
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