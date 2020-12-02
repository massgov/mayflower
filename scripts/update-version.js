const path = require('path');
const fs = require('fs').promises;

module.exports = async function updateCoreVersion(newVer) {
  const filePath = `${path.resolve(__dirname, '../packages/core')}/.env`;

  try {
    const content = fs.readFileSync(filePath).toString();
    const regex = /[0-9]+\.[0-9]+\.[0-9]+/g;
    const newContent = content.replace(regex, newVer)
    await fs.writeFile(filePath, newContent);
  } catch(error) {
    throw error;
  }
}
