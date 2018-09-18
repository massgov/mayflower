const fse = require('fs-extra');

fse.remove('src/assets', (err1) => {
  /* eslint-disable no-console */
  if (err1) return console.error(err1);
  console.log('build assets cleaned.');

  return fse.copy('../assets', 'src/assets', (err2) => {
    if (err2) return console.error(err2);
    console.log('assets copied for build!');
    return 0;
  });
});
