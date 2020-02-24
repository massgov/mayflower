const path = require('path');
const fs = require('fs');
const distPaths = require('./dist_paths');

distPaths.forEach((dist) => {
  const src = path.resolve(__dirname, `../../${dist.src}`)
  const dest = path.resolve(__dirname, `../../dist/${dist.dest}`)
  // create new directory for destination if not already exists
  const destFolder = dest.split('/');
  destFolder.pop();
  const destFolderPath = destFolder.join('/');
  if (fs.existsSync(src)) {
    if (!fs.existsSync(destFolderPath)){
      fs.mkdirSync(destFolderPath);
    }
    fs.copyFile(src, dest, (err) => {
      if (err) throw err;
      console.log(`${dist.src} was copied to dist/${dist.dest}`);
    });
  } else {
    console.log('source file doesn\'t exist!')
  }
});
