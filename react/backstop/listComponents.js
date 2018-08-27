
const fs = require('fs');
const path = require('path');

/**
 * Lists all directories in the passed path as absolute path names.
 * @param {string} dir
 */
const listComponents = (dir) => {
  const fileNames = fs.readdirSync(dir);
  let dirList = [];
  let testList = [];

  fileNames.forEach((fileName) => {
    const absFilePath = path.join(dir, fileName);
    if (fs.statSync(absFilePath).isDirectory()) {
      dirList.push(absFilePath);
      dirList = dirList.concat(listComponents(absFilePath));
    }
  });

  Object.values(dirList).forEach((component) => {
    const testComponent = fs.readdirSync(component);
    testComponent.forEach((fileName) => {
      if (/stories/.test(fileName)) {
        testList.push(component);
      }
    });
  })

  return testList;
};

module.exports = listComponents;
