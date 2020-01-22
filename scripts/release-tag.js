const { octokit, minor } = require('./release-vars');
const fs = require('fs');
const path = require('path');
const tempLogsPath = `${path.resolve(__dirname, '../')}/tempLogs.json`;
// Get data from tempLogs JSON
const { newLogsWithTitle } = JSON.parse(fs.readFileSync(tempLogsPath, 'utf-8'))

octokit.repos.createRelease({
  owner: 'massgov',
  repo: 'mayflower',
  tag_name: minor,
  target_commitish: 'master',
  name: minor,
  body: newLogsWithTitle
})

fs.unlink(changeLogFilePath, (err) => {
  if (err) {
      console.log(`failed to delete tempLogs.json: ${err.toString()}`);
  } else {
      console.log('successfully deleted tempLogs.json');
  }
});
