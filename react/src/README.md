# Mayflower-React
[![npm package][npm-badge]][npm]

Mayflower-react is a React component library under the [enterprise design system for the Commonwealth of Massachusetts][mayflower-doc].

- **Live demo:** [mayflower-react storybook][react-storybook]
- **NPM package:** [@massds/mayflower-react][npm].
- **Codebase:** [Mayflower monorepo][mayflower-github] `react` subdirectory
  >[Mayflower monorepo][mayflower-github] comprised of [Mayflower documentation][mayflower-doc], two component libraries — [Mayflower React][react-storybook] and [Mayflower PatternLab][patternLab], and their [shared assets][shared-assets].
  > Refer to [Mayflower PatternLab Static Site][patternlab] for the set of UI components consumed in Mass.gov.


## Using Mayflower-React in Your Project
1. Install mayflower-react into your project as a dependency.
`npm i @massds/mayflower-react --save`
2. Import components into your App.js
`import { Button } from '@massds/mayflower-react';`
3. Render components in JSX
`<Button text="Button" onClick={() => console.log('mayflower button clicked!')} />`

Please note that [@massds/mayflower-react][npm] comes with prebuilt css, svg and other image files. If you are configuring your own Webpack, you might need to add the following loaders to handle these files:
``npm install --save-dev css-loader svg-inline-loader file-loader``

You can also kickstart your React project with Mayflower-react referring to the [Mayflower React Starter][react-starter] built with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app).

For a guide and information on the components included in mayflower-react and their functionality, visit our [Mayflower React Storybook][react-storybook]. Click on the Info and Knobs tabs for component prop types, details and options.


## Mayflower-React Development
* `npm install`
* `npm start`: This will run the demo application.

Please note that we are currently relying on symlink for pulling in shared assets into react source code. For Windows users, you need to manually create the symlink before running `npm start`.
e.g. In cmd prompt:
- $ `cd src` - make sure you are in the `src` folder in `mayflower/react`
- $ `rm assets`
- $ `ln -s ../../assets assets`

#### System Requirements

- node.js, currently standardized on version 10.15.1
- npm, currently standardized on version 6.4.1
- That's it! All other dependencies should be included when you run ``npm i``.

#### Useful commands

The most common commands can be found in the package.json's ``scripts`` section:

$ `npm run lint` and `npm run lint-fix` Runs eslint code style checks, with the `-fix` added it will attempt to auto-correct any found issues.

$ `npm test`: Starts Jest test suite in watch mode

$ `npm run test:coverage` Generates a test report

$ `npm run build`: Compile the code from /src into es6, commonjs, and umd formats in preparation for publishing.

$ `npm run copy-data`: This copies the src/data directory into the /lib and /es directories in preparation for publishing.

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
3. From `master` branch, $ `npm publish`. This will publish the latest changes to npm, and automatically runs `npm run build` and `npm run copy-data` first.

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
