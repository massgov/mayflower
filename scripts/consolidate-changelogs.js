const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const directoryPath = path.resolve(__dirname, '../changelogs');
const changelogPath = `${path.resolve(__dirname, '../')}/CHANGELOG.md`;


// Read directory path and exclude the template.yml file.
const changelogs = fs.readdirSync(directoryPath).filter(function(file) {
  return file.match(/^.*\.yml$/g) && file!== "template.yml";
});

let changeTypes = []
let changeContents = {}
let newLogs = [];
/** Loop through each changelog in the changelogs directory,
  * consolidate changelogs with the same changeTypes together
*/
changelogs.forEach((fileName) => {
  const content = yaml.safeLoad(fs.readFileSync(`${directoryPath}/${fileName}`, 'utf8'));
  Object.keys(content).forEach((changeType) => {
    // If it encounters a new change type
    if(changeTypes.indexOf(changeType) < 0) {
      // add it to the changeType array
      changeTypes.push(changeType);
      // add the content of the changelog to changeContents object under the changeType key
      changeContents[changeType] = content[changeType]
    } else {
      // If it's an existing change type, append the content of the changelog into the existing changeType array
      changeContents[changeType] = [...changeContents[changeType], ...content[changeType]]
    }
  });
});

/** Format consolidated changelogs data into a string with desired markdown syntax */
changeTypes.forEach((changeType) => {
  newLogs.push(`\n### ${changeType} \n`)
  changeContents[changeType].forEach((change) => {
    const newChange = `- (${change.project}) [${change.component}] ${change.issue}: ${change.description}\n`
    newLogs.push(newChange);
  });
})

const today = new Date();
// Changed from getDay() was giving the wrong day of the week adjusted to use getDate() instead.
const day = today.getDate();
// Need to increase getMonth() by one.
const month = today.getMonth() +1;
const year = today.getFullYear();

// Changelog.md title for each release
const title = `## ${minor} (${month}/${day}/${year})`;
// Add release title with
const newLogsWithTitle = [title, ...newLogs].join('');
exports.newLogsWithTitle = newLogsWithTitle;

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
