Contributing to Mayflower Documentation
=========================

Documentation for the overall Mayflower design system, including guiding principles hosted by Gitbook. 


From Gitbook Editor:
------------------------------------

1. [Create](https://www.gitbook.com/join) a Gitbook account and ask for edit permission.
2. Go to https://massds.gitbook.io/mayflower/.
3. Click on the `Edit` button to start making changes.
3. Create a new "version" from the primary version for your changes and name it `docs/[my_version]`
This creates a `docs-[my_version]` branch in the Github repo.
4. Click on the "save" button save as a draft. This equals to creating a commit on your branch. Add a description to your draft to provide a commit message.
5. Click on the "publish" button to push the changes to the github branch.
6. Open a [Pull Request](/compare) to have your code reviewed.

From Github:
------------------------------------

1. Clone this repository and cd into the `/docs`
2. Starting from the `develop` branch, create a new "feature" branch for your changes with the prefix `docs-`:
    ```bash
    # e.g. Create a feature branch for Mayflower Patternlab
    git checkout -b docs-my_feature
    ```
3. Inside the directory for the implementation you want to work on, make your changes.  Check the contribution guidelines for the specific project you are working on for more details on how to get started.
4. When you are ready to have your changes reviewed, commit them, and push them back to this repository:
    ```bash
    # e.g. Make a change to Mayflower Patternlab
    git add docs/
    git commit -m "Add foos to bars"
    git push origin docs/my_feature
    ```
5. Open a [Pull Request](/compare) to have your code reviewed.


_Note_: Once you've opened your PR, Mayflower maintainers will review and either request changes or merge into the live version of the documentation.
