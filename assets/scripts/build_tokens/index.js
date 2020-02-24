const path = require('path');
const fs = require('fs');
const distPaths = require('./dist_paths');

distPaths.forEach((dist) => {
  const src = path.resolve(__dirname, `../../${dist.src}`)
  const dest = path.resolve(__dirname, `../../dist/${dist.dest}`)
  // create new directory for destination if not already exists
  const destFolder = dest.split('/');
  const lastPath = destFolder.pop();
  // Check if destination is a directory
  const isDir = !lastPath.includes('.');
  const destFolderPath = destFolder.join('/');
  if (fs.existsSync(src)) {
    if (!fs.existsSync(destFolderPath)){
      fs.mkdirSync(destFolderPath);
    }
    if (isDir) {
      const contents = fs.readdirSync(src);
      let i=0;
      for (; i<contents.length;i++) {
        const fileName = contents[i];
        // exclude hidden files, e.g. .DS_Store
        if (!fileName.startsWith('.') ) {
          console.log(fileName);
          fs.copyFile(`${src}/${fileName}`, `${dest}/${fileName}`, (err) => {
            if (err) throw err;
            console.log(`${dist.src}/${fileName} was copied to dist/${dist.dest}/${fileName}`);
          });
        }
      }
    } else {
      fs.copyFile(src, dest, (err) => {
        if (err) throw err;
        console.log(`${dist.src} was copied to dist/${dist.dest}`);
      });
    }
  } else {
    console.log('source file doesn\'t exist!')
  }
});
