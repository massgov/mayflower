# Changelog Instructions

This documentation outlines a simple series of steps to keep `CHANGELOG.md` up-to-date, avoid merge conflicts, and better surface post deply steps.

## Dev: Before You Submit a PR for a Feature Branch or Hot Fix

1. Make a copy of `changelogs/template.md` with the ticket number as the name, e.g. `DP-1234.md.` If there is no ticket number for the contribution, just use the branch name and your initials, e.g. `awesome- feature-branch.md`.
2. Write a plain language description of the feature you're contributing. It needs to include the project prefix, component name, what changed, and who it impacts.
3. Write down any post deploy steps that need to be performed, e.g.
> This change will effect the local build. Make sure all developers know what steps to take after this gets in to dev.

4. For any breaking changes, add a comment in the PR describing the necessary changes on the consumer side and link that comment in the changelog.
5. Commit the file and open your PR.

## Release Master: When you are Releasing

Do this after your open your release branch:

1. In `CHANGELOG.md`, create a new section for the release with "Added", "Changed", and "Removed" sub-sections.
2. Go through each `changelogs/*.md` file and copy the description into the appropriate sub-section of `CHANGELOG.md`.
3. Keep a list of post deployment steps handy for yourself.
4. After the last description is copied and you have all the post deployment steps, delete all files in `changelogs/` except for `changelogs/template.md`.
5. Commit changes to the release branch.
