#!/bin/bash
#
# Shared functions used when deploying Mayflower to Amazon S3
# -------------------------------------------------------------

# Steps to clean up after script execution
# Runs on success and failure.
function cleanup {
    # Remove temp directory
    line="Cleaning up tmp dir..."
    log "log" "$line";

    rm -rf ~/tmp/mayflower

    # Check out the previous branch
    line="Checking out your previous branch..."
    log "log" "$line";

    git checkout @{-1}
}

# Output success or error log during execution
function log {
    # parameters
    local theLogType=$1
    local theMessage=$2

    if [ "$theLogType" == "success" ]; then
        echo -e "\n\x1B[01;92m [success] "${theMessage}"\x1B[0m \n"
    elif [ "$theLogType" == "error" ]; then
        echo -e "\n\x1B[01;91m [error] "${theMessage}"\x1B[0m \n" >&2
    else
        echo -e "\n\x1B[01;34m [info] "${theMessage}"\x1B[0m \n"
    fi
}

# Determines if a build source is a prod tag (i.e. 5.10.0 with no letters)
function isProdTag {
    local theTag=$1

    if [[ ${theTag} =~ ^[0-9]+\.+[0-9]+\.+[0-9]+$ ]];
    then
        echo "true"
    else
        echo "false"
    fi
}

# Determines major version from a passed parameter (i.e. 5.10.0 -> 5)
function getMajorVersion {
    local theTag=$1

    if [[ $(isProdTag "$theTag") == "true" ]];
    then
        # Split the buildSrc by '.' and put into an array.
        IFS='.' read -ra VERSION <<< "$theTag";
        echo ${VERSION[0]}
    else
        echo "false";
    fi
}

# Validate the -b argument is an actual git branch or tag
function validateBuildSource {
    # parameters
    local buildSrc=$1

    # Validate build source environment argument exists
    if [ "$buildSrc" = false ];
    then
        line="Whoops, we need a git branch or tag name to checkout and build from [-b]."
        log "error" "$line";
        exit 1;
    fi

    # Validate that passed build source is a valid git branch or tag
    git rev-parse ${buildSrc} &>/dev/null
    if [ "$?" -ne 0 ];
    then
        line="Hmmm, couldn't find a branch/tag named ${buildSrc}... check spelling and make sure you've pulled it."
        log "error" "$line";
        exit 1;
    else
        line="Validated git build source: ${buildSrc}..."
        log "success" "$line";
    fi
}

# Check out the build source
function checkoutBuildSource {
    # parameters
    local buildSrc=$1

    line="Checking out the build source: ${buildSrc}"
    log "log" "$line";

    if ! git checkout ${buildSrc};
    then
        line="Could not check out $buildSrc, please make sure your working directory is clean and that you have fetched the latest from your remote."
        log "error" "$line";
        exit 1;
    fi
}

# Get to the styleguide directory
function cdStyleguide {
    # Get to styleguide directory (inside of repo root), does not assume repo root is "mayflower"
    line="Changing directory into <mayflower>/styleguide..."
    log "log" "$line";

    cd $(git rev-parse --show-toplevel)/styleguide
}

# Build patterns to generate prod static assets
function buildMayflower {
    line="Generating mayflower patterns..."
    log "log" "$line";
    export BASE_URL="$1"
    php core/console --generate >/dev/null

    line="Building mayflower static assets..."
    log "log" "$line";
    gulp prod >/dev/null
}
