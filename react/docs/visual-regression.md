Visual Regression Testing
=========================

This repository uses [BackstopJS](https://garris.github.io/BackstopJS/) for visual regression testing! BackstopJS works by collecting *reference* images of Template and Page patterns.  Reference images are later compared to the current state after you make changes.

### Prerequisites:

* [Docker and Docker Compose](https://www.docker.com/community-edition#/download) must be installed.

### Workflow:
First, ensure you've run a mayflower-react build.

```bash
npm run build-storybook
```

Then, to check how your current work compares with the reference screenshots that are committed to the repository, run the following:

```bash
docker-compose run backstop test --atoms
open backstop/data/html_report/index.html
# Note: The following will overwrite the HTML report. If you are working on changes to atoms, stop here to view the report.
docker-compose run backstop test
open backstop/data/html_report/index.html
```

When you are ready to commit your work, you will want to update the reference screenshots with the new ones that reflect your changes.  To do that, run:

```bash
# Capture screenshots of the current state.
docker-compose run backstop test --atoms
docker-compose run backstop test
# Accept these screenshots as the new references.
docker-compose run backstop approve --atoms
docker-compose run backstop approve
git add backstop/data/bitmaps_reference
git commit
```

Backstop also runs in CircleCI, so your build may fail if you do not update the reference screenshots when you push changes to github.
