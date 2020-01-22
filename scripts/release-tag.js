const { newLogsWithTitle, octokit, minor } = require('./release-branch');

console.log(newLogsWithTitle)

octokit.repos.createRelease({
  owner: 'massgov',
  repo: 'mayflower',
  tag_name: minor,
  target_commitish: 'master',
  name: minor,
  body: newLogsWithTitle
})
