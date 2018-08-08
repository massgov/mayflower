# Release to production
Mayflower release managers with the necessary repo permissions can follow these steps to deploy code to production (i.e. do a release).

*Note: the following steps assume that your local machine and repository is already set up and functioning according to our [Getting Started docs](../.github/CONTRIBUTING.md#getting-started).*



## Creating the release
### Patternlab

1. Check out the [massgov/mayflower `develop` branch](https://github.com/massgov/mayflower/commits/develop):
    1. `cd patternlab/styleguide`
    1. `git checkout develop`
    1. Pull the latest from upstream `git pull <remote> develop`.
    1. Run `npm install`
1. Create a release branch (at Noontime every Wednesday)
    1. `git checkout -b release-#.#.#` where `#.#.#` is the next version (i.e. `5.0.0`).  Read more about [Mayflower and semantic versioning](/docs/for-developers/versioning.md) to ensure that your are creating the right type of version.
    1. Add [change logs](https://github.com/massgov/mayflower/tree/develop/changelogs) to the top of [CHANGELOG.md](../CHANGELOG.md) based on the "changelog.txt" files, remove all the "changelog.txt" files and then commit these changes.
    1. Run `npm install` in case the release includes new packages.
    1. Update the version of the npm package by editing the `"version":` field in the following path `patternlab/styleguide/package.json` with `#.#.#` for the release.
    1. Commit your version change from `package.json`.

### React

1. We are tracking versions of this project in the package.json, which means when cutting a release we expect the main ``"version": "0.30.0"`` to be updated using proper [semantic versioning](https://semver.org/). So if we were releasing a bugfix or other minor improvement we would bump to ``0.30.1``, if we were releasing a new feature we would bump to ``0.31.0``, etc.


   #### Publish to NPM
   1. Update the version of the npm package by editing the `"version":` field in the following path `react/package.json` with `#.#.#` for the release.
   2. Update the version of the `package-lock.json` by running the following command: `npm install`
   3. Commit your version change from `package.json` and `package-lock.json`.

### Once you have completed changes to React and Patternlab

1. Push release branch to `massgov/mayflower` (i.e. `git push <remote> release-#.#.#`).

## Deployment  
1. Wait for [the circle build](https://circleci.com/gh/massgov/mayflower) to pass, which will deploy your release branch to staging automagically :).
1. Verify release notes against the site rendered at: `https://mayflower.digital.mass.gov/b/<your-release-branch>/index.html`. **Patternlab tickets only**
1. Smoke test Mayflower (a quick way to do this is to browse around to some of the different pages in the "pages" menu and do a quick gut check)
1. Open a Github Pull Request to merge (no squash!) the release branch into the `master` branch. To merge the release branch into `master` branch you will need a peer to review and approve the Pull Request. 
    1. Add the [CHANGELOG.md](../CHANGELOG.md) to the Pull Request.
    1. This is a great time to verify one more time that your release [is following semantic versioning](/docs/for-developers/versioning.md) properly (i.e. not pushing out breaking changes in a minor release).

## Create a tag
1. [Create a production release](https://help.github.com/articles/creating-releases/) off the `master` branch in GitHub:
    1. Tag version: `#.#.#` (your release number)
    1. **@ Target: `master`** <<<<<<- important! :)
    1. Release title: `#.#.#` (your release number)
    1. Describe the release: paste your release notes markdown here, after the release version/date line, add a link to the release PR (protip: type `#` and you'll get an autocomplete dropdown to get to your pr)
1. Wait for [the circle builds](https://circleci.com/gh/massgov/mayflower) to pass
1. Smoke test [Prod](https://mayflower.digital.mass.gov)
    - Make sure the home page reflects the date and version

## Post Deployment
1. Open a GitHub Pull Request to merge `master` into `develop` (this should only bring an updated `CHANGLOG.md`, `package.json`). You will need to have a peer review the Pull Request before merge (no squash!) into the `develop` branch.
1. In JIRA Go to the [DP project](https://jira.mass.gov/projects/DP/).
    1. Click on the Releases icon on the left side (it looks like a boat/ship).
    1. Add a new release version with today's date.
    1. Go to each shipped JIRA issue and update the Fix Version/s field.
1. Next steps in pulling the Mayflower tag into the Mass repository is documented within the [Updating the Mayflower Version](https://github.com/massgov/mass/wiki/Updating-the-Mayflower-Version).
1. Celebrate!!
