# Atomic Design in Mayflower

## About Atomic Design
The Mayflower style library is built using Atomic Design. The way I tend to think of building a site using Atomic Design is to see it as a LEGO set where your combining a collection of small re-usable parts  to make a variety of different models.  Atomic Design is similar in nature, where you define a collection of small html parts called Atoms and then use those to build a variety of different components to build your site. 

You can find an excellent description of Atomic Design on Brad Frost's [blog](http://atomicdesign.bradfrost.com/chapter-2/). 

We are following his guide fairly closely, but I differ when it comes to Molecules and Organisms. He sees them as being defined based on their complexity, but I found in practice that it was difficult to make that distinction.  I like to think of Molecules as larger Atoms (components with custom styling or additional content) and Organisms as being smaller templates (component level)  

### Atoms (an "indivisible unit")
An Atom is the smallest possible pattern in Atomic Design.  They are the building blocks to create more complex Patterns.  In most cases, a simple html element (`a`, `h1`, `button`, etc...) is considered an Atom.  More complex html elements (`table`, `ul`, `figure`, etc...) are also considered Atoms, because the individual parts (`li`,`td`,`figcaption`) cannot be used on their own.

There can be cases where a simple html element is too small to be considered an Atom.  If your design creates a dependency between two elements, then they should be combined into a single Atom.  For example, an `input` is always supposed to be paired with a `label` for accessibility.  In this case, the `input` element alone would be too small to be an Atom.  Instead, you would pair the `input` with a `label` to create the Input Atom.


#### Quick guide:
* A simple html element (`a`, `h1`, `button`, etc...) or complex (`table`, `ul`, `figure`, etc...) HTML element
* Might pair html elements if there is a dependency
* Almost always uses a theme SCSS file to style the element
* Contains the smallest set of elements possible
* Almost always renders content data
* Can contain `include` statements to add an icon or another dependent Atom.

#### Examples
1. http://mayflower.digital.mass.gov/?p=atoms-button
    * This is an example of a single html element => `button` or `a` tag.
2. http://mayflower.digital.mass.gov/?p=atoms-input-checkbox
    * This is an example of an atom that can't be broken down any further.  The Mayflower style guide would never use the `input type=checkbox` element by itself so this atom requires the outer span tag and corresponding label. 


### Molecules - (stylized collection)
A Molecule is a stylized collection of Atoms, HTML elements and even other Molecules that are combined to create a new pattern for a simple task.  These patterns usually accomplish a single goal like a stylized link (ie: Callout Link) or a menu of links (ie: Footer Links).  Molecules have the greatest flexibility of all the patterns so please make sure you're not building an Atom or Organism.

#### Quick guide:
* Includes other patterns (Atoms or Molecules) or HTML elements
  * Currently, some patterns are incorrectly categorized so including an Organism is acceptable. (ie: Rich Text organism)
* Can render content data or pass it on to other patterns
* Almost always uses a theme SCSS file to style the element

#### Example
http://mayflower.digital.mass.gov/?p=molecules-image-promo
* This is an example of a molecule that includes other patterns, renders content data and has some theme-based css applied.


### Organisms - (layout of patterns)
An Organism is a layout of other patterns.  HTML5 elements and CSS styling used in an Organism are for laying out the included patterns.  All content to be rendered is passed on to the included patterns.  The only styling done for an Organism would be to help define the layout the patterns, like background-colors and borders.

#### Quick guide:
* Includes other patterns (Atoms, Molecules, or Organisms).
* All content data is rendered by included patterns.
* CSS styles used are only for layout (flex box, float ...) or to visually define the layout (backgrounds, borders)
* Often times it doesn't use a theme SCSS file
* Data used by the Organism is used to control the layout

#### Example
http://mayflower.digital.mass.gov/?p=organisms-event-listing
* This is an example of an organism that includes other patterns, passes all content data to another pattern, has theme based css related to layout applied, and has a data variable to switch between a list and grid views.

### Templates
* Template patterns define the layout and basic patterns needed when constructing a page.  Like Organisms, templates contain html elements to determine the layout and can include other patterns.  The also use Twig Blocks to provide locations for including additional patterns or overridding default patterns.

#### Quick guide:
* Similar to Organisms, but at the page level
* Provides the basic layout for a page
* Contains Twig Blocks to include optional patterns or to override default patterns
* Might have some CSS or JavaScript associated with it.

#### Example
http://mayflower.digital.mass.gov/?p=templates-location
* This is an example of a template for location type pages.
* There are several patterns included
* CSS is used to layout the basic structure of the page
* Additional Patterns can be added to two Twig Blocks, pageContent and sidebar
* The page header and the page footer are contained in Twig Blocks, pre-content and post-content, that can be overridden if needed. 

### Pages
Pages are used to show an example of how a template can be used.  Pages should extend an existing template to determine the basic layout for the page, use real content in the JSON similar to that used on the live site, and include any additional optional patterns to complete the page.  The page constructed should closely matche what we expect a final page to look like on the live site.

#### Quick guide:
* Extends a template
* Might include other patterns within a template's Twig Blocks
* Contains real content within the json data (when available)
* Rarely has any CSS or JavaScript associated with it

#### Example
http://mayflower.digital.mass.gov/?p=pages-location-park-content
* This is an example of a Location page
* It extends the location template
* Several patterns are included in the pageContent and sidebar Twig Blocks
* Real Content is used for the future Mt Greylock State Park page
* There is no CSS or JS directly associated with this page
