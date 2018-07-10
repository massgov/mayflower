Contributing to Mayflower
=========================

Mayflower is primarily a design system.  This repository is the concrete implementation of that design system, and is broken into 2 distinct parts:

* *[Documentation](/docs)*: Documentation for the overall design system, including guiding principals.
* *Implementations*: Implementations of Mayflower in various languages and technologies. Each implementation has its own documentation explaining how to use and work with it.

Versioning
----------
All implementations of Mayflower contained in this repository follow a unified [semantic versioning](https://semver.org/) release procedure.  This means that we guarantee backward compatibility within a major version. This means different things for different implementations, but as a guiding principal, if your changes would _require_ other implementors to make changes, it should be considered a breaking change.

Step by step guide for contributing:
------------------------------------

1. Clone this repository.
2. Starting from the `develop` branch, create a new "feature" branch for your changes with the project prefix, e.g. `patternlab/`, `react/`, `docs-`:
    ```bash
    # e.g. Create a feature branch for Mayflower Patternlab
    git checkout -b patternlab/my_feature
    ```
3. Inside the directory for the implementation you want to work on, make your changes.  Check the contribution guidelines for the specific project you are working on for more details on how to get started.
4. When you are ready to have your changes reviewed, commit them, and push them back to this repository:
    ```bash
    # e.g. Make a change to Mayflower Patternlab
    git add patternlab/
    git commit -m "Add foos to bars"
    git push origin patternlab/my_feature
    ```
5. Follow the [Changelog Instructions](docs/for-developer/change-log-instructions.md) to add a changelog.
6. Open a [Pull Request](/compare) to have your code reviewed.

#### Using the Gitbook editor
1. Create a new "version" from the primary version for your changes and name it `docs/[my_version]`
This creates a `docs-[my_version]` branch in the Github repo.
2. Click on the "save" button save as a draft. This equals to creating a commit on your branch. Add a description to your draft to provide a commit message.
3. Click on the "publish" button to push the changes to the github branch.
4. Open a [Pull Request](/compare) to have your code reviewed.


_Note_: Your pull request must pass all tests before it can be merged.  If you make a change that breaks another implementation, you will be asked to review and fix it before it can be accepted.
