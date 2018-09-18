const fse = require('fs-extra');

fse.remove('src/assets', (err) => {
  /* eslint-disable no-console */
  if (err) return console.error(err);
  console.log('build assets cleaned.');
  return 0;
});
