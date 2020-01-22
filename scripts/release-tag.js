const { octokit, minor } = require('./release-vars');
const { newLogsWithTitle } = require('./consolidate-changelogs');

octokit.repos.createRelease({
  owner: 'massgov',
  repo: 'mayflower',
  tag_name: minor,
  target_commitish: 'master',
  name: minor,
  body: newLogsWithTitle
})
