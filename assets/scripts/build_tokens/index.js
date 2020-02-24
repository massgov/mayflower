/**
  This script is used to copy the contents of the npm package @massds/mayflower-tokens
  into the dist folder. To control what gets into the dist folder, edit dist_paths.js
*/
const path = require('path');
const fs = require('fs');
const distPaths = require('./dist_paths');

// Function to create a new directory if it does not already exist.
const createPath = (path) => {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
}

// Create dist folder
createPath(path.resolve(__dirname, `../../dist`));

distPaths.forEach((dist) => {
  const src = path.resolve(__dirname, `../../${dist.src}`)
  const dest = path.resolve(__dirname, `../../dist/${dist.dest}`)
  const destFolder = dest.split('/');
  const lastPath = destFolder.pop();
  const isDir = !lastPath.includes('.');
  // Check if src file or directory exist
  if (fs.existsSync(src)) {
    // Check if destination is a directory
    if (isDir) {
      createPath(dest);
      const contents = fs.readdirSync(src);
      let i=0;
      // Loop through the src directory and copy the immediate children files into dest location with the same filename
      for (;i<contents.length;i++) {
        const fileName = contents[i];
        // exclude hidden files, e.g. .DS_Store
        if (!fileName.startsWith('.') ) {
          fs.copyFile(`${src}/${fileName}`, `${dest}/${fileName}`, (err) => {
            if (err) throw err;
            console.log(`${dist.src}/${fileName} was copied to dist/${dist.dest}/${fileName}`);
          });
        }
      }
    } else {
      const destFolderPath = destFolder.join('/');
      createPath(destFolderPath);
      fs.copyFile(src, dest, (err) => {
        if (err) throw err;
        console.log(`${dist.src} was copied to dist/${dist.dest}`);
      });
    }
  } else {
    console.log('source file doesn\'t exist!')
  }
});
