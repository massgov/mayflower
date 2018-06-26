---
description: layout of patterns
---

# Organisms

## Overview:

An Organism is a layout of other patterns. HTML5 elements and CSS styling used in an Organism are for laying out the included patterns. All content to be rendered is passed on to the included patterns. The only styling done for an Organism would be to help define the layout the patterns, like background-colors and borders.

## **Quick guide:**

* Includes other patterns \(Atoms, Molecules, or Organisms\).
* All content data is rendered by included patterns.
* CSS styles used are only for layout \(flex box, float ...\) or to visually define the layout \(backgrounds, borders\)
* Often times it doesn't use a theme SCSS file
* Data used by the Organism is used to control the layout

## **Example**

​[http://mayflower.digital.mass.gov/?p=organisms-event-listing](http://mayflower.digital.mass.gov/?p=organisms-event-listing)​

* This is an example of an organism that includes other patterns, passes all content data to another pattern, has theme based css related to layout applied, and has a data variable to switch between a list and grid views.

