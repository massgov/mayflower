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

// GitHub API
const https = require('https');

// Added simple-git to use for git add "npm install simple-git"
// Could not use the shell.exec to git add the remove changelogs.
const git = require('simple-git');

// Find out the latest release tag and display it in the command line
const latest = shell.exec('git describe --abbrev=0 --tags');

// Display the latest tag.
shell.echo('Display the current tag:', latest);

// Increment the release branch.
const minor = semver.inc(latest.toString(), 'minor');

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
const changelogs = fs.readdirSync(directoryPath).filter(function(template) {
  return template !== 'template.yml';
});

changelogs.forEach((fileName) => {
  const content = yaml.safeLoad(fs.readFileSync(`${directoryPath}/${fileName}`, 'utf8'));
  Object.keys(content).forEach((changeType, i) => {
    newLogs.push(`\n### ${changeType} \n`)
    content[changeType].forEach((change) => {
      const newChange = `- (${change.project}) [${change.component}] ${change.issue}: ${change.description}\n`
      newLogs.push(newChange);
    });
  });
});

const fd = fs.readFileSync(changelogPath).toString().split("\n");
fd.splice(0, 0, title, newLogs.join(''));
var allLogs = fd.join('\n');

// Remove the changelog files
fs.readdir(directoryPath, function(err, items) {
  for (var i=0; i<items.length; i++) {
    if (items[i] != "template.yml") {
      var changeLogFilePath = directoryPath + "/" + items[i];
      fs.unlink(changeLogFilePath, (err) => {
        if (err) throw err;
      });
    }
  }
});

fs.writeFileSync(changelogPath, allLogs, (err) => {
  if (err) throw err;
})

// Checkout the branch.
shell.exec('git checkout -b release/' + minor);
const releaseBranch = 'release/'+ minor;

// Display the new release branch
shell.echo('Display the current tag:', releaseBranch);

// Git add to the checkout branch
git().add('./*');

// Commit message for the branch
// shell.exec('git commit -m "changelog update and remove old changelog files"');

// Create the pull request in GitHub
// const data = JSON.stringify({
//   title: `Release/${minor}`,
//   body: 'xxx',
//   head: minor,
//   base: 'master',
// })
//
// const options = {
//   username: `massgov-bot:${process.env.DANGER_GITHUB_API_TOKEN}`,
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
