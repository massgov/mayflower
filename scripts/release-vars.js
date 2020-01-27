// Added semver to use for increment the version "npm install semver"
// https://github.com/npm/node-semver
const semver = require('semver');
// Added shelljs to use maybe in the script "npm install shelljs"
// https://github.com/shelljs/shelljs
const shell = require('shelljs');

const Octokit = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.DANGER_GITHUB_API_TOKEN
});

// Find out the latest release tag and display it in the command line.
const latest = shell.exec('git tag  | grep -E "^[0-9]" | sort -V | tail -1');

// Display the latest tag.
console.log(`Display the latest tag: ${latest}`);

// Increment the release branch.
const minor = semver.inc(latest.toString(), 'minor');

// Print out the new minor version
console.log(`New release tag: ${minor}`);


exports.octokit = octokit;
exports.minor = minor;
