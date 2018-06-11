# Release to production
Mayflower release managers with the necessary repo permissions can follow these steps to deploy code to production (i.e. do a release).

*Note: the following steps assume that your local machine and repository is already set up and functioning according to our [Getting Started docs](../.github/CONTRIBUTING.md#getting-started).*

## Communicate to the team
1. If there is new code to be delivered, notify the team at least two hours ahead of time that a release is coming. Follow the [Communicate Releases](https://wiki.state.ma.us/display/massgovredesign/Communicating+Releases) instructions for Upcoming Deployments.

## Creating the release
1. Check out the [massgov/mayflower `dev` branch](https://github.com/massgov/mayflower/commits/dev):
    1. `git checkout dev`
    1. Pull the latest from upstream `git pull <remote> dev`.
    1. `cd styleguide`
1. Create a release branch
    1. `git checkout -b release-#.#.#` where `#.#.#` is the next version (i.e. `5.0.0`).  Read more about [Mayflower and semantic versioning](docs/versioning.md) to ensure that your are creating the right type of version.
    1. Add [release notes](https://github.com/massgov/mayflower/blob/dev/docs/change-log-instructions.md) to the top of [release notes](/release-notes.md) based on the "changelog.txt" files, remove all the "changelog.txt" files and then commit these changes.
    1. Run `npm install` in case the release includes new packages.
    1. Update the version of the npm package by editing the `version` field in the `package.json` with `#.#.#` for the release.
    1. Commit your version change from `package.json`.
    1. Push release branch to `massgov/mayflower` (i.e. `git push <remote> release-#.#.#`). 

## Deployment  
1. Wait for [the circle build](https://circleci.com/gh/massgov/mayflower) to pass, which will deploy your release branch to staging automagically :).
1. Verify release notes against the site rendered at: `https://mayflower.digital.mass.gov/b/<your-release-branch>/index.html`.
1. Smoke test Mayflower (a quick way to do this is to browse around to some of the different pages in the "pages" menu and do a quick gut check)
1. Open a Github Pull Request to merge (no squash!) the release branch into the `master` branch.
    1. Add the relevant release notes to the PR notes.
    1. This is a great time to verify one more time that your release [is following semantic versioning](versioning.md) properly (i.e. not pushing out breaking changes in a minor release).

## Create a tag
1. [Create a production release](https://help.github.com/articles/creating-releases/) off the `master` branch in GitHub:
    1. Tag version: `#.#.#` (your release number)
    1. **@ Target: `master`** <<<<<<- important! :)
    1. Release title: `#.#.#` (your release number)
    1. Describe the release: paste your release notes markdown here, after the release version/date line, add a link to the release PR (protip: type `#` and you'll get an autocomplete dropdown to get to your pr)
1. Wait for [the circle builds](https://circleci.com/gh/massgov/mayflower) to pass
1. Smoke test [Prod](http://mayflower.digital.mass.gov)
    - Make sure the home page reflects the date and version

## Post Deployment
1. Open a GitHub Pull Request to merge `master` into `dev` (this should only bring an updated `release-notes.md`, `package.json`). If a feature was reverted on the release branch, have a peer do the merge after a review.
1. In JIRA Go to the [DP project](https://jira.state.ma.us/projects/DP/).
    1. Click on the Releases icon on the left side (it looks like a boat/ship).
    1. Add a new release version with today's date.
    1. Go to each shipped JIRA issue and update the Fix Version/s field.
    1. Go to the list of issues contained within the release version and copy the URL (link to this issue from release notes).
1. Follow the [Communicate Releases](https://wiki.state.ma.us/display/massgovredesign/Communicating+Releases) instructions for Deployment Completed to email Release Notes to the team.
1. Celebrate!!
