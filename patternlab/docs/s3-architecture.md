# Mayflower / Amazon S3 Architecture

We host Mayflower (i.e. the static output of a Pattern Lab “build”) in an amazon s3 bucket, at which we point mayflower.digital.mass.gov.  The table below describes our architecture for the various bucket sub folders.


|mayflower.digital.mass.gov paths|
|---|

|Name|URL path|Example|Purpose|What code gets deployed here?|When does code get deployed here?|How does code get deployed here?|Permanent or temporary?|
|---|---|---|---|---|---|---|---|
|**Production**|/|mayflower.digital.mass.gov/|The latest and greatest version of Mayflower.  Mostly used for browsing and (soon) implementation documentation from the home page.|Pattern Lab build artifacts from a production tag (i.e. 5.10.0) cut off master branch..|During the release process, when a release branch is merged into master.|Release manager executes a script command.  See release docs.|Permanent (and dynamic, i.e. the contents change when a new release is deployed here)|
|**Latest minor**|/v/<current-major-#>/|/v/5/|The latest minor version within a given major: implementers who link to these css/js/font/icon assets get safe updates automatically|Pattern Lab build artifacts from a production tag (i.e. 5.10.0) cut off master branch. Note: if the production tag starts a new major release, then a new /<current-major-#> directory will be created automatically.|During the release process, when a release branch is merged into master.|Release manager executes a script command.  See release docs.|Permanent (and dynamic, i.e. the contents change when a new release is deployed here)|
|**Staging**|/b/release-#.#.#/|/b/release-5.11.0/|A given release branch; used to stage an upcoming release for functional / integration testing.|Pattern Lab build artifacts from the release branch.|When a release branch (which has an open PR) has a new commit pushed.|CircleCI deploys as part of build for the release branch.|Temporary (can be deleted when the release testing is done) @TODO script this|
|**Dev**|/b/dev/|/b/dev/|Bleeding edge of our codebase; used for browsing all of the code that has been merged into dev branch prior to release.|Pattern Lab build artifacts from the dev branch. |When a feature PR is squashed and merged into dev branch.|CircleCI deploys as part of build for the  dev branch.|Permanent (and dynamic, i.e. the contents change when new work is merged in)|
|**Feature branch**|/b/<my-branch-name>/|/b/DP-1234-my-ticket/|The feature development done on a particular branch; used for internal and external review functional tests.|Pattern Lab build artifacts from the feature branch.|When a feature branch (which has an open PR) has a new commit pushed.|CircleCI deploys as part of build for the feature branch.|Temporary (can be deleted when the feature testing is done) @TODO script this
