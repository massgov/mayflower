const { octokit, minor } = require('./release-vars');
const fs = require('fs');
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
