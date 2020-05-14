# Mayflower React

## Mayflower-React

[![](https://img.shields.io/npm/v/@massds/mayflower-react.png?style=flat-square)](https://www.npmjs.com/package/@massds/mayflower-react)

[Mayflower-react](https://github.com/massgov/mayflower/tree/master/react) is a React component library under the enterprise design system for the Commonwealth of Massachusetts. Mayflower-react is a published npm package [@massds/mayflower-react](https://www.npmjs.com/package/@massds/mayflower-react) that is dependent on static assets generate by [Mayflower PatternLab](https://github.com/massgov/mayflower). Refer to [Mayflower React Storybook](https://mayflower.digital.mass.gov/react/) for a complete list of its UI components.

## How to use Mayflower-React in your Project!

### Quick start

1. Install mayflower-react into your project as a dependency.

   `npm i @massds/mayflower-react --save`

2. Import components into your App.js

   `import { Button } from '@massds/mayflower-react';`

3. Render components in JSX

   `<Button info="this will be the tooltip text on hover" text="button" onClick={button clicked()} />`

For a guide and information on the components included in mayflower-react and there functionality visit our \[mayflower-react storybook\]\[mayflower-react\]. Click on the Info and Knobs tabs for component prop types, details and options.

## Contributing, Releasing, and Developing in Mayflower-React

### Development

* `npm install`
* `npm start`: This will run the demo application.

#### System Requirements

* node.js, currently standardized on version 8.9.4
* npm, currently standardized on version 5.6.0
* That's it! All other dependencies should be included when you run `npm i`.

#### Useful commands

The most common commands can be found in the package.json's `scripts` section:

$ `npm run lint` and `npm run lint-fix` Runs eslint code style checks, with the `-fix` added it will attempt to auto-correct any found issues.

$ `npm test`: Starts Jest test suite in watch mode

$ `npm run test:coverage` Generates a test report

$ `npm run build`: Compile the code from /src into es6, commonjs, and umd formats in preparation for publishing.

$ `npm run copy-data`: This copies the src/data directory into the /lib and /es directories in preparation for publishing.

#### Adding dependencies

We manage all dependencies using npm in the normal way, and we follow the typical convention of committing our package-lock.json file as well. This means that if you install a new dependency, your workflow will look something like this:

$ `npm i purgecss` \(Installs the new dependency, if you run `git status` after this you should see both package.json and package-lock.json showing changes\).

$ `git add package.json package-lock.json`

$ `git commit -m 'Added purgecss library'`

### Testing

#### Production build testing

By default, `npm start` will kick off a develop environment that hot reloads as you make changes to the codebase. This is great, but sometimes you want to test the production build locally. To do so, you can use the following:

$ `npm i -g http-server`

$ `npm run storybook-static`

$ `http-server storybook-static`

This will spin up a fully optimised production build in your browser for testing.

#### Production bundle explorer

Source map exploring is useful for analyzing the production js bundles and looking for potential optimizations. It shows you exactly how much of your production bundles are being used by what dependency in a visual way that makes it easy to spot bloat. To open the explorer on a prod build in your browser, use the following:

$ `npm i -g source-map-explorer`

$ `npm run build`

$ `source-map-explorer umd/@massds/*.min.js`

#### Testing unpublished Mayflower React components

Sometimes it is useful to test a Mayflower React component that has not yet been published to npm. This can be accomplished by using the [`npm link`](https://docs.npmjs.com/cli/link) command.

### Release process

We are tracking versions of this project in the package.json, which means when cutting a release we expect the main `"version": "0.30.0"` to be updated using proper [semantic versioning](https://semver.org/). So if we were releasing a bugfix or other minor improvement we would bump to `0.30.1`, if we were releasing a new feature we would bump to `0.31.0`, etc.

#### Publish to NPM

1. Create a version bump PR into `develop` updating package version in `package.json` and `package-lock.json`. Squash and merge when ready.
2. Create a release PR into `master` from `develop`. Regular merge when ready.
3. From `master` branch, $ `npm publish`. This will publish the latest changes to npm, and automatically runs `npm run build` and `npm run copy-data` first.

#### Publish to S3

1. $ `npm run build-storybook`. This will build storybook static site into /storybook-static
2. From project root, $ `aws s3 sync storybook-static s3://mayflower-react.digital.mass.gov/ --delete` \(Deploys build to S3 bucket\)
3. $ `aws configure set preview.cloudfront true` \(Enables CloudFront invalidation commands\)
4. $ \`\`aws cloudfront create-invalidation --distribution-id

   \[!!PROD\_DISTRIBUTION\_ID\_HERE!!\] --paths '/\*'\`\` \(Invalidates CloudFront for prod box\)

You should see your changes live at [Mayflower React Storybook](https://mayflower.digital.mass.gov/react) within a few minutes!

