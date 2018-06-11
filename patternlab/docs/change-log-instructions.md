# Change Log Instructions

This documentation outlines a simple series of steps to keep `release-notes.md` up-to-date, avoid merge conflicts, and better surface post deply steps.

## Dev: Before You Submit a PR for a Feature Branch or Hot Fix

1. Make a copy of `changelogs/template.txt` with the ticket number as the name (example: `DP-1234.txt`). If there is no ticket number for the contribution, just use the branch name and your initials (`awesome- feature-branch.txt`).
1. Write a plain language description of the feature you're contributing. It needs to include the name, what changed, and who it impacts.
1. Write down any post deploy steps that need to be performed (Examples: `This change will effect the local build. Make sure all developers know what steps to take after this gets in to dev`).
1. Commit the file and open your PR.

## Release Master: When you are Releasing

Do this after your open your release branch:

1. In `release-notes.md`, create a new section for the release with "Added", "Changed", and "Removed" sub-sections.
1. Go through each `changelogs/*.txt` file and copy the description into the appropriate sub-section of `release-notes.md`.
1. Keep a list of post deployment steps handy for yourself. 
1. After the last description is copied and you have all the post deployment steps, delete all files in `changelogs/` except for `changelogs/template.txt.`
1. Commit changes to the release branch.
