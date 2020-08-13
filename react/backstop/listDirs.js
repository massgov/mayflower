const fs = require('fs');
const path = require('path');

/**
 * Lists all directories in the passed path as absolute path names.
 * @param {string} dir
 */
const listDirs = (dir) => {
  // Set withFileTypes for symlink support.
  const fileNames = fs.readdirSync(dir, { withFileTypes: true });
  let dirList = [];
  fileNames.forEach((fileName) => {
    const absFilePath = path.join(dir, fileName.name);
    if (fileName.isDirectory()) {
      dirList.push(absFilePath);
      dirList = dirList.concat(listDirs(absFilePath));
    }
  });

  return dirList;
};

module.exports = listDirs;
