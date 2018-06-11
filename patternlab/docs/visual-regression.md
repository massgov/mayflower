Visual Regression Testing
=========================

This repository uses [BackstopJS](https://garris.github.io/BackstopJS/) for visual regression testing! BackstopJS works by collecting *reference* images of Template and Page patterns.  Reference images are later compared to the current state after you make changes.

### Prerequisites:

* [Docker and Docker Compose](https://www.docker.com/community-edition#/download) must be installed.

### Workflow:
First, ensure you've run a pattern lab build.
Then, to check how your current work compares with the reference screenshots that are committed to the repository, run the following:

```bash
docker-compose run backstop test
open backstopjs/reports/html/index.html
```

When you are ready to commit your work, you will want to update the reference screenshots with the new ones that reflect your changes.  To do that, run:

```bash
docker-compose run backstop test # Capture screenshots of the current state
docker-compose run backstop approve # Accept these screenshots as the new references.
git add backstopjs/references
git commit -m "Updating reference screenshots"
```

Backstop also runs in CircleCI, so your build may fail if you do not update the reference screenshots when you make changes.
