const path = require('path');
const fs = require('fs');

const version = '0.0.0';
const reactPath = '../react/package.json';
const resolvedReactPath = path.resolve(__dirname, reactPath);


const reactPkg = require(reactPath);
reactPkg.version = version;

fs.writeFileSync(resolvedReactPath, JSON.stringify(reactPkg, null, 2), (err) => {
  if (err) throw err;
})
