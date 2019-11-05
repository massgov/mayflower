// Added shelljs to use maybe in the script "npm install shelljs"
// https://github.com/shelljs/shelljs
const shell = require('shelljs');

// Added semver to use for increment the version "npm install semver"
// https://github.com/npm/node-semver
const semver = require('semver');


const path = require('path');
const fs = require('fs');

/**
 * $ node scripts/release-branch 9.16.0
 * @param {2} version - e.g. 9.16.0
 */


let version = '';
process.argv.forEach((val, index) => {
  if (index === 2) {
    version = val;
  }
});

// Find out the latest release tag and display it in the command line
const latest = shell.exec('git describe --abbrev=0 --tags');

// Display the latest tag.
shell.echo('Display the current tag:', latest);

// Increment the release branch.
const minor = semver.inc(latest.toString(), 'minor');

// Print out the new ninor version
shell.echo(minor);

// Update the changelog.md file
const today = new Date();
const day = today.getDay();
const month = today.getMonth();
const year = today.getFullYear();


const title = `## ${minor} (${month}/${day}/${year})`;
// Look at the changelog files
// '!**/template.md'
const directoryPath = path.resolve(__dirname, '../changelogs');
const changelogPath = `${path.resolve(__dirname, '../')}/CHANGELOG.md`;

let newLogs = [];
const changelogs = fs.readdirSync(directoryPath);
changelogs.forEach((fileName) => {
  const content = fs.readFileSync(`${directoryPath}/${fileName}`, 'utf8');
  newLogs.push(content)
});

const fd = fs.readFileSync(changelogPath).toString().split("\n");
fd.splice(0, 0, title, newLogs);
var allLogs = fd.join("\n");

fs.writeFileSync(changelogPath, allLogs, (err) => {
  if (err) throw err;
})

// If nothing to release exit code to stop the script

// Remove the changelog files

// Checkout the branch.
// const releaseBranch = shell.exec('git checkout -b release/' + minor);

// Display the new release branch
// shell.echo('Display the current tag:', releaseBranch);

// Git add to the checkout branch
// shell.exec('git add .');

// Push the branch up to GitHub
// shell.exec('git push --set-upstream origin release/' + releaseBranch);

// Create the pull request in GitHub