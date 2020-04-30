# Mayflower Patternlab

[Mayflower Patternlab](https://github.com/massgov/mayflower/tree/master/patternlab) is a Twig based component library under the enterprise design system for the Commonwealth of Massachusetts built with [Patternlab](http://patternlab.io/). Its generated static assets are published as a npm package [@massds/mayflower](https://www.npmjs.com/package/@massds/mayflower-react). Refer to [Mayflower PatternLab Static Site](https://mayflower.digital.mass.gov/patternlab) for a complete list of its UI components.

## Getting Started

### Setting up your environment

In order to run Mayflower locally, you need to have some things installed and set up on your machine. Follow the steps in [setting up your machine](https://github.com/massgov/mayflower-doc/tree/83c344d630643fb6ad454465d3505609ae7e3475/getting-started/docs/machine-setup.md).

#### Demo Install

* Follow the steps in [Demo Install](https://github.com/massgov/mayflower-doc/tree/83c344d630643fb6ad454465d3505609ae7e3475/getting-started/docs/demo-install.md) to get a copy of the project up and running on your local machine for _demo_ and _testing_ purposes. 

## Contribute

Please follow the steps in [Contributing docs](https://github.com/massgov/mayflower-doc/tree/83c344d630643fb6ad454465d3505609ae7e3475/getting-started/.github/CONTRIBUTING.md) to set up your fork and repo for _development_ and _contribution_ purposes.

## Deployment

### Developer Deployment

Every time a branch passes CircleCI it will deploy the code to a the following URL `http://mayflower.digital.mass.gov/b/<branch name>/index.html` which will allow the developer to share the URL with reviewers to test their code.

### Production Deployment

Mayflower release managers with the necessary repo permissions can see [Release docs](https://github.com/massgov/mayflower-doc/tree/83c344d630643fb6ad454465d3505609ae7e3475/getting-started/docs/release.md) for steps on deploying code to production \(i.e. do a release\).

## Generating assets

This project comes with gulp tasks to build Mayflower's static assets \(html, css, js, + images\) without serving them locally. See the [gulp-readme](https://github.com/massgov/mayflower-doc/tree/83c344d630643fb6ad454465d3505609ae7e3475/getting-started/styleguide/tools/gulp/gulp-readme.md) for more information.

### Mayflower Artifacts

Some Mass Digital Services projects \(i.e. [massgov/mass](https://github.com/massgov/mass)\) use twig templates in addition to the static assets \(html, css, js, image\) from Mayflower. To establish that dependency, those projects point their dependency manager \(i.e. [composer](https://getcomposer.org/doc/00-intro.md)\) to the [Mayflower Artifacts](https://github.com/massgov/mayflower-artifacts) repository, which is a collection of Mayflower build artifacts with both twig and static assets. Learn more about Mayflower Artifacts in the [massgov/openmass docs](https://github.com/massgov/openmass/blob/master/docs/Mayflower.md#mayflower-artifacts).

## Built With

* [Pattern Lab 2 \(PHP\)](http://patternlab.io/docs/index.html) - The pattern framework / static site generator
* [Twig](https://twig.sensiolabs.org/) - The templating language
* [TwigJS](https://github.com/twigjs/twig.js/wiki) - For clientside rendering of twig templates \(see [ajaxPattern](https://github.com/massgov/mayflower-doc/tree/83c344d630643fb6ad454465d3505609ae7e3475/getting-started/styleguide/source/_patterns/03-organisms/by-template/ajax-pattern.md)\)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/massgov/mayflower/tags).

Learn about how Mayflower versions work in our [Semantic Versioning](https://github.com/massgov/mayflower-doc/tree/83c344d630643fb6ad454465d3505609ae7e3475/getting-started/docs/versioning.md) docs.

## License

This project is licensed under the is licensed under the GNU General Public License v2.0 - see the [LICENSE.txt](https://github.com/massgov/mayflower-doc/tree/83c344d630643fb6ad454465d3505609ae7e3475/getting-started/LICENSE.txt) file for details.

## Acknowledgments

* [Atomic Design](http://atomicdesign.bradfrost.com/chapter-2/) methodology by Brad Frost
* This awesome [README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) by [@PurpleBooth](https://gist.github.com/PurpleBooth)

