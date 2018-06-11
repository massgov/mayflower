# Mayflower [![GitHub version](https://badge.fury.io/gh/massgov%2Fmayflower.svg)](https://badge.fury.io/gh/massgov%2Fmayflower)
Mayflower is the enterprise design system for the Commonwealth of Massachusetts.

## Getting Started

### Setting up your environment

In order to run Mayflower locally, you need to have some things installed and set up on your machine.  Follow the steps in [setting up your machine](docs/machine-setup.md).

#### Demo Install
- Follow the steps in [Demo Install](docs/demo-install.md) to get a copy of the project up and running on your local machine for *demo* and *testing* purposes. 

## Contribute

Please follow the steps in [Contributing docs](.github/CONTRIBUTING.md) to set up your fork and repo for *development* and *contribution* purposes.

## Deployment

### Developer Deployment

Every time a branch passes CircleCI it will deploy the code to a the following URL `http://mayflower.digital.mass.gov/b/<branch name>/index.html` which will allow the developer to share the URL with reviewers to test their code.

### Production Deployment

Mayflower release managers with the necessary repo permissions can see [Release docs](docs/release.md) for steps on deploying code to production (i.e. do a release).

## Generating assets

This project comes with gulp tasks to build Mayflower's static assets (html, css, js, + images) without serving them locally.  See the [gulp-readme](styleguide/tools/gulp/gulp-readme.md) for more information.

### Mayflower Artifacts
Some Mass Digital Services projects (i.e. [massgov/mass](https://github.com/massgov/mass)) use twig templates in addition to the static assets (html, css, js, image) from Mayflower.  To establish that dependency, those projects point their dependency manager (i.e. [composer](https://getcomposer.org/doc/00-intro.md)) to the [Mayflower Artifacts](https://github.com/massgov/mayflower-artifacts) repository, which is a collection of Mayflower build artifacts with both twig and static assets.  Learn more about Mayflower Artifacts in the [massgov/openmass docs](https://github.com/massgov/openmass/blob/master/docs/Mayflower.md#mayflower-artifacts).

## Built With

* [Pattern Lab 2 (PHP)](http://patternlab.io/docs/index.html) - The pattern framework / static site generator
* [Twig](https://twig.sensiolabs.org/) - The templating language
* [TwigJS](https://github.com/twigjs/twig.js/wiki) - For clientside rendering of twig templates (see [ajaxPattern](styleguide/source/_patterns/03-organisms/by-template/ajax-pattern.md))

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/massgov/mayflower/tags).

Learn about how Mayflower versions work in our [Semantic Versioning](docs/versioning.md) docs.

## License

This project is licensed under the is licensed under the GNU General Public License v2.0 - see the [LICENSE.txt](LICENSE.txt) file for details.

## Acknowledgments

* [Atomic Design](http://atomicdesign.bradfrost.com/chapter-2/) methodology by Brad Frost
* This awesome [README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) by [@PurpleBooth](https://gist.github.com/PurpleBooth)
