const path = require('path');
const fs = require('fs');

const version = '0.1.0';
const reactPath = '../react/package.json';
const patternlabPath = '../patternlab/styleguide/package.json';
const assetsPath = '../assets/package.json';

const reactPkg = require(reactPath);
const patternlabPkg = require(patternlabPath);
const assetsPkg = require(assetsPath);

function bumpVersion(pkgPath, version){
  const pkgJSON = require(pkgPath);
  pkgJSON.version = version;
  const resolvedPkgPath = path.resolve(__dirname, pkgPath);
  fs.writeFileSync(resolvedPkgPath, JSON.stringify(pkgJSON, null, 2), (err) => {
    if (err) throw err;
  })
}

bumpVersion(reactPath, version);
bumpVersion(patternlabPath, version);
bumpVersion(assetsPath, version);
