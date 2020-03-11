# Mayflower Starters

{% hint style="info" %}
[**Mayflower Starters github repo**](https://github.com/massgov/mayflower-starters)
{% endhint %}

{% hint style="info" %}
[**Mayflower Starters live examples**](https://massgov.github.io/mayflower-starters/)
{% endhint %}

## Explanation of Github Pages for hosting apps

With the GitHub pages everytime an individual pushes to master branch the code will be updated on the live site. This could take about \(~10 minutes\) depending on how many dependencies the application is using within the code.

If the user is adding code to the develop branch it will not apppear on the GitHub Page until a Pull Request \(PR\) has been created to merge the develop branch into the master branch. Below shows a Pull Request being created with develop branch merged into master branch.

![Merging develop branch into Master branch](https://massgov.github.io/iframe-quickstart/develop-master.png)

## Explanation of Mayflower

Mayflower is an open source repository that was created to be used on the Mass.gov website theming. With Mayflower being an open source it allows multiple other agencies to have access to this theming.

To use Mayflower in theming components for a widget or application:

### Steps in adding a Mayflower component to the repository

1. What components are needed for the widget or application?

   _Here are some Mayflower components the repository might use:_

   * [Buttons](http://mayflower.digital.mass.gov/?p=viewall-atoms-buttons)
   * [Forms](http://mayflower.digital.mass.gov/?p=viewall-atoms-forms)
   * [Headings](http://mayflower.digital.mass.gov/?p=viewall-atoms-headings)
   * [Icons](http://mayflower.digital.mass.gov/?p=viewall-atoms-icons)
   * [Lists](http://mayflower.digital.mass.gov/?p=viewall-atoms-lists)
   * [Media](http://mayflower.digital.mass.gov/?p=viewall-atoms-media)
   * [Table](http://mayflower.digital.mass.gov/?p=viewall-atoms-table)
   * [Text](http://mayflower.digital.mass.gov/?p=viewall-atoms-text)
   * [Divider](http://mayflower.digital.mass.gov/?p=atoms-divider)

2. Base, Atoms, and Molecules within Mayflower are the building blocks for elements that could be used in iFrame.
   * Base - Colors
   * Atoms - Buttons, Forms, Headings, Icons, Lists, Media, Table, Text, Divider, and Decorative Link
   * Molecules - Callout Link and Field Submit
3. Let's say the widget needs to use a [Comp Heading](http://mayflower.digital.mass.gov/?p=atoms-comp-heading). Here is how to add a component to html page 1. Click Atoms in the Mayflower navigation 1. Go to Headings which will expand to show all headings 1. Click on the Comp Heading 1. Within the page it will show the component click the Tools 1. In the Tools click the Show Patterns Info 1. The patterns will appear on the page click the HTML tab. 1. Copy the html code

   ```text
      <h2 class="ma__comp-heading" id="GUID9827924" tabindex="-1">Title text</h2>
   ```

   1. Paste the code to the html page and replace the _Title Heading_ and _id_

Next steps to add CSS and Javascript to the html page:

1. In the `<header> </header>` section the following will be added:

   ```text
     <link rel="stylesheet" href="https://mayflower.digital.mass.gov/patternlab/assets/css/base-theme-generated.css"  media="all" />
     <link rel="stylesheet" href="https://mayflower.digital.mass.gov/patternlab/assets/css/index-generated.css" media="all" />
     <script src="https://mayflower.digital.mass.gov/patternlab/assets/js/vendor/modernizr.js"></script>
   ```

   Explanation of adding the following CSS and Javascript files to the html page:

   * `base-theme-generated.css` is theme such as fonts and colors of components within Mayflower
   * `index-generated.css` is all components within Mayflower

2. Before the `</body>` tag add the following:

   ```text
     <!--Notes that this Mayflower assets-->
     <script src="https://mayflower.digital.mass.gov/patternlab/assets/js/vendor-generated.js"></script>
     <script src="https://mayflower.digital.mass.gov/patternlab/assets/js/index-generated.js"></script>
   ```

   Explanation of adding the following Javascripts files to the html page

   * `vendor-generated.js` is 3rd party dependecies such as jQuery.
   * `index-generated.js` is all components within Mayflower

## Links to Mayflower, GitHub, and GitHub Pages documentation

### Mayflower

1. [Mayflower GitHub Repository](https://github.com/massgov/mayflower)
2. [Mayflower website](https://mayflower.digital.mass.gov/patternlab/) using the GitHub Pages to publish the website.
3. [Example of Resposity which uses Mayflower \(RMV Wait Time Widget\)](https://github.com/massgov/rmvwaittime)

### GitHub

1. [GitHub Guides](https://guides.github.com/)
2. [On Demand Training for GitHub](https://services.github.com/on-demand/)
3. [GitHub Help](https://help.github.com/)

### GitHub Pages

1. [GitHub Pages Basics](https://help.github.com/categories/github-pages-basics/)
2. [GitHub Pages from GitHub Desktop](https://services.github.com/on-demand/github-desktop/)
3. [Troubleshooting GitHub Pages build](https://help.github.com/articles/troubleshooting-github-pages-builds/)
4. [What is GitHub Pages? \(YouTube video\)](https://youtu.be/2MsN8gpT6jY)

