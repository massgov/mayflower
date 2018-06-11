#!/bin/bash
# include shared functions
. ../scripts/deploy-s3-functions.sh

# Deploying the latest production release of Mayflower to Amazon S3:
#   mayflower.digital.mass.gov/
# --------------------------------------------------------------
#
# Run from /styleguide, must have a clean working directory.
#
# Usage:
# ../scripts/deploy-prod-s3.sh [-b (git-branch-or-tag)]
#   -b Build source: the git branch or tag from which to build (required)
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
validateBuildSource "$buildSrc"

# Confirm production deploy if a human is executing this script.
if [ ! CIRCLECI ];
then
    read -p "This script executes a deploy to production, which will update the content at mayflower.digital.mass.gov.\n\nAre you sure you want to proceed? [y/n] " -n 1 -r
    echo    # move to a new line
    if [[ ! $REPLY =~ ^[Yy]$ ]];
    then
        line="Aborting deploy..."
        log "error" "$line";
        exit 1;
    fi
fi

# Validate that we have a production tag (i.e. 5.10.0)
line="Validating that ${buildSrc} is a prod tag..."
log "log" "$line";

if [[ $(isProdTag "$buildSrc") == "true" ]];
then
    line="Nice! ${buildSrc} appears to be a prod tag."
    log "success" "$line";
else
    line="Your build source doesn't appear to be a prod tag.  Please run the script again and pass the -b argument your desired production tag (i.e. 5.10.0)"
    log "error" "$line";
    exit 1;
fi

# 2. Checkout the build source
checkoutBuildSource "$buildSrc"

# 3. Get to styleguide directory
cdStyleguide

# 5. Build pattern to generate prod static assets
buildMayflower "https://mayflower.digital.mass.gov"

# 6. Copy built assets in /public into new tmp directory
# Make temp directory to copy public assets
line="Making ~/tmp/mayflower directory..."
log "log" "$line";

if [ -d "~/tmp" ];
then
    mkdir ~/tmp/mayflower
else
    mkdir ~/tmp
    mkdir ~/tmp/mayflower
fi

# Copy
line="Copying Pattern Lab build output to ~/tmp/mayflower directory..."
log "log" "$line";
cp -r public/. ~/tmp/mayflower >/dev/null

# 7. Run gulp task to deploy to s3 bucket
line="Uploading contents of ~/tmp/mayflower to Mayflower s3 bucket..."
log "log" "$line";
if ! gulp s3; then
    line="gulp s3 task failed"
    log "error" "$line";
    exit 1;
else
    line="Woo-hoo! The deploy completed successfully.\n\n    You should be able to browse to your deployed code at:\n\n    https://mayflower.digital.mass.gov/"
    log "success" "$line";
fi

# 8. Clean up tmp directory + #9 get back to where we want to be.
cleanup
