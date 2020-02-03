Contributing to Mayflower
=========================

Mayflower is primarily a design system.  This repository is the concrete implementation of that design system, and is broken into 2 distinct parts:

* *[Documentation](/docs)*: Documentation for the overall design system, including guiding principals.
* ***Implementations***: Implementations of Mayflower in various languages and technologies. Each implementation has its own documentation explaining how to use and work with it.
  - [Mayflower React](/react)
  - [Mayflower Patternlab](/patternlab)

Versioning
----------
All implementations of Mayflower contained in this repository follow a unified [semantic versioning](https://semver.org/) release procedure.  This means that we guarantee backward compatibility within a major version. This means different things for different implementations, but as a guiding principal, if your changes would _require_ other implementors to make changes, it should be considered a breaking change.

Step by step guide for contributing:
------------------------------------

1. Clone this repository.
2. Starting from the `develop` branch, create a new "feature" branch for your changes with the project prefix, e.g. `patternlab/`, `react/`:
    ```bash
    # e.g. Create a feature branch for Mayflower Patternlab
    git checkout develop
    git checkout -b patternlab/my_feature
    ```
    For documentation changes, start from the `docs-integration` branch, create a new "feature" branch for your changes with the prefix `docs-`:
    ```bash
    # e.g. Create a feature branch for Mayflower Documentation
    git checkout docs-integration
    git checkout -b docs-my_feature
    ```
3. Inside the directory for the implementation you want to work on, make your changes.  Check the contribution guidelines for the specific project you are working on for more details on how to get started.
4. When you are ready to have your changes reviewed, commit them, and push them back to this repository:
    ```bash
    # e.g. Make a change to Mayflower Patternlab
    git add patternlab/
    git commit -m "Add foos to bars"
    git push origin patternlab/my_feature
    ```
5. Follow the [Changelog Instructions](./docs/for-developers/changelog-instructions.md) to add a changelog.
6. Open a [Pull Request](https://github.com/massgov/mayflower/compare) to have your code reviewed.

#### Using the Gitbook editor
For starting from Gitbook editor, check out the [docs contributing guide](docs/.docs/CONTRIBUTING.md) for more details.


_Note_: Your pull request must pass all tests before it can be merged.  If you make a change that breaks another implementation, you will be asked to review and fix it before it can be accepted.
