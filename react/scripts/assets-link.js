const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const sharedAssetsPath = path.resolve(__dirname, '..', '..', 'assets');
const buildAssetsPath = path.resolve(__dirname, '..', 'src', 'assets');

fse.remove(buildAssetsPath, (err1) => {
  /* eslint-disable no-console */
  if (err1) return console.error(err1);
  console.log('build assets cleaned.');

  return fs.symlink(sharedAssetsPath, buildAssetsPath, 'file', (err) => {
    if (err) return console.log(err);
    console.log('assets linked for npm start!');
    return 0;
  });
});
