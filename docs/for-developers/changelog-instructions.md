# Changelog Instructions

Mayflower keeps track of all notable changes in each release within [CHANGELOG.md](../../CHANGELOG.md). This changelog covers changes in all projects under the Maylflower monorepo and it's updated at the time of release from all files (except for [template.yml](../../changelogs/template.yml)) exist under the [changelog folder](../../changelogs).



## Add a changelog for your PR (mandatory)

Every PR must have a changelog file committed before getting merged into the `develop` branch. It's required for the every PR to have a changelog that comply with the format specified in [template.yml](../../changelogs/template.yml) in order to get compiled into the [CHANGELOG.md](../../CHANGELOG.md), using the [automated release script](../../scripts/compile-changelogs.js).

To add a changelog:
1. make a copy of [template.yml](../../changelogs/template.yml), name it with the ticket number, e.g. `DP-1234.yml`. If there is no ticket number for the contribution, just use the branch name, e.g. `awesome-feature-branch.md`.
2. Follow the instructions in the template file.
3. For any breaking changes, add a comment in the PR describing the necessary changes on the consumer side and link that comment in the changelog.
4. Commit the file and update your PR.

## Compile changelogs during release

See [Release Documentation](./release.md) on how changelogs get compiled during releases.
