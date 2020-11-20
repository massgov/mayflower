const path = require('path');
const fs = require('fs');

const updateCoreVersion = (newVer) => {
  const filePath = `${path.resolve(__dirname, '../packages/core')}/.env`;

  const content = fs.readFileSync(filePath).toString();


  const regex = /[0-9]+\.[0-9]+\.[0-9]+/g;
  const newContent = content.replace(regex, newVer)

  fs.writeFileSync(filePath, newContent, (err) => {
    if (err) throw err;
  })
}

module.exports = {
  updateCoreVersion
};
