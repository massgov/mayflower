# Mayflower-React
[![npm package][npm-badge]][npm]

Mayflower-react is a React component library under the [enterprise design system for the Commonwealth of Massachusetts][mayflower-doc].

- **Live demo:** [mayflower-react storybook][react-storybook]
- **NPM package:** [@massds/mayflower-react][npm].
- **Codebase:** [Mayflower monorepo][mayflower-github] `react` subdirectory
  >[Mayflower monorepo][mayflower-github] comprised of [Mayflower documentation][mayflower-doc], two component libraries — [Mayflower React][react-storybook] and [Mayflower PatternLab][patternLab], and their [shared assets][shared-assets].
  > Refer to [Mayflower PatternLab Static Site][patternlab] for the set of UI components consumed in Mass.gov.


## Using Mayflower-React in Your Project
1. Install mayflower-react and mayflower-assets into your project dependency:
```javascript
npm i @massds/mayflower-react @massds/mayflower-assets --save
```
2. Import components into your App:
```javascript
import { Header, Footer, Button } from '@massds/mayflower-react';
// You can also directly point to each component's path:
import Header from '@massds/mayflower-react/dist/Header';
import Footer from '@massds/mayflower-react/dist/Footer';
import Button from '@massds/mayflower-react/dist/Button';
```
3. Render components:
```javascript
<Button text="Button" onClick={() => console.log('mayflower button clicked!')} />
```

As of version 10.x, `mayflower-react` styles come directly from the `mayflower-assets` package. Each component has been documented with the exact scss files from mayflower-assets you need to include in your project for it to render the same as the [Mayflower React Storybook][react-storybook]:
```javascript
/**
 * Example pulled from ButtonAlert module.
 * @module @massds/mayflower-react/ButtonAlert
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
```
Version 10.x of mayflower-react has also removed the `es/` and `lib/` directories. Instead, the ES5 and ES6 versions live in the same directory of the component as `index.js` and `index.mjs` respectively:
```javascript
// This is the ES5 version.
import { Button } from '@massds/mayflower-react';
import Button from '@massds/mayflower-react/dist/Button';

// This is the ES6 version.
import { Button } from '@massds/mayflower-react/index.mjs';
import Button from '@massds/mayflower-react/dist/Button/index.mjs';
```
Mayflower React v10.x has its module entry point set to `dist/index.mjs`, so if your project is set to use ES Modules, importing from `@massds/mayflower-react` will default to using the ES6 version of the package.

For a more detailed guide and information on the components included in Mayflower React and their functionality, visit our [Mayflower React Storybook][react-storybook]. Click on the Info and Knobs tabs for component prop types, details and options.


## Mayflower-React Development
* `npm install`
* `npm start`: This will run the demo application.


#### System Requirements

- node.js, currently standardized on version 12.18.1
- npm, currently standardized on version 6.4.1
- That's it! All other dependencies should be included when you run ``npm i``.

#### Useful commands

The most common commands can be found in the package.json's ``scripts`` section:

$ `npm run lint` and `npm run lint-fix` Runs eslint code style checks, with the `-fix` added it will attempt to auto-correct any found issues.

$ `npm test`: Starts Jest test suite in watch mode

$ `npm run test:coverage` Generates a test report

$ `npm run build`: Compile the code from /src into es6 and commonjs formats in preparation for publishing.

#### Adding dependencies

We manage all dependencies using npm in the normal way, and we follow the typical convention of committing our package-lock.json file as well. This means that if you install a new dependency, your workflow will look something like this:

$ ``npm i purgecss`` (Installs the new dependency, if you run ``git status`` after this you should see both package.json and package-lock.json showing changes).

$ ``git add package.json package-lock.json``

$ ``git commit -m 'Added purgecss library'``

## Mayflower-React Testing

#### Production build testing

By default, ``npm start`` will kick off a develop environment that hot reloads as you make changes to the codebase. This is great, but sometimes you want to test the production build locally. To do so, you can use the following:

$ ``npm i -g http-server``

$ ``npm run build-storybook``

$ ``http-server storybook-static``

This will spin up a fully optimised production build in your browser for testing.

#### Production bundle explorer

Source map exploring is useful for analyzing the production js bundles and looking for potential optimizations. It shows you exactly how much of your production bundles are being used by what dependency in a visual way that makes it easy to spot bloat. To open the explorer on a prod build in your browser, use the following:

$ ``npm i -g source-map-explorer``

$ ``npm run build``

$ ``source-map-explorer umd/@massds/*.min.js``

#### Testing unpublished Mayflower React components

Sometimes it is useful to test a Mayflower React component that has not yet been published to npm. This can be accomplished by using the [``npm link``](https://docs.npmjs.com/cli/link) command.


## Mayflower-React Release Process

We are tracking versions of this project in the package.json, which means when cutting a release we expect the main ``"version": "0.30.0"`` to be updated using proper [semantic versioning](https://semver.org/). So if we were releasing a bugfix or other minor improvement we would bump to ``0.30.1``, if we were releasing a new feature we would bump to ``0.31.0``, etc.


#### Publish to NPM
1. Create a version bump PR into `develop` updating package version in `package.json` and `package-lock.json`. Squash and merge when ready.
2. Create a release PR into `master` from `develop`. Regular merge when ready.
3. From `master` branch, $ `npm publish`. This will publish the latest changes to npm, and automatically runs `npm run build` first.

#### Publish to S3
1. $ `npm run build-storybook`. This will build storybook static site into /storybook-static
2. From project root, $ ``aws s3 sync storybook-static s3://mayflower-react.digital.mass.gov/ --delete`` (Deploys build to S3 bucket)
3. $ ``aws configure set preview.cloudfront true`` (Enables CloudFront invalidation commands)
4. $ ``aws cloudfront create-invalidation --distribution-id
[!!PROD_DISTRIBUTION_ID_HERE!!] --paths '/*'`` (Invalidates CloudFront for prod box)

You should see your changes live at [mayflower-react storybook][react-storybook] within a few minutes!

[npm-badge]: https://img.shields.io/npm/v/@massds/mayflower-react.png?style=flat-square
[npm]: https://www.npmjs.com/package/@massds/mayflower-react
[mayflower-github]: https://github.com/massgov/mayflower
[mayflower-doc]: https://www.mass.gov/mayflower
[react-storybook]: https://mayflower.digital.mass.gov/react
[react-starter]: https://github.com/massgov/mayflower-react-starter
[patternlab]: https://mayflower.digital.mass.gov/patternlab
[shared-assets]: https://github.com/massgov/mayflower/tree/develop/assets
