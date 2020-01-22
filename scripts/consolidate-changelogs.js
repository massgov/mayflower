const { newLogsWithTitle } = require('./compile-changelogs');

const path = require('path');
const fs = require('fs');

const directoryPath = path.resolve(__dirname, '../changelogs');
const changelogPath = `${path.resolve(__dirname, '../')}/CHANGELOG.md`;

const fd = fs.readFileSync(changelogPath).toString().split("\n");
fd.splice(3, 0, newLogsWithTitle);

// Update the changelog.md file
var allLogs = fd.join('\n');
fs.writeFileSync(changelogPath, allLogs, (err) => {
  if (err) throw err;
})


// Remove the changelog files
for (var i=0; i<changelogs.length; i++) {
  var changeLogFilePath = directoryPath + "/" + changelogs[i];
  fs.unlink(changeLogFilePath, (err) => {
    if (err) {
        console.log("failed to delete changelog:"+err);
    } else {
        console.log('successfully deleted changelog');
    }
  });
}
