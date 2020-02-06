const fs = require('fs');
const path = require('path');

const { octokit, latest } = require('./release-vars');

const changelogPath = `${path.resolve(__dirname, '../')}/CHANGELOG.md`;
const re = /\n##\s/;
const newLogs = fs.readFileSync(changelogPath).toString().split(re, 2);
const newLogsWithTitle = `\n## ${newLogs[1]}`;

const reg = /^[0-9]+\.[0-9]+\.[0-9]/
const version = newLogs[1].match(reg)[0];
console.log(`New release tag: ${version}`);

// If the lastest version in CHANGELOG.md is the same as the previous release version, do not cut a release
if (version.trim() === latest.toString().trim()) {
  console.log('Nothing to release today!')
  process.exit(1);
}

// Cut the release tag in GitHub
octokit.repos.createRelease({
  owner: 'massgov',
  repo: 'mayflower',
  tag_name: version,
  target_commitish: 'master',
  name: version,
  body: newLogsWithTitle
});
