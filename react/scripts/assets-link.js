const { symlink } = require('fs');
const fse = require('fs-extra');

fse.remove('src/assets', (err1) => {
  /* eslint-disable no-console */
  if (err1) return console.error(err1);
  console.log('build assets cleaned.');

  return symlink('../assets', './src/assets', (err2) => {
    if (err2) return console.log(err2);
    console.log('assets linked for npm start!');
    return 0;
  });
});
