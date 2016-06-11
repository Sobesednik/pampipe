# pampipe
A Node.js module to enable chaining of netpbm programs.

## Usage
```javascript
const Pampiple = require('pampipe').Pampipe;

const pampipe = new Pampipe();
pampipe
  .jpegtopnm('image.jpg')
  .pamflip('r180')
  .pnmtojpeg();
```

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
- _memsize_: size in megabytes of memory available for pamflip (see doc)

Usage:
```
const pampipe = new Pampipe();
pampipe
  .jpegtopnm('image.jpg')
  .pamflip('r90');

// you can also specify transforms as array
pampipe
  .jpegtopnm('image.jpg')
  .pamflip(['r180', 'leftright'], {
    memsize: 1024,
  });
```

[http://netpbm.sourceforge.net/doc/pamflip.html](http://netpbm.sourceforge.net/doc/pamflip.html)