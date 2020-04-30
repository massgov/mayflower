# Getting Started

We encourage all Commonwealth web properties to implement the Mayflower Design System for a consistent look and feel. It’s important that constituents know they are on an official state government website, and the visual cues that come from using a cohesive design help convey that legitimacy.

## Mayflower as branding

The minimum Mayflower branding consists of [**colors**](../style/color.md) and [**font**](../style/typography.md)**.** Follow the design principles and usage in the [components](../components/) to have a more cohesive look. This is the first level of implementation which is the first step of making your product visually aligned with the others. Keep in mind that its accessibility, performance, responsiveness and browser-compatibility are not guaranteed this way. We highly recommend you to follow the other guidelines for web products and implement Mayflower as a living styleguide, apply Mayflower HTML, CSS and JS directly, and most preferably take advantage of the component libraries.

Other branding resources:

* [Icons & logo](https://github.com/massgov/mayflower/tree/develop/assets/images)
* [SCSS partials and variables](https://github.com/massgov/mayflower/tree/develop/assets/scss)

## Mayflower as styleguide

On top of the Mayflower branding, all Commonwealth web properties should conform to the WCAG 2.0 and 2.1 accessibility standards and be responsible, cross-browser compatible and optimized for performance.

Using Mayflower as a styleguide entails applying the visuals and interactions of components documented in the design principles and usage, and complying with all the [guidelines](../guidelines/), in your own way. This is a Mayflower implementation option if you are using a third-party SAAS product or you are not able to alter the front end markup.

For state web properties that rely on Bootstrap as the front end framework, we started a [**Mayflower Bootstrap**](mayflower-bootstrap.md) is a Mayflower inspired bootstrap theme as a community resource. Refer to [Bootstrap V4 documentation](http://getbootstrap.com/docs/4.1/components/alerts/) for component implementation. Keep in mind that its accessibility, performance, responsiveness and browser-compatibility are not guaranteed this way. Please [contribute back to the project](https://github.com/massgov/mayflower-bootstrap) whenever possible.

## Mayflower as markup

If you have full access to front end code but are not able to implement either of the component libraries, the best option is to implement Mayflower HTML markup and its generated static assets.

The current version of Mayflower generated static assets:

* Compiled CSS:
  * [https://mayflower.digital.mass.gov/patternlab/assets/css/index-generated.css](https://mayflower.digital.mass.gov/patternlab/assets/css/index-generated.css)
* Compiled JS:
  * [https://mayflower.digital.mass.gov/patternlab/assets/js/vendor-generated.js](https://mayflower.digital.mass.gov/patternlab/assets/js/vendor-generated.js)
  * [https://mayflower.digital.mass.gov/patternlab/assets/js/index-generated.js](https://mayflower.digital.mass.gov/patternlab/assets/js/index-generated.js)

All Mayflower assets are version-controlled and are published following this convention:[`https://mayflower.digital.mass.gov/patternlab`](https://mayflower.digital.mass.gov/patternlab/)`/v/[version]`

We recommend that you point to a stable version of the CSS and JS to avoid unexpected changes and update it whenever you are ready. Please refer to the [Mayflower Changelog](https://github.com/massgov/mayflower/blob/develop/CHANGELOG.md) to determine whether you want to upgrade Mayflower: E.g. Mayflower v6.0.0

* Compiled CSS for v6.0.0:
  * [https://mayflower.digital.mass.gov/patternlab/v/6.0.0/assets/css/index-generated.css](https://mayflower.digital.mass.gov/patternlab/v/5.31.0/assets/css/index-generated.css)
* Compiled JS for v6.0.0
  * [https://mayflower.digital.mass.gov/patternlab/v/6.0.0/assets/js/vendor-generated.js](https://mayflower.digital.mass.gov/patternlab/assets/js/vendor-generated.js)
  * [https://mayflower.digital.mass.gov/patternlab/v/6.0.0/assets/js/index-generated.js](https://mayflower.digital.mass.gov/patternlab/assets/js/index-generated.js)

Add the CSS file in the `<head>` and JS files right before the closing `</body>` you should be able to use the html markup from our [Mayflower PatternLab component library](https://mayflower.digital.mass.gov/patternlab/?view=c) \(switch from Twig tab to HTML tab in the code view\) to render Mayflower UI.

Use [**Mayflower Starters**](mayflower-starters.md) to kick-start a custom HTML page using Mayflower markup and generated assets and follow the instructions on how to host the page using Github Pages if you need a free hosting option or want to embed the widget as an iframe on Mass.gov.

## Mayflower as component libraries

Using Mayflower component libraries help you build fast, accessible, mobile-friendly, cross-browser compatible web products quickly and efficiently.

Currently Mayflower has 2 component libraries:

* [**Mayflower Patternlab**](mayflower-patternlab.md) \(PHP based\)
  1. Atomic design structure
  2. Twig templating language
  3. Generates component based HTML and compiled CSS and JS files
  4. **NPM package for static assets:** [**Mayflower**](https://www.npmjs.com/package/@massds/mayflower)\*\*\*\*
* [**Mayflower React**](mayflower-react.md) \(JS based\)
  1. Atomic design structure
  2. JSX templating language
  3. Exports reusable React code by components
  4. **NPM package for React component library:** [**Mayflower-react** ](https://www.npmjs.com/package/@massds/mayflower-react)\*\*\*\*

