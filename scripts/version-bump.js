const path = require('path');
const fs = require('fs');

const version = '0.0.0';
const reactPath = '../react/package.json';
const patternlabPath = '../patternlab/styleguide/package.json';
const assetsPath = '../assets/package.json';

const reactPkg = require(reactPath);
const patternlabPkg = require(patternlabPath);
const assetsPkg = require(assetsPath);

reactPkg.version = version;
patternlabPkg.version = version;
assetsPkg.version = version;

const resolvedReactPath = path.resolve(__dirname, reactPath);
const resolvedPatternlabPath = path.resolve(__dirname, patternlabPath);
const resolvedAssetsPath = path.resolve(__dirname, assetsPath);

fs.writeFileSync(resolvedReactPath, JSON.stringify(reactPkg, null, 2), (err) => {
  if (err) throw err;
})
fs.writeFileSync(resolvedPatternlabPath, JSON.stringify(patternlabPkg, null, 2), (err) => {
  if (err) throw err;
})
fs.writeFileSync(resolvedAssetsPath, JSON.stringify(assetsPkg, null, 2), (err) => {
  if (err) throw err;
})
