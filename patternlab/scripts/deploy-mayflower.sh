#!/bin/bash
# include shared functions
. ../scripts/deploy-s3-functions.sh

# Deploys the latest production release of Mayflower to Amazon S3 and push the NPM package:
# --------------------------------------------------------------
#
# Run from /styleguide, must have a clean working directory.
#
# Usage:
# ../scripts/deploy-mayflower.sh [-b (git-branch-or-tag)]
#   -b Build source: the git branch or tag from which to build (required)
#
# Description:
# 1. Validate the passed arguments: build source
# 2. Execute ./scripts/deploy-s3.sh with release tag (deploys to mayflower.digital.mass.gov/#.#.#/)
# 3. Execute ./scripts/deploy-latest-minor-s3.sh with release tag (deploys to mayflower.digital.mass.gov/#/)
# 4. Execute ./scripts/deploy-prod-s3.sh with release tag (deploys to mayflower.digital.mass.gov)
# 5. Execute ./scripts/deploy-npm.sh with release tag (pushes package to https://www.npmjs.com/package/@massds/mayflower)

# Default argument values
buildSrc=false

# Get passed arguments
while getopts :b: option
do
    case "${option}" in
        b) buildSrc=${OPTARG};;
        : ) line="Missing argument for parameter [-${OPTARG}]";
              log "error" "$line";
              exit 1;;
        \? ) line="Whoops, this script only accepts arguments for: git build branch/tag [-b]";
             log "error" "$line";
             exit 1;;
    esac
done

# 1. Validate build source environment argument exists and is valid git branch or tag
validateBuildSource

# Get to <repo root>/styleguide
cdStyleguide

# 2. Deploy tag to mayflower.digital.mass.gov/#.#.#/ where #.#.# is your tag version
# Execute shell script in a different process (see: http://www.lostsaloon.com/technology/how-to-call-shell-script-sh-file-from-another-shell-script/)
if ! ../scripts/deploy-s3.sh -b ${buildSrc}; then
line="Hmmm looks like the deploy to mayflower.digital.mass.gov/<your-tag-name>/ failed.  Hopefully you got a helpful error message from the script execution output."
    log "error" "$line";
    exit 1;
else
    line="Moving on to execute deploy to mayflower.digital.mass.gov/<current-major>/..."
    log "log" "$line";
fi

# Get to <repo root>/styleguide
cdStyleguide

# 3. Deploy tag to mayflower.digital.mass.gov/#/ where # is the current major version
# Execute shell script in a different process (see: http://www.lostsaloon.com/technology/how-to-call-shell-script-sh-file-from-another-shell-script/)

if ! ../scripts/deploy-latest-minor.sh -b ${buildSrc}; then
line="Hmmm looks like the deploy to mayflower.digital.mass.gov/<current-major>/ failed.  Hopefully you got a helpful error message from the script execution output."
    log "error" "$line";
    exit 1;
else
    line="Moving on to execute deploy to mayflower.digital.mass.gov..."
    log "log" "$line";
fi

# Get to <repo root>/styleguide
cdStyleguide

# 4. Deploy tag to mayflower.digital.mass.gov
# Execute shell script in a different process (see: http://www.lostsaloon.com/technology/how-to-call-shell-script-sh-file-from-another-shell-script/)

if ! ../scripts/deploy-prod-s3.sh -b ${buildSrc}; then
line="Hmmm looks like the deploy to mayflower.digital.mass.gov failed.  Hopefully you got a helpful error message from the script execution output."
    log "error" "$line";
    exit 1;
else
    line="Moving on to execute package and push to https://www.npmjs.com/package/@massds/mayflower..."
    log "log" "$line";
fi

# Get to <repo root>/styleguide
cdStyleguide

# 5. Package contents and push to NPM
# Execute shell script in a different process (see: http://www.lostsaloon.com/technology/how-to-call-shell-script-sh-file-from-another-shell-script/)

../scripts/deploy-npm.sh -b ${buildSrc}
