# Mayflower

Mayflower is the enterprise design system for the Commonwealth of Massachusetts.

* *[Documentation](/docs)*: Documentation for the overall design system, including guiding principals.
* *Implementations*: Implementations of Mayflower in various languages and technologies. Each implementation has its own documentation explaining how to use and work with it.
  - *[Mayflower Patternlab](/patternlab)* [![GitHub version][patternlab-github-badge]](/patternlab)
  - *[Mayflower React](/react)* [![npm package][react-npm-badge]](npm)
* *[Mayflower Site](/site)*: Static homepage site that is built with Mayflower React and Gatsby. Live at [mayflower.digital.mass.gov](https://mayflower.digital.mass.gov)

## License

This project is licensed under the is licensed under the GNU General Public License v2.0 - see the [LICENSE.txt](LICENSE.txt) file for details.


[patternlab-github-badge]: https://badge.fury.io/gh/massgov%2Fmayflower.svg
[react-npm-badge]: https://img.shields.io/npm/v/@massds/mayflower-react.png
[npm]: https://www.npmjs.com/package/@massds/mayflower-react


## Continuous Integration using CircleCI
By default, each push to a remote branch will trigger build and visual regression tests for React Storybook and Patternlab, deploy the Patternlab site build bundle to S3, as well as run the distribution build for the mayflower-tokens package in the [assets](/assets) folder.
For efficiency purposes, we allow CircleCI to bypass certain jobs based on the prefix of the branch name. Please only use these prefixes for the following scenarios:

| Branch name prefix  | Rule | Scenario |
|---|---|---|
| `react/`  | This will by pass Patternlab build, deploy and visual regression tests | This prefix should only be used if all your changes are in the [react](/react) folder, and nothing in the shared [assets](/assets) folder that could potentially impact the build of the Patternlab implementation  |
| `pattern/`  | This will by pass React Storybook build and visual regression tests | This prefix should only be used if all your changes are in the [patternlab](/patternlab) folder, and nothing in the shared [assets](/assets) folder that could potentially impact the build of the React implementation  |
| `site/`  |   |   |
| `docs`  |   |   |
