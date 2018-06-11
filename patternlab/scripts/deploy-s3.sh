#!/bin/bash
# include shared functions
. ../scripts/deploy-s3-functions.sh

# Deploying a branch or tag Mayflower to Amazon S3:
#   mayflower.digital.mass.gov/git-branch-or-tag-name/
# -----------------------------------------------------
#
# Run from /styleguide, must have a clean working directory.
#
# Usage:
# ../scripts/deploy-s3.sh [-b (git-branch-or-tag)]
#   -b Build source: the git branch or tag from which to build (deploys to subdirectory named by that branch or tag) (required)
#
# Description:
# 1. Validate the passed arguments: build source
# 2. Attempt to checkout passed build source
# 3. Get to mayflower/styleguide directory
# 4. Build pattern lab static assets
# 5. Copy static assets (build output: styleguide/public/) into a new temp directory
# 6. Execute gulp command to deploy to s3
# 7. Remove the temp directory
# 8. Check out the previous branch

# Default variables
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

# 1. Validate build source environment argument exists and is valid git branch or tag name
validateBuildSource "$buildSrc"

# 2. Checkout the build source
checkoutBuildSource "$buildSrc"

line="You've indicated a deploy to mayflower.digital.mass.gov/${buildSrc}"
log "log" "$line";

# 3. Get to styleguide directory
cdStyleguide

# 4. Build pattern to generate prod static assets
buildMayflower "https://mayflower.digital.mass.gov/$buildSrc"

# 5. Copy built assets in /public into new tmp directory
# Make temp directory to copy public assets
line="Making ~/tmp/mayflower/$subDir directory..."
log "log" "$line";

if [ -d "~/tmp" ];
then
    mkdir ~/tmp/mayflower
    mkdir ~/tmp/mayflower/${subDir}
else
    mkdir ~/tmp
    mkdir ~/tmp/mayflower
    mkdir ~/tmp/mayflower/${subDir}
fi

# Copy
line="Copying Pattern Lab build output to ~/tmp/mayflower/$subDir directory..."
log "log" "$line";
cp -r public/. ~/tmp/mayflower/${subDir} >/dev/null

# 7. Run gulp task to deploy to s3 bucket
line="Uploading contents of ~/tmp/mayflower/$subDir to Mayflower s3 bucket..."
log "log" "$line";
if ! gulp s3; then
    line="gulp s3 task failed"
    log "error" "$line";
    exit 1;
else
    line="Woo-hoo! The deploy completed successfully.\n\n    You should be able to browse to your deployed code at:\n\n     https://mayflower.digital.mass.gov/${subDir}/"
    log "success" "$line";
fi

# 8. Clean up tmp directory + #9 get back to where we want to be.
cleanup
