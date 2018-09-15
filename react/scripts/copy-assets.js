const fse = require('fs-extra');

// Async with callbacks:
fse.copy('../assets', 'src/assets', (err) => {
  if (err) return console.error(err);
  console.log('assets copied!');
});
