# Getting Started

For purposes of consistency and usability, any Mass.gov-related site should be visually cohesive with the parent Mass.gov brand. It’s important that users know they are on an official government webpage, and the visual cues that come from using a cohesive design help convey that legitimacy.

## Mayflower as component libraries

Using Mayflower component libraries help you build fast, accessible, mobile-friendly, cross-browser compatible web products quickly and efficiently

Currently Mayflower has 2 component libraries:

1. [**Mayflower Patternlab**](mayflower-patternlab.md) \(PHP based\)
   1. Atomic design structure
   2. Twig templating language
   3. Generates component based HTML and compiled CSS and JS files
2. [**Mayflower React**](mayflower-react.md) \(JS based\)
   1. Atomic design structure
   2. JSX templating language
   3. Exports reusable React code by components

## Mayflower as static assets

If you have full access to front end code but are not able to implement either of the component libraries, the second best option is to implement Mayflower HTML markup and its generated static assets.

Use [**Mayflower Starters**](mayflower-starters.md) to kick-start a custom HTML page using Mayflower artifacts. Follow the instructions on how to host the page using Github Pages and embed it as an iframe on Mass.gov.

CDN resources for Mayflower generated static assets:

* Compiled CSS:
  * [ ](https://mayflower.digital.mass.gov/assets/css/base-theme-generated.css)[https://mayflower.digital.mass.gov/assets/css/base-theme-generated.css](https://mayflower.digital.mass.gov/assets/css/base-theme-generated.css)
  * [https://mayflower.digital.mass.gov/assets/css/index-generated.css](https://mayflower.digital.mass.gov/assets/css/index-generated.css)
* Compiled JS:
  * [https://mayflower.digital.mass.gov/assets/js/vendor-generated.js](https://mayflower.digital.mass.gov/assets/js/vendor-generated.js)
  * [https://mayflower.digital.mass.gov/assets/js/index-generated.js](https://mayflower.digital.mass.gov/assets/js/index-generated.js) 

Add the CSS files in the &lt;head&gt; and JS files right before the closing &lt;/body&gt; you should be able to use the html markup \(switch from Twig tab to HTML tab in the code view\) from our [Mayflower PatternLab component library](https://mayflower.digital.mass.gov/?view=c) to render Mayflower UI.

## Mayflower as styleguide

If the above implementation options are not availabe, you can still refer to Mayflower as a living styleguide. Keep in mind that its accessibility, performance, responsiveness and browser-compatibility are not guaranteed this way.

[**Mayflower Bootstrap**](mayflower-bootstrap.md) is a Mayflower inspired bootstrap theme. Refer to [Bootstrap V4 documentation](http://getbootstrap.com/docs/4.1/components/alerts/) for component implementation.

