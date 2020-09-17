#!/bin/bash
# include shared functions
. ../scripts/deploy-s3-functions.sh

# Deploying a branch or tag Mayflower to Amazon S3:
#   mayflower.digital.mass.gov/git-branch-or-tag-name
# -----------------------------------------------------
#
# Run from /styleguide, must have a clean working directory.
#
# Usage:
# ../scripts/deploy-npm.sh [-b (git-branch-or-tag)]
#   -b Build source: the git branch or tag from which to build (required)
#
# Description:
# 1. Validate the passed arguments: build source
# 2. Attempt to checkout passed build source
# 3. Get to mayflower/styleguide directory
# 4. Build pattern lab static assets
# 5. Copy static assets (build output: styleguide/public/assets) into tmp/mayflower directory
# 6. Copy other NPM goodies (README, npmignore, etc.) to tmp/mayflower directory
# 7. Package assets and deploy NPM package
# 8. Remove the temp directory
# 9. Check out the previous branch

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
validateBuildSource

# 2. Checkout the build source
checkoutBuildSource

# Confirm authentication if a human is executing this script.
if [ ! CIRCLECI ];
then
    read -p "In order to push the mayflower package to NPM, you need to be authenticated on NPM, either by: \n\n1) Having an .npmrc file with credentials for the @massds account (or your own NPM account if you're added to the Mayflower package as an owner) in your Mayflower repo root (this file is not and should not be versioned -- ask a team member for credentials)\nSee: https://docs.npmjs.com/files/npmrc#per-project-config-file\n\n2) Having an NPM_TOKEN having environment variable for @massds\nSee: http://blog.npmjs.org/post/118393368555/deploying-with-npm-private-modules \n\n3) Authenticating from the npm CLI (Note: you must be added to the Mayflower NPM package project as an owner -- ask a team member for help)\n See: https://docs.npmjs.com/getting-started/publishing-npm-packages#preparation \n\n\nAre you sure you want to proceed? [y/n] " -n 1 -r
    echo    # move to a new line
    if [[ ! $REPLY =~ ^[Yy]$ ]];
    then
        line="No sweat! Just let a MassDS know that you need help pushing the latest Mayflower up to NPM."
        log "error" "$line";
        exit 1;
    fi
fi

line="You've indicated a deploy to npm @${buildSrc}"
log "log" "$line";

# 3. Get to styleguide directory
cdStyleguide

# 4. Build pattern to generate prod static assets
buildMayflower

# 5. Copy built assets in /public into new tmp directory
# Make temp directory to copy public assets
line="Making ~/tmp/mayflower/npm directory..."
log "log" "$line";

if [ -d "~/tmp" ];
then
    mkdir ~/tmp/mayflower
else
    mkdir ~/tmp
    mkdir ~/tmp/mayflower
fi

# 6. Copy package assets to temp directory
line="Copying compiled Mayflower npm package assets to ~/tmp/mayflower directory..."
log "log" "$line";
cp -r public/assets/. ~/tmp/mayflower >/dev/null
cp package.json ~/tmp/mayflower
cp npm-shrinkwrap.json ~/tmp/mayflower
cp ../README.md ~/tmp/mayflower
cp ../LICENSE.txt ~/tmp/mayflower
cp -a ./.npmignore ~/tmp/mayflower
cp -a ./.npmrc ~/tmp/mayflower

# Get to tmp directory
line="Moving into ~/tmp/mayflower directory..."
log "log" "$line";
cd ~/tmp/mayflower

# 7. Run npm pack to test
# npm pack

# 7. Package and deploy NPM
line="Publishing contents of ~/tmp/mayflower to Mayflower npm package..."
log "log" "$line";

if ! npm publish --access=public; then
    line="npm publish failed"
    log "error" "$line";
    exit 1;
else
    line="Woo-hoo! The deploy completed successfully.\n\n    You should be able to browse to your npm package at:\n\n     https://www.npmjs.com/package/@massds/mayflower"
    log "success" "$line";
fi

# 8. Clean up tmp directory + #9 get back to where we want to be.
cleanup
