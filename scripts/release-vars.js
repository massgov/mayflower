// Added shelljs to use maybe in the script "npm install shelljs"
// https://github.com/shelljs/shelljs
const shell = require('shelljs');

async function getOctokit() {
  const { Octokit } = await import('@octokit/rest');
  return new Octokit({
    auth: process.env.DANGER_GITHUB_API_TOKEN || process.env.GITHUB_TOKEN
  });
}

// Find out the latest release tag and display it in the command line.
const latest = shell.exec('git tag  | grep -E "^[0-9]" | sort -V | tail -1');

// Display the latest tag.
console.log(`Previous release tag: ${latest}`);


exports.getOctokit = getOctokit;
exports.latest = latest;
