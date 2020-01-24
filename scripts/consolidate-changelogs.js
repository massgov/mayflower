const path = require('path');
const fs = require('fs');

const directoryPath = path.resolve(__dirname, '../changelogs');
const changelogPath = `${path.resolve(__dirname, '../')}/CHANGELOG.md`;
const tempLogsPath = `${path.resolve(__dirname, '../')}/tempLogs.json`;

var allLogs = fs.readFileSync(changelogPath).toString().split("\n");

// Get data from tempLogs JSON
const { newLogsWithTitle, changelogs } = require('./compile-changelogs');

// Insert new changelogs onto the 4th line
allLogs.splice(3, 0, newLogsWithTitle);
allLogs = allLogs.join('\n');

// Update the changelog.md file
fs.writeFileSync(changelogPath, allLogs, (err) => {
  if (err) throw err;
})


// Remove the changelog files
for (var i=0; i<changelogs.length; i++) {
  var changeLogFilePath = directoryPath + "/" + changelogs[i];
  fs.unlink(changeLogFilePath, (err) => {
    if (err) {
        console.log(`failed to delete changelog: ${err.toString()}`);
    } else {
        console.log(`successfully deleted changelog ${changelogs[i]}`);
    }
  });
}
