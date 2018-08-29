Visual Regression Testing
=========================

This repository uses [BackstopJS](https://garris.github.io/BackstopJS/) for visual regression testing! BackstopJS works by collecting *reference* images of Template and Page patterns.  Reference images are later compared to the current state after you make changes.

### Prerequisites:

* [Docker and Docker Compose](https://www.docker.com/community-edition#/download) must be installed.

## Backstop Test:

To check how your current work compares with the reference screenshots that are currently committed to the repository, run:

```bash
npm run backstop
```

This will run build-storybook followed by the two backstop suites. This can have one of these outcomes:

1. All test pass -- nothing changed between your current branch and the reference images. Unlikely.
1. One or more tests in "atoms" fail -- expected if you changed how an atom renders. Because the backstop command uses npm-run-all, the test run stop here with an error. Though the HTML report will not automatically open, you can review the report for atoms here to decide if you're ready to approve the test images with:

   `open backstop/data/html_report/index.html`
1. One or more tests in "other" fail -- expected if you changed how a non-atom component renders.

**NOTE: if any test fails in "atoms" see "Running tests in isolation" below.** You may wish to run tests in isolation in order to view the report for "other" or just to skip re-building storybook-static on every run.

## Screenshot Update Workflow:
When you are ready to commit your work, and all test screenshots look correct, you must update the reference screenshots with the new ones that reflect your changes.  To do that, run:

```bash
# Capture test screenshots of the current state.
npm run backstop
# Accept these screenshots as the new reference images.
npm run backstop:approve
# Add and commit them to the repo.
git add backstop/data/bitmaps_reference
git commit
```

Backstop also runs in CircleCI, so your build may fail if you do not update the reference screenshots when you push changes to github.

### Running tests in isolation
To isolate one of the suites for verification or troubleshooting, you can run them individually:

Note: any time you change mayflower/react, you must re-run build-storybook or backstop could be making screenshots from an outdated build.

```bash
npm run backstop:atoms
open backstop/data/html_report/index.html
# Note: The following will overwrite the HTML report.
# If you are working on changes to atoms, stop here to view the report.
npm run backstop:other
open backstop/data/html_report/index.html
```
