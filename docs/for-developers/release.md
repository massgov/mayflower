# Mayflower Release

Mayflower Release involves cutting a Github tag following [Semantic Versioning](./versioning.md) leveraging CircleCI with these [scripts](/scripts). The release entails:
- Build and publish the [@massds/mayflower-tokens]() NPM packages
- Build and publish the [@massds/mayflower]() NPM package
- Build and publish the [@massds/mayflower-react]() NPM package

Mayflower releases are automated using CircleCI and it's scheduled for every Tuesday at 1pm (EST). During this process, [compile-changelogs](../../scripts/compile-changelogs.js) gets triggered on the release branch, and all files under the [changelog folder](../../changelogs) gets compiled and added to [CHANGELOG.md](../../CHANGELOG.md).

In a case that a manual release is needed, run `$ node scripts/release-branch.js`  on the `develop` branch and a release branch will be created with changelogs compiled and changes committed. More release documentation to come.


## Auto Release

## Creating a Hotfix

## Creating a Manual Release

keeps track of all notable changes in each release within [CHANGELOG.md](../../CHANGELOG.md). This changelog covers changes in all projects under the Maylflower monorepo and it's updated at the time of release from all files (except for [template.yml](../../changelogs/template.yml)) exist under the [changelog folder](../../changelogs).
