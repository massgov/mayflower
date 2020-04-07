# Mayflower Release

Mayflower Release involves cutting a Github tag following [Semantic Versioning](./versioning.md) leveraging CircleCI with these [scripts](/scripts). The release entails:

- Build and publish the [@massds/mayflower-tokens](https://www.npmjs.com/package/@massds/mayflower-tokens) NPM packages
- Build and publish the [@massds/mayflower](https://www.npmjs.com/package/@massds/mayflower) NPM package
- Build and publish the [@massds/mayflower-react](https://www.npmjs.com/package/@massds/mayflower-react) NPM package
- Build and publish the [@massds/mayflower-react](https://www.npmjs.com/package/@massds/mayflower-react) NPM package
- Build and publish the [massgov/mayflower-artifacts](https://packagist.org/packages/massgov/mayflower-artifacts) PHP package
- Build, test and deploy the [Mayflower homepage site](https://mayflower.digital.mass.gov/)
- Build, test and deploy the [Patternlab site](https://mayflower.digital.mass.gov/patternlab)
- Build, test and deploy the [Storybook site](https://mayflower.digital.mass.gov/react)
- Deploy to documentation to the [Mayflower Gitbook](https://mayflower.digital.mass.gov/docs)


## Auto Release
Mayflower releases are automated using CircleCI and it's scheduled for every Monday at 2pm (EDT). During this process, [compile-changelogs](../../scripts/compile-changelogs.js) gets triggered on the release branch, and all files under the [changelog folder](../../changelogs) gets compiled and added to [CHANGELOG.md](../../CHANGELOG.md).


## Creating a Hotfix
To do a hotfix directly into master:
1. Create a hotfix branch with the prefix `hotfix/`.
2. After committing your changes, create a Pull Request into the `master` branch.
3. Add a changelog following the [changelog template](/changelogs/template.yml).
4. Run script `node scripts/compile-changelogs` from the repo root.
5. Commit the changes and push up to the remote hotfix branch.

## Creating a Manual Release

In a case that a manual release is needed, run `$ node scripts/release-branch.js`  on the `develop` branch and a release branch will be created with changelogs compiled and changes committed. More release documentation to come.


keeps track of all notable changes in each release within [CHANGELOG.md](../../CHANGELOG.md). This changelog covers changes in all projects under the Maylflower monorepo and it's updated at the time of release from all files (except for [template.yml](../../changelogs/template.yml)) exist under the [changelog folder](../../changelogs).
