// Added shelljs to use maybe in the script "npm install shelljs"
// https://github.com/shelljs/shelljs
const shell = require('shelljs');

// Added semver to use for increment the version "npm install semver"
// https://github.com/npm/node-semver
const semver = require('semver');

// Used for the file system for changelog.
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

// Find out the latest release tag and display it in the command line
const latest = shell.exec('git describe --abbrev=0 --tags');

// Display the latest tag.
shell.echo('Display the current tag:', latest);

// Increment the release branch.
const minor = semver.inc(latest.toString(), 'minor');

// GitHub API
const https = require('https')

// Print out the new minor version
shell.echo(minor);

// Update the changelog.md file
const today = new Date();
const day = today.getDay();
const month = today.getMonth();
const year = today.getFullYear();

// Changelog.md title for each release
const title = `## ${minor} (${month}/${day}/${year})`;
// Look at the changelog files

const directoryPath = path.resolve(__dirname, '../changelogs');
const changelogPath = `${path.resolve(__dirname, '../')}/CHANGELOG.md`;

let newLogs = [];
// Read directory path and exclude the template.yml file.
const changelogs = fs.readdirSync(directoryPath).filter(function(template) {;
  return template !== 'template.yml';
});
changelogs.forEach((fileName) => {
  const content = yaml.safeLoad(fs.readFileSync(`${directoryPath}/${fileName}`, 'utf8'));
  Object.keys(content).forEach((changeType, i) => {
  	newLogs.push(`\n### ${changeType} \n`)
  	content[changeType].forEach((change) => {
  		const newChange = `- ${change.project} ${change.component} ${change.issue}: ${change.description}\n`
  		newLogs.push(newChange)
  	})
  });
});

const fd = fs.readFileSync(changelogPath).toString().split("\n");
fd.splice(0, 0, title, newLogs.join(''));
var allLogs = fd.join('\n');

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
// const data = JSON.stringify({
//   title: 'Release/${minor}',
//   body: 'xxxx',
//   head: '${minor}',
//   base: 'master',
// })
//
// const options = {
//   username: 'massgov-bot:DANGER_GITHUB_API_TOKEN',
//   userAgent: 'https://api.github.com/repos/massgov/mayflower/',
//   path: 'https://api.github.com/repos/massgov/mayflower/pulls',
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   }
// }
// const req = https.request(options, (res) => {
//   console.log(`statusCode: ${res.statusCode}`)
//
//   res.on('data', (d) => {
//     process.stdout.write(d)
//   })
// })
//
// req.on('error', (err) => {
//   if (err) throw err;
// })
//
// req.write(data)
// req.end()
