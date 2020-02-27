const path = require('path');
const fs = require('fs');

module.exports = function (pkgPath, version){
  const pkgJSON = require(pkgPath);
  pkgJSON.version = version;
  const resolvedPkgPath = path.resolve(__dirname, pkgPath);
  fs.writeFileSync(resolvedPkgPath, JSON.stringify(pkgJSON, null, 2), (err) => {
    if (err) throw err;
  })
}
