const path = require('path');
const fs = require('fs');
const distPaths = require('./dist_paths');

distPaths.forEach((dist) => {
  const src = path.resolve(__dirname, `../../${dist.src}`)
  const dest = path.resolve(__dirname, `../../dist/${dist.dest}`)
  if (fs.existsSync(src)) {
    fs.copyFile(src, dest, (err) => {
      if (err) throw err;
      console.log(`${dist.src} was copied to dist/${dist.dest}`);
    });
  }
});
