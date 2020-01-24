const { octokit, minor } = require('./release-vars');
const fs = require('fs');
const path = require('path');

const changelogPath = `${path.resolve(__dirname, '../')}/CHANGELOG.md`;
const re = /\n##\s/
const newLogs = fs.readFileSync(changelogPath).toString().split(re, 2);
const newLogsWithTitle = `\n## ${newLogs[1]}`

octokit.repos.createRelease({
  owner: 'massgov',
  repo: 'mayflower',
  tag_name: minor,
  target_commitish: 'master',
  name: minor,
  body: newLogsWithTitle
})

// Remove tempLogs JSON
fs.unlink(tempLogsPath, (err) => {
  if (err) {
      console.log(`failed to delete tempLogs.json: ${err.toString()}`);
  } else {
      console.log('successfully deleted tempLogs.json');
  }
});
