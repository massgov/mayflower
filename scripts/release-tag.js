const fs = require('fs');
const path = require('path');

const { octokit } = require('./release-vars');

const changelogPath = `${path.resolve(__dirname, '../')}/CHANGELOG.md`;
const re = /\n##\s/;
const newLogs = fs.readFileSync(changelogPath).toString().split(re, 2);
const newLogsWithTitle = `\n## ${newLogs[1]}`;

const reg = /^[0-9]+\.[0-9]+\.[0-9]/
const version = newLogs[1].match(reg)[0];
console.log(`New release tag: ${version}`);

// Cut the release tag in GitHub
octokit.repos.createRelease({
  owner: 'massgov',
  repo: 'mayflower',
  tag_name: version,
  target_commitish: 'master',
  name: version,
  body: newLogsWithTitle
})().catch(function(err) {
  console.error(`There was an error thrown during the cutting of the release tag: ${err.toString()}`);
  process.exit(1);
});
