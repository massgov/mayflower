# Contributing to Mayflower

Thanks for contributing to Mayflower!  Please take a minute to review the process outlined in this document to ensure that contribution is easy and effective for everyone involved. 

**On this page:**
1. [Using the issue tracker](#using-the-issue-tracker)
    1. [Issue Labels](#issue-labels)
1. [Bug Reports](#bug-reports)
1. [Feature Requests](#feature-requests)
1. [Submitting Pull Requests](#submitting-pull-requests)
    1. [Getting started](#getting-started)
        1. [Get Set Up](#get-set-up)
        1. [Forking the repo](#forking-the-repo)
        1. [Cloning the repo](#cloning-the-repo)
        1. [Installing project dependencies](#installing-project-dependencies)
        1. [Keeping in sync](#keeping-in-sync)
    1. [Creating or Editing a Pattern](#creating-or-editing-a-pattern)
    1. [Coding Guildelines](#coding-guidelines)
    1. [Submitting your work](#submitting-your-work)
        1. [Spinning up a branch](#spinning-up-a-branch)
        1. [Working with Pattern Lab](#working-with-pattern-lab)
        1. [Committing your work](#committing-your-work)
        1. [Pushing your branch](#pushing-your-branch)
        1. [Deploying your work](#deploying-your-work)
        1. [Creating a Pull Request](#creating-a-pull-request)
        1. [Review by Maintainers](#review-by-maintainers)

## Using the issue tracker
The [issue tracker](https://github.com/massgov/mayflower/issues) is the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests) and [submitting pull requests](submitting-pull-requests).

### Issue Labels
We use labels to help identify and organize issues.  Here's what they represent and how we use them:

- `browser bug` - Issues that are reported to us that are the result of a browser-specific bug. These are diagnosed with reduced test cases and result in an issue opened on that browser's own bug tracker.
- `confirmed` - Issues that have been confirmed with a reduced test case and identify a bug in Mayflower.
- `css` - Issues stemming from our compiled CSS or source Sass files.
- `docs` - Issues for improving or updating our documentation.
- `examples` - Issues involving the example patterns (i.e. content or data) included on our site.
- `feature` - Issues asking for a new feature to be added, or an existing one to be extended or modified.
- `build` - Issues with our build system, which is used to run all our tests, concatenate and compile source files, and more.
- `PRs welcome` - Issues we need or would love help from the community to resolve.
- `js` - Issues stemming from our compiled or source JavaScript files.
- `meta` - Issues with the project itself or our GitHub repository.

## Bug Reports
A bug is a _demonstrable problem_ that is caused by the code in the repository.  Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or `dev` branch in the repository.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](https://css-tricks.com/reduced-test-cases/) and a live example.

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? Do other browsers show the bug differently? What would you expect to be the outcome? All these details will help people to fix any potential bugs.

Example:

> Short and descriptive example bug report title
>
> The browser/OS environment and Mayflower Version in which it occurs.
 
> Expected behavior - what you would expect to happen on the page / site.

> Existing behavior - what is currently happen on the page / site.

> If suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being reported. This might include the lines of code that you have identified as causing the bug, and potential solutions (and your opinions on their merits).

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. It's up to *you* to make a strong case to convince the project's designers and developers of the merits of this feature. Please provide as much detail and context as possible.

## Pull Requests

Good pull requests—patches, improvements, new features—are a fantastic help!

**Please ask first** before embarking on any significant pull request (e.g. implementing features, refactoring code, porting to a different language), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

### Work in source directories
You can modify these files in order to resolve issues and add new features:
 - Styles: [`/styleguide/source/assets/scss/`](https://github.com/massgov/mayflower/tree/master/styleguide/source/assets/scss)
- Javascript functionality: [`/styleguide/source/assets/js/`](https://github.com/massgov/mayflower/tree/master/styleguide/source/assets/js)
 - Pattern markup, documentation, and data: [`/styleguide/source/_patterns`](https://github.com/massgov/mayflower/tree/master/styleguide/source/_patterns)

**Please do not edit the `gh-pages` branch.** That branch is generated and used to deploy work for testing.

### Getting Started

#### Get set up
   
In order to run Mayflower locally, you need to have some things installed and set up on your machine.  See [setting up your machine](../docs/machine-setup.md).

#### Forking the repo

A fork is a *copy* of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project. Learn more about forking repositories on [Github Help](https://help.github.com/articles/fork-a-repo/).

1. Visit the [Mayflower repo on Github](https://github.com/massgov/mayflower)
1. Click the "Fork" icon in the upper right of the page
1. This will create a fork of the project under your user account which you can browse to at: `https://github.com/<your-github-username>/mayflower`

#### Cloning the repo
Right now, you have a fork of the Mayflower repository, but you don't have the files in that repository on your computer. Let's create a clone of your fork locally on your computer.

1. `git clone git@github.com:<your github username>/mayflower.git`
1. Or, if you don't have [ssh set up on your local environment or with github](https://help.github.com/articles/connecting-to-github-with-ssh/), navigate to your fork of the Mayflower repository at `https://github.com/<your-github-username>/mayflower`.
    1. Follow from Step 2 of [Github Help: Cloning a repository](https://help.github.com/articles/cloning-a-repository/).
1. You now have a local representation of *your* Mayflower!  Change directory into the repo root: `cd mayflower`

#### Installing project dependencies

1. Move into the styleguide directory `cd styleguide`
1. Generate pattern lab default files `php core/console --generate`
1. Install npm dependencies `npm install`

#### Keeping in sync

In order to make it easy to keep your fork in sync with the original (`massgov/mayflower`), add the original as a remote:

```
git remote add upstream git@github.com:massgov/mayflower.git
```

If you check your remotes (`git remote -v`), you can now see that you have two "remotes" that your local repo is pointed towards: `origin`, which points to *your* Mayflower fork, and `upstream`, which points to `massgov/mayflower`.

### Creating or Editing a Pattern
When creating a new pattern for Mayflower, you should always check to see if the pattern you want to create already exist or could be built by adding a new variant to an existing pattern.  If you can't find a good pattern, then you will need to figure out what type of pattern you need to make (Atom, Molecule, Organism, etc...).  See Mayflower's Atomic Design [documentation](../docs/atomic-design.md) as a reference.

When creating a variant of an existing pattern, you need to make sure you aren't actually creating a new pattern.  It's mosty a gut feeling, but you can usually tell if you find yourself adding a lot of extra code to make the variant.  Most variants are built by adding or hiding optional content or adding a modifier CSS class to switch styles.

Your new or modified pattern should follow Mayflowers coding guidelines below.

### Coding Guidelines

#### General Standards
- Two space indentation (not tabs)
- Unix line endings for new patterns
- Keep existing line ending types for existing patterns (mix of windows and unix)
- File names, CSS classes, and Data Objects are consistent for each pattern.
    - Example below for the Action Finder pattern
    - Markup => `action-finder.twig`
    - Data => `action-finder.json`
    - Data Object => `{ "actionFinder": { ... } }`
    - Sass => `\_action-finder.scss`
    - CSS class => `.ma__action-finder: { ... }`
    - JavaScript => `actionFinder.js`
    - JS Selector Class => `$('.js-action-finder');`
    - Documentation => `action-finder.md`
- All files (expect JavaScript) are saved in their appropriate category (Atoms, Molecules, Organisms, etc...)

#### Twig standards
- File name must be unique across all categories, accept pages which can use any name
- The pattern's name will be the file name so use short, but descriptive file names (ie: action-finder, button, decorative-link)
- Follow the guide for [Atomic Design](../docs/atomic-design) to determine what Markup is valid for your category
- CSS class names:
    - Follow the [BEM](http://getbem.com/naming/) methodology
    - Start with the 'ma__' namespace
    - At the block level, matches the file name (ie: action-finder.twig => ma__action-finder)
    - [Modifier](http://getbem.com/naming/) level classes are always pair with the corresponding [Block](http://getbem.com/naming/) or [Element](http://getbem.com/naming/) level class (ie class="ma\_\_action-finder ma\_\_action-finder--no-bg")
- Background images by content editors
    - Background images are usually added inline (ie: style="background-image: ...") to the html element that shows the image
    - For very images greater than 800px wide, we normally swap them for smaller images on narrow screens
        - Use a unique ID on the html element that shows the image
        - Use that same unique ID in a style block that sets the background images using CSS media queries
        - See the Page Banner organism as an example.
- Variables:
    - Use camelCase
    - Are always set to a value
       - If a variable is expecting an object (i.e. `{...}`) which is not being used, set it to `null` in the `.json` file
       - If a variable is expecting a value (i.e. a string or integer) which is not being used, set it to `""` in the `.json` file
    - Declared at the top of the file if used multiple times or just above where it is going to be used
    - Do not use or create global variables
    - Use the Twig `|merge` option if you need to pass custom data to a included pattern
- Including patterns
    - Set the variable used by the pattern before including it. (ie: `{% set actionFinder = foo.af %}{% include "action-finder.twig" %}`)
    - Blocks are used in Templates to allow Pages to include new or override existing patterns
    - When including an unknown pattern we use the `{% include item.path with item.data %}` method where `path` is a string value pointing to the pattern (ie: "path": "@atoms/01-buttons/button.twig") and `data` is the corresponding data object used by that pattern (ie: "data": { button": { ... }})
    - Sometimes it's better to create a variant of an existing pattern and include that verses creating a new pattern.
- Scope
    - Do not be afraid to break your Pattern into smaller patterns
    - Look for Atoms or Molecules within your code
    - [BEM](http://getbem.com/naming/) methodology can be used as a guide to help break your pattern into smaller patterns
        - If you find yourself wanting to add an Element CSS class to another Element CSS class, you probably have a separate pattern to break out. (ie: .ma__action-finder\_\_featured-item\_\_text, .ma__action-finder\_\_feature-item\_\_link => Feature Item should be a sepearate pattern)

#### JSON data standards
- File name matches the corresponding Twig file
    - Use `filename~variant.json` to create pattern variants
- Is located in the same folder as the corresponding Twig file
- If this content of the file is consistent for every page, the file can be saved in the 'source/\_data' folder
- Variables
    - All variables are name spaced (ie: { "actionFinder": { "your-variables": "here" }} )
    - Name space should match the file name (ie: action-finder.json => actionFinder: { ... })
    - Use camel case for variable names
    - Set to `""` for empty strings or numbers and `null` for an empty object
    - Dummy content (ie: lorem ipsum) can be used for all Patterns except Pages
    - For Pages, use real content whenever possible

#### MD (documentation) standards
- Name of the file matches the corresponding Twig file
- For variants, the file name matches the corresponding json file with the `~` replaced by a `-`
- Is located in the same folder as the corresponding Twig file
- Documentation Templates exist for a [base](../docs/documentation-template.md) and [variants](../docs/documentation-template-variant.md)

#### SCSS standards
- Name of the file matches the CSS [Block](http://getbem.com/naming/) level name (ie: ma\_\_action-finder => \_action-finder.scss)
- Will be saved in the appropriate category folder (ie: source/assets/scss/01-atoms) or theme category folder (ie: source/assets/scss/06-theme/01-atoms)
- Code
    - [Element](http://getbem.com/naming/) and [Modifier](http://getbem.com/naming/) level selectors are written using a short hand SASS method => `&__element` or `&--modifier`
    - All selectors are nested within the block level class (`.ma\_\_action-finder { a { ... } &\_\_element { ... } }`)
    - Properties are sorted Alphabetically with one exception
        - If a `position` is used then it's sub properties (bottom, left, right, top) are placed after the position property.
    - Media queries are nested within the selector they target (ie: `&\_\_item { padding: 40px; @media($bp-small-max) { padding: 20px; }}`)
- Variables are used for all colors ($c-...) and breakpoints ($bp-...)
- local variables, if namespaced (ie: `$action-finder-min-height: 40px;` is namespaced to `action-finder`), can be added to the top of the file (ie: `\_action-finder.scss`)
- Mixins
    - Each mixin has it's own file which is bundled into a main mixin.scss file.
    - Should be used over generic CSS classes
- Theme Files (`scss/06-theme`)
    - These files contain all of the branding for your pattern
    - Properties used in these files primarily include:
        - Background-color
        - Background-image (if not used inline in the twig file)
        - Border-color
        - Color
        - Fill
        - Font-style
        - Font-weight
        - Outline-color
        - Stroke
    - Note avoid using shorthand properties that include theme properties (ie: `border: 2px solid;`) since many of them set a default color, making them harder to override in the theme file.  Use specific properties instead (ie: `border-width: 2px;`)

#### Javascript standards
- Check for generic code first since we may already have the code you need in a generic file (ie: accordion.js)
- Check for helper files (ie: cookies.js) that can be imported into your specific file instead of recreating code
- New files should match the name of the pattern (ie: main-nav.twig => mainNav.js) they apply to or have a generic name (ie: accordion.js)
- File names are camelCase
- Files follow a basic [starter](../docs/javascript-template.md) template that uses Node Modules and jQuery.
- Variables
    - if pointing to a jQuery object, start with '$' (ie: `const $el = $('.js-action-finder');`)
    - `const` should be used for variables that aren't supposed to be changed.
- Including your file
    - Added the file to the list of imports in 'js/index.js'
    - List is in alphabetical order
    - Maintain alignment of the 'from' values
    - Node's import / export modules are used to bundle files
- JS classes
    - Never target CSS classes used for styling in your code
    - Use CSS classes that start with `js-` to target html elements (ie: `.js-accordion`)
    - Name your JS classes to be generic (ie: `.js-accordion`) or use the patterns name (ie: `.js-action-finder`)
- Code
    - Your code should start with a jQuery each statement to determine if the component exists and to allow it to work with multiple versions on the page
    - ES6 code is allowed and polyfilled to work with IE11
- Vendor files should always be loaded asychronously to avoid blocking the page from loading (ie: google APIs js files)

#### SVG icons
- SVG files are converted into twig files using the gulp svg2twig task
- Inline fill or stroke colors should be removed from the .svg file whenever possible


### Submitting your work

#### Creating a branch

Any new features and non-emergency bugfixes should branch from the `dev` branch.  Hot fixes (production bug fixes) should be branched from the latest release `tag` in the `master` branch.  

Make sure your local branch (`dev` for features, `master` for prod bugs) is up-to-date with the `upstream` repo (`massgov/mayflower`). 

If you just forked it, you're probably all set.  But if there have been a lot of changes to `massgov/mayflower` since you forked it, yours might be out of sync. Here's how to get yours in sync:

```
git checkout dev
git fetch upstream
git merge upstream/dev
git push origin dev
```

Now you can create your new branch:

```
git checkout -b my-issue-number-feature-name
```

If you were working on ticket DP-1234-create-backto-link, then you would type:

```
git checkout -b DP-1234-create-backto-link
```

#### Working with Pattern Lab

Serve Mayflower locally and as you save your changes, it will update automatically:

1. Read the [Pattern Lab docs](http://patternlab.io/docs/index.html)!
1. Run `gulp` from the `/styleguide` directory.
1. Browse to [http://localhost:3000/](http://localhost:3000/) (or port shown in gulp output if you've configured it differently)
1. Familiarize yourself with Mayflower:
    - You can use the menu to look at whole page layouts (pages), templates, components (organisms and molecules), child elements (molecules and atoms), and some nuts and bolts (base).
   - You can emulate different device sizes by using the size buttons at the top right of the menu bar (S M L FULL RANDOM DISCO).
   - You can learn about patterns by clicking the top right COG icon, then selecting "Show Pattern Info" from the drop down.
1. All work is done in the `/styleguide/source` directory.
    - Most patterns will have a `.twig` [markup file](https://twig.sensiolabs.org/), `.json` default [data file](http://patternlab.io/docs/data-pattern-specific.html), and `.md` [documentation file](http://patternlab.io/docs/pattern-documenting.html) in the `/styleguide/source/_patterns` directory.
    - If a pattern has styles associated with it, the corresponding `.scss` files can be found in the `/styleguide/source/assets/scss` directory.  We use [SMACSS](https://smacss.com/book/categorizing) to organize and [BEM](http://getbem.com/introduction/) to structure our [scss](http://sass-lang.com/guide) which gets compiled to css during build and automatically with the `gulp` task running.
     - If a pattern has js functionality associated with it, the corresponding [ES6 module](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) `.js` file can be found in the `/styleguide/source/assets/js/modules` directory.
1. These assets will automatically recompile and the browser will refresh as you save changes.

##### Other notes

* It is helpful to have 2 terminal tabs open when working on this project: one to manage `gulp` tasks and the other to manage `git`.  From the tab running `gulp`, type `CTRL` + `C` to kill that task when you're done.
* `gulp` will build the Pattern Lab static assets and generate a static site in the `/styleguide/public` directory.  See `/styleguide/tools/gulp/gulp-readme.md`.
* Pattern Lab specific files are in the `/styleguide/public/styleguide` directory (the `styleguide.html` file is automatically generated when twig templates are updated).

#### Committing your work

Make your changes and commit them.  Ensure that you only commit the thing you're working on.  Make sure that you commit in logical blocks.
 
Chris Beam explains  [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/):
>  ... a well-crafted Git commit message is the best way to communicate context about a change to fellow developers (and indeed to their future selves). A diff will tell you *what* changed, but only the commit message can properly tell you *why*.

We also love the model Git commit message in Tim Pope's [A Note About Git Commit Messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

#### Pushing your branch
In order to create a Pull Request (PR) where maintainers can review your work, you first need to push your branch to the `origin` remote (i.e. your Mayflower fork).

To push a new branch up to your fork:

```
git push -u origin DP-1234-create-backto-link
```

This will create the branch on your Mayflower fork. The `-u` flag links this branch with the remote one, so that in the future, you can simply type `git push origin`.

#### Deploying your work

Once your work is complete, deploy your branch to your Mayflower fork's Github Pages, so that its functionality can be tested and reviewed by someone who doesn't have Mayflower running locally.  See [our deployment docs](../docs/developer-deploy.md) for step by step instructions.

#### Creating a Pull Request
Pull requests (PRs) let you tell others about changes you've pushed to a repository on GitHub. Once a pull request is opened, you can discuss and review the potential changes with collaborators and add follow-up commits before the changes are merged into the repository.  

1. Follow the steps on [Github Help: Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).
    - Make sure that the "base fork" points to `massgov/mayflower` and that "base" (branch) points to `dev` for features, `master` for production bug fixes.
    - For your PR title, please use: `TICKET Description of ticket`, i.e. `DP-1234 Add back-to button on Announcement template`.  Follow the PR template for the rest of the information.  Keep in mind:
        - Anyone could be reading this Pull Request, so the content and tone may inform people other than those taking part, now or later.
        - Be explicit about what feedback you want, if any: a quick pair of eyes on the code, discussion on the technical approach, critique on design, a review of copy.
        - Be explicit about when you want feedback, if the Pull Request is work in progress, say so. A prefix of “[WIP]” in the title is a simple, common pattern to indicate that state.
        - @mention individuals that you specifically want to involve in the discussion, and mention why. (“/cc @jesconstantine for clarification on this logic”)
        - @mention teams that you want to involve in the discussion, and mention why. (“/cc @github/security, any concerns with this approach?”)

#### Review by Maintainers

Once you've opened your PR, Mayflower maintainers will review and either request changes or merge it.  

Thanks again!

***

## Acknowledgements

Thanks to the [Twitter Bootstrap](https://github.com/twbs/bootstrap) for having great contribution guidelines, and also to Rob Allen's [The beginner's guide to contributing to a GitHub project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/) and Matt Stauffer's [How to contribute to an open-source GitHub project using your own fork](https://mattstauffer.co/blog/how-to-contribute-to-an-open-source-github-project-using-your-own-fork) for providing helpful instructions on working with Github open source projects.
