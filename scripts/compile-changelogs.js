const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
// Added semver to use for increment the version "npm install semver"
// https://github.com/npm/node-semver
const semver = require('semver');

const { latest } = require('./release-vars');

const directoryPath = path.resolve(__dirname, '../changelogs');
const changelogPath = `${path.resolve(__dirname, '../')}/CHANGELOG.md`;

// Read directory path and exclude the template.yml file.
const changelogs = fs.readdirSync(directoryPath).filter(function(file) {
  return file.match(/^.*\.yml$/g) && file!== "template.yml";
});

if (!changelogs || changelogs.length<1) {
  console.log('Nothing to release today!')
  process.exit(1);
}

let changeTypes = [];
let impacts = [];
let changeContents = {};
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
    const { project, component, issue, description, impact } = change;
    const newChange = `- (${project}) [${component}] ${issue ? `${issue}: ` : ''}${description}\n`
    impacts.push(impact);
    newLogs.push(newChange);
  });
})

/** Form the new release tag */
let maxImpact = 'patch'
if (impacts.includes('Major')) {
  maxImpact = 'major';
} else if (impacts.includes('Minor')) {
  maxImpact = 'minor';
}
// Increment the release branch.
const version = semver.inc(latest.toString(), maxImpact);
console.log(`New release tag: ${version}`);

const today = new Date();
// Changed from getDay() was giving the wrong day of the week adjusted to use getDate() instead.
const day = today.getDate();
// Need to increase getMonth() by one.
const month = today.getMonth() +1;
const year = today.getFullYear();

// Changelog.md title for each release
const title = `## ${version} (${month}/${day}/${year})`;
// Add release title with
const newLogsWithTitle = [title, ...newLogs].join('');

// Export data to use in release.branch
module.exports = {
  changelogs,
  newLogsWithTitle,
  version
};


var allLogs = fs.readFileSync(changelogPath).toString().split("\n");

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
