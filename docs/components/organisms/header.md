# Header

This is the global masthead of the Mass.gov site, and is comprised of a few distinct sections. The main/primary navigation and associated dropdowns \(Living, Working, Learning, Visiting & Exploring and Your Government\), the utility navigation and associated dropdown or drawer of links, search and the button to take users to the classic Mass.gov.

| ![Header on Desktop 1024px](https://mayflower.digital.mass.gov/patternlab/capture/capture_03-organisms-by-template-header_0_document_1_tablet.png) | ![Header on Mobile 320px](https://mayflower.digital.mass.gov/patternlab/capture/capture_03-organisms-by-template-header_0_document_0_phone.png) |
| :--- | :--- |


{% hint style="info" %}
[**Mayflower PatternLab Header Pattern**](https://mayflower.digital.mass.gov/patternlab/?p=organisms-header&view=c)
{% endhint %}

{% hint style="info" %}
\*\*\*\*[**Mayflower React Header Component**](https://mayflower.digital.mass.gov/react/?selectedKind=organisms&selectedStory=Header&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)\*\*\*\*
{% endhint %}

## Placement & Guidelines

* Should appear at the top of every Mass.gov page.
* Should only be used if the page can be accessed through the site, do not use this header if the page content does not live on the site.   
* The utility navigation has three links with associated icons:
  * A Google language dropdown to translate the site \(note: Google requires the branded Google icon next to the globe icon\)
  * A link for State Organizations, which sends users to an A-Z listing of state organizations. The icon here is meant to represent the State House.
  * A link to expand the drawer with links popular login pages, which is determined by analytics data. The login pages are:
    * Virtual Gateway \(snap\)
    * Unemployment Online
    * Child Support Enforcement    
* The functionality of the primary navigation accounts for hover behavior, so that a user can hover over the navigation items with their mouse and the have the dropdown expand.
* As these items also represent site section landing pages that a user needs to be able to navigate to no matter what kind of device they’re on or assistive technology they’re using, the navigation item is repeated at the bottom of the dropdown list. This way, when hover technology is not available, a user can click on the navigation item to expand it, and use the repeated navigation item to navigate to the page.
* On mobile, the menu becomes a drawer that slides in from the right side of the screen after tapping “MENU”. Search stacks above the main menu, which stacks above the utility navigation. Tapping on any of the items with arrows will slide over another screen with subnav items or utility nav content. Fonts are decreased across the board.

## Accessibility Checks

* Headers must be checked within the context of the page to guarantee proper nesting.
* Headers should only be used to display semantic information that provides hierarchy, using headers for styling purposes without the appropriate hierarchy is incorrect.

