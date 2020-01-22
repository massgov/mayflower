// Added shelljs to use maybe in the script "npm install shelljs"
// https://github.com/shelljs/shelljs
const shell = require('shelljs');

const Octokit = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.DANGER_GITHUB_API_TOKEN
});

// Added semver to use for increment the version "npm install semver"
// https://github.com/npm/node-semver
const semver = require('semver');

// Used for the file system for changelog.
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

// Added simple-git to use for git add "npm install simple-git"
// Could not use the shell.exec to git add the remove changelogs.
const git = require('simple-git/promise')();

// Find out the latest release tag and display it in the command line.
const latest = shell.exec('git tag  | grep -E "^[0-9]" | sort -V | tail -1');

// Display the latest tag.
console.log(`Display the latest tag: ${latest}`);

// Increment the release branch.
const minor = semver.inc(latest.toString(), 'minor');

// Print out the new minor version
console.log(`New release tag: ${minor}`);

// Look at the changelog files

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


// Checkout the branch.
const releaseBranch = 'release/' + minor;

(async function() {
  // This asynchronous logic will happen sequentially.
  // If an error is thrown, it will break out of this
  // asynchronous function immediately and exit 1.

  // Create the release branch and push to Github.
  shell.exec(`git branch -D ${releaseBranch}`)
  await git.checkoutLocalBranch(releaseBranch)
  await git.add('./*');
  await git.commit('Changelog update and remove old changelog files');
  // Use a force-push so if we have an old version of the branch sitting around
  // (eg: an unreleased one from last week), it gets updated regardless.
  await git.push('origin', releaseBranch, {'--force': null});

  // Create the pull request in GitHub
  await octokit.pulls.create({
    owner: 'massgov',
    repo: 'mayflower',
    title: `Release ${minor}`,
    head: releaseBranch,
    base: 'master',
    body: newLogsWithTitle
  });
})().catch(function(err) {
  console.error(`There was an error thrown during the cutting of the release PR: ${err.toString()}`);
  process.exit(1);
})
