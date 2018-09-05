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

This will run build-storybook followed by the backstop suites. This can have one of these outcomes:

1. All test pass -- nothing changed between your current branch and the reference images. Unlikely.
1. One or more tests fail -- expected if you changed how a component renders. Because the backstop command uses npm-run-all, the test run stop here with an error. Though the HTML report will not automatically open, you can review the report to decide if you're ready to approve the test images with:

   `open backstop/data/html_report/index.html`

## Screenshot Update Workflow:
When you are ready to commit your work, and all test screenshots look correct, you must update the reference screenshots with the new ones that reflect your changes.  To do that, run:

```bash
# Compare test screenshots of the current references.
npm run backstop
# Accept these screenshots as the new reference images.
npm run backstop:approve
# Add and commit them to the repo.
git add backstop/data/bitmaps_reference
git commit
```

If you wish to create new reference images (such as when creating new components) for tests, you can run the following, replacing ComponentName with the name of your component:
```bash
docker-compose run backstop reference --filter=<ComponentName>
```
This command may also be used to update any references that currently exist for any component. `--filter` will also work for the `backstop test` command like this: 
```bash
docker-compose run backstop test --filter=<ComponentName>
```
`<ComponentName>` can be replaced with things other than the name of the component, and filters through labels or url strings from scenarios.

Backstop also runs in CircleCI, so your build may fail if you do not update the reference screenshots when you push changes to github.
