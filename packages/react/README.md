# Mayflower-React
[![npm package][npm-badge]][npm]

Mayflower-react is a React component library under the [enterprise design system for the Commonwealth of Massachusetts][mayflower-doc].

- **Live demo:** [mayflower-react storybook][react-storybook]
- **NPM package:** [@massds/mayflower-react][npm].
- **Codebase:** [Mayflower monorepo][mayflower-github] `react` subdirectory
  >[Mayflower monorepo][mayflower-github] comprised of [Mayflower documentation][mayflower-doc], two component libraries — [Mayflower React][react-storybook] and [Mayflower PatternLab][patternLab], and their [shared assets][shared-assets].
  > Refer to [Mayflower PatternLab Static Site][patternlab] for the set of UI components consumed in Mass.gov.

Version 10.x of mayflower-react has removed the `es/` and `lib/` directories. Instead, the ES5 and ES6 versions now live in the same directory of the component as `index.js` and `index.mjs` respectively:
```javascript
// This is the ES5 version.
import { Button } from '@massds/mayflower-react';
import Button from '@massds/mayflower-react/dist/Button';

// This is the ES6 version.
import { Button } from '@massds/mayflower-react/index.mjs';
import Button from '@massds/mayflower-react/dist/Button/index.mjs';
```
Mayflower React v10.x has its module entry point set to `dist/index.mjs`, so if your project is set to use ES Modules, importing from `@massds/mayflower-react` will default to using the ES6 version of the package.

As of version 10.x, Mayflower React styles come directly from the `@massds/mayflower-assets` package. Each component has been documented with the exact scss files from mayflower-assets you need to include in your project for it to render the same as the [Mayflower React Storybook][react-storybook]:
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

As of version 12.x, mayflower-react includes type declarations for all the components! These typescript declarations are converted from the same source code `src/index.js`. This is done by transforming proptypes to typescript types using `jscodeshift`, with some custom modifications, see [packages/react/scripts/transform.ts](./scripts/transform.ts).

Alongside the `index.js` and `index.mjs` (ES5 and ES6 versions), inside of each components in `dist/`, you will find a `index.d.ts` (type declarations) generated during the `rush build:react` step. 
> You can manually run the convertion script on a specific component. For example, run this in the repo root:

> $ `node packages/react/scripts/jsx-to-tsx packages/react/src/components/atoms/buttons/Button/index.js`

> This command will create create a new `.tsx` copy of the Button index.js file and converts it to typescript, in the same place. 

> This replicates an intermediate step of the final distribution. In the build step, a similar conversion process will run on each component saving its results into the `types` folder, then the generated type declarations of the component will be extracted into a `d.ts` file and placed in the distribution folder. 
> This can also be used for development/debugging purposes.

Eventually, we want to fully convert mayflower-react to a typescript component library. See what's next in [this Jira ticket](https://massgov.atlassian.net/browse/DP-26542).

## Using Mayflower-React in Your Project
1. Install mayflower-react and mayflower-assets into your project dependency:
```javascript
npm i @massds/mayflower-react @massds/mayflower-assets --save
```
2. Import components into your App:
```javascript
// You can import the components from the module entry point:
import { Header, Footer, Button } from '@massds/mayflower-react';
// However, it's encouraged that you directly point to each component's path, if you are only using a small subset of components to avoid importing the whole library:
import Header from '@massds/mayflower-react/dist/Header';
import Footer from '@massds/mayflower-react/dist/Footer';
import Button from '@massds/mayflower-react/dist/Button';
```
3. Render components:
```javascript
<Button text="Button" onClick={() => console.log('mayflower button clicked!')} />
```
>For a more detailed guide and information on the components included in Mayflower React and their functionality, visit our [Mayflower React Storybook][react-storybook]. Click on the Info and Knobs tabs for component prop types, details and options.

4. Component styles must be imported separately, follow the scss modules documentation in each component. Create a scss file and import the necessary styles from mayflower-assets for the React component in use. E.g. If you using the slim header and slim footer components, in a SCSS files, import these styles:
```scss
// Header
@use "~@massds/mayflower-assets/scss/01-atoms/button-with-icon";
@use "~@massds/mayflower-assets/scss/02-molecules/brand-banner";
@use "~@massds/mayflower-assets/scss/03-organisms/header-slim";
// Footer
@use "~@massds/mayflower-assets/scss/01-atoms/image";
@use "~@massds/mayflower-assets/scss/01-atoms/site-logo";
@use "~@massds/mayflower-assets/scss/03-organisms/footer-slim";
```

5. Config SCSS import paths
When using this mayflower-assets for the .scss files, you will need to include its include paths, see [mayflower-assets](packages/assets/README.md) for more info.


### To consume the typed components in your typescript project
1. Create a `mayflower.d.ts` in your project and declare module imports by mayflower-react:
```javascript
declare module "@massds/mayflower-assets";
declare module "@massds/mayflower-assets/static/images/*";
```
2. Import a mayflower-react typed component. For examples:
```javascript
import BrandBanner from "@massds/mayflower-react/dist/BrandBanner";
import HeaderSlim from "@massds/mayflower-react/dist/HeaderSlim";
import FooterSlim from "@massds/mayflower-react/dist/FooterSlim";
```
3. Component styles must be imported separately, follow the scss modules documentation in each component. Create a scss file and import the necessary styles from mayflower-assets for React component in use. 

4. Config SCSS import paths
```javascript
// import the include paths from mayflower-assets
const mayflowerAssets = require("@massds/mayflower-assets");

// include the paths in sass-loader config, e.g. in next.config.js
  sassOptions: {
    includePaths: [...mayflowerAssets.includePaths]
  }
```

## Mayflower-React Development
* `npm install`
* `npm start`: This will run the demo application.


### System Requirements

- node.js, currently standardized on version 12.18.0
- npm, currently standardized on version 6.4.1
- That's it! All other dependencies should be included when you run ``npm i``.

### Useful commands

The most common commands can be found in the package.json's ``scripts`` section:

$ `npm run lint` and `npm run lint-fix` Runs eslint code style checks, with the `-fix` added it will attempt to auto-correct any found issues.

$ `npm test`: Starts Jest test suite in watch mode

$ `npm run test:coverage` Generates a test report

$ `npm run build`: Compile the code from `/src` into es6 and commonjs formats in preparation for publishing. This command also generates icon components from the .svg files under `/src/components/base/Icon/assets` to `dist/Icon`.


### Adding dependencies

We manage all dependencies using npm in the normal way, and we follow the typical convention of committing our package-lock.json file as well. This means that if you install a new dependency, your workflow will look something like this:

$ ``npm i purgecss`` (Installs the new dependency, if you run ``git status`` after this you should see both package.json and package-lock.json showing changes).

$ ``git add package.json package-lock.json``

$ ``git commit -m 'Added purgecss library'``

### Icon Component Generation
Mayflower React's SVG icon components are generated using [SVGR](https://react-svgr.com/) at build time for both development and production modes. Currently, the `.svg` files under `src/components/base/Icon/assets` are generated into React components. When icon components are generated for production, both ES6 and CommonJS versions of the components are created using babel.

A custom template used by SVGR to create the icon component files can be found within `icon-template.js`. SVGR itself is configured using `.svgrrc.js`.

### Caveats
Google translate inserts `<font>` tags for translated strings, causing the React virtual DOM to differ from the real DOM. When a JSX string literal is not wrapped in any HTML tags, and it's not the only child of its parent, React script errors when executing `removeChild` or `insertBefore` on conditionally rendered child nodes. In order to avoid Google translate widget crashing the React apps, Mayflower React components should avoid having string literal unwrapped when it has any siblings. 

Avoid these patterns:
```
<div>
  {condition && 'Welcome'}
  <span>Something</span>
</div>

<div>
  {condition && <span>Something</span>}
  Welcome
</div>
```

Do these:
```
<div>
  {condition && <span>Welcome</span>}
  <span>Something</span>
</div>

// A workaround for case 2
<div>
  {condition && <span>Something</span>}
  <span>Welcome</span>
</div>
```

[See more explanations](https://github.com/facebook/react/issues/11538#issuecomment-390386520). Dev dependency `@sayari/eslint-plugin` was added to Mayflower React development for this purpose. However, as there are many ways to write the same code, we can't just fully rely on the eslint rules. If you are seeing the `removeChild` or `insertBefore` errors in your react app while using Google Translate, refer to this workaround suggested by the React team https://github.com/facebook/react/issues/11538#issuecomment-417504600 to debug your app. 

## Mayflower-React Testing

### Production build testing

By default, ``npm start`` will kick off a develop environment that hot reloads as you make changes to the codebase. This is great, but sometimes you want to test the production build locally. To do so, you can use the following:

$ ``npm i -g http-server``

$ ``npm run build-storybook``

$ ``http-server storybook-static``

This will spin up a fully optimised production build in your browser for testing.

### Production bundle explorer

Source map exploring is useful for analyzing the production js bundles and looking for potential optimizations. It shows you exactly how much of your production bundles are being used by what dependency in a visual way that makes it easy to spot bloat. To open the explorer on a prod build in your browser, use the following:

$ ``npm i -g source-map-explorer``

$ ``npm run build``

$ ``source-map-explorer umd/@massds/*.min.js``

### Testing unpublished Mayflower React components

If you're developing on Mayflower React and want to test your changes on another project (such as Gatsby, Next.JS, Create React App, etc), we recommend using [yalc](https://github.com/whitecolor/yalc) instead of `npm link` or `yarn link`, as Node dependency resolution issues may arise.

To use yalc:
1. Run `yalc publish` in the `react/` directory. This will run Mayflower React's build script and store the build version of the package under your yalc global directory.
2. Run `yalc link @massds/mayflower-react` in your other project. Mayflower React will now be installed and pointing to the version from step 1.


## Mayflower-React Release Process

We are tracking versions of this project in the package.json, which means when cutting a release we expect the main ``"version": "0.30.0"`` to be updated using proper [semantic versioning](https://semver.org/). So if we were releasing a bugfix or other minor improvement we would bump to ``0.30.1``, if we were releasing a new feature we would bump to ``0.31.0``, etc.


### Publish to NPM
1. Create a version bump PR into `develop` updating package version in `package.json` and `package-lock.json`. Squash and merge when ready.
2. Create a release PR into `master` from `develop`. Regular merge when ready.
3. From `master` branch, $ `npm publish`. This will publish the latest changes to npm, and automatically runs `npm run build` first.

### Publish to S3
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
