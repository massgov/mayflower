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
By default, each push to a remote branch will trigger build and tests for React Storybook and Patternlab, deploy the Patternlab site build bundle to S3, as well as run the distribution build for the mayflower-tokens package in the [assets](/assets) folder.
For efficiency purposes, we allow CircleCI to bypass certain jobs based on the prefix of the branch name. Please only use these prefixes for the following scenarios:

| Branch name prefix  | Rule | Scenario |
|---|---|---|
| `react/`  | This will bypass Patternlab build, deploy and tests | This prefix should only be used if all your changes are in the [react](/react) folder, and nothing in the shared [assets](/assets) folder that could potentially impact the build of the Patternlab implementation  |
| `pattern/`  | This will bypass React Storybook build and tests | This prefix should only be used if all your changes are in the [patternlab](/patternlab) folder, and nothing in the shared [assets](/assets) folder that could potentially impact the build of the React implementation  |
| `site/`  | This will bypass all React and Patternlab and assets build, deploy and tests. |  Only use this prefix if all the changes are in the [site](/site) folder. e.g. Content changes to the homepage site that won't impact React, Patternlab and shared assets. |
| `docs`  | This will bypass all React and Patternlab and assets build, deploy and tests, as well as Mayflower site build and tests. | Only use this prefix if all the changes are in the [docs](/docs) folder. e.g. Documentation changes for the repo and the Mayflower Gitbook that won't impact React, Patternlab, shared assets and the homepage static site. |

## Useful Commands

### Mayflower Assets
| Task | Command |
|---|---|
| Install packages  | `npm run install:assets`  |
| Linting  | `npm run lint:assets`  or  `npm run lint-fix:assets` |


### Mayflower React
| Task | Command |
|---|---|
| Install packages  | `npm run install:assets`  |
| Link to mayflower-assets | `npm run yalc-link:react`  |
| Develop  | `npm run develop:react` |
| Build mayflower-react package | `npm run build:react` |
| Build Storybook site | `npm run build:react-storybook` |
| Run visual regression tests | `backstop:react:test`, `backstop:react:report`, `backstop:react:approve`  |
| Linting  | `npm run lint:react`  or  `npm run lint-fix:react` |

### Mayflower Patternlab

| Task | Command |
|---|---|
| Install packages  | `npm run install:assets`  |
| Link to mayflower-assets | `npm run yalc-link:patternlab`  |
| Develop  | `npm run develop:patternlab` |
| Build Patternlab site and artifacts package | `npm run build:patternlab` |
| Run visual regression tests | `backstop:patternlab:test`, `backstop:patternlab:report` `backstop:patternlab:approve`  |
| Linting  | `npm run lint:patternlab`  or  `npm run lint-fix:patternlab` |

### Mayflower Site
| Task | Command |
|---|---|
| Install packages  | `npm run install:assets`  |
| Link to mayflower-assets and mayflower-react | `npm run yalc-link:site`  |
| Develop  | `npm run develop:site` |
| Build mayflower Gatsby site | `npm run build:site` |
| Linting  | `npm run lint:site`  or  `npm run lint-fix:site` |
