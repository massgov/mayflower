#!/usr/bin/env bash

git subtree pull --prefix=react/ git@github.com:massgov/mayflower-react.git develop
git subtree pull --prefix=patternlab/ git@github.com:massgov/mayflower.git dev
git subtree pull --prefix=docs/ git@github.com:massgov/mayflower-doc.git master