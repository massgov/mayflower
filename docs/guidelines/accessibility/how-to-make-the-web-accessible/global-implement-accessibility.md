# What you can do to make your website accessible

The [Web Content Accessibility Guidelines \(WCAG\) 2.0 and 2.1](https://www.w3.org/WAI/standards-guidelines/wcag/) help you to [make your website available to more people](https://github.com/massgov/edit-mayflower-docs/tree/2d579cba5a280af6e4bd5fd08eabde4b3e71383b/docs/guidelines/accessibility/global--accessibility-definition.md). By following the guidelines, you would offer better user experiences to broad range of people use your website.

[Planning and Managing Web Accessibility](https://www.w3.org/WAI/planning-and-managing/) would be helpful to determine what steps to take to make your website accessible.

However you starts, it is important to [have a good foundation](global-implement-accessibility.md#cover-the-basic) to work on and [understand the basic concepts](global-implement-accessibility.md#meet-more-user-needs) to support your initiative to be successful.

## Cover the basic {#cover-the-basic}

To create an accessible website, let's start with a good foundation.

### Web standards

Separating a website in three layers:

* Structure \(content/html\)
* Presentation \(style/css\)
* Behavior \(script - JavaScript, PHP, etc.\)

Learn more:

* [Web Standards - Keeping Everything Compatible](https://www.whoishostingthis.com/resources/web-standards/)

### Semantic HTML

HTML \(Hypertext Markup Language\) is not a programming language; it is a markup language used to tell a browser how to structure the web pages. Semantic markup creates a structure to the content.

One of HTML's main jobs is to give text structure and meaning \(also known as semantics\) so that a browser can display it correctly. Each element has its own definition and role understood by browsers. Assistive technology such as screen readers also use such definitions. Using HTML elements as predefined is the first step to create an accessible website.

**Don't reinvent the wheel.** Use right HTML elements with their existing definitions for their right jobs. If they need some more help, then, use CSS and JavaScript to fill their missing parts.

Learn more:

* [Why Use Semantic HTML?](https://www.lifewire.com/why-use-semantic-html-3468271)
* [Accessibility Through Semantic HTML](https://24ways.org/2017/accessibility-through-semantic-html/)
* [G115: Using semantic elements to mark up structure](https://www.w3.org/TR/WCAG20-TECHS/G115.html)

### Valid markup

First, a website should be processed and displayed properly in multiple browsing devices. Valid markup supports that.

* [Markup Validation](https://validator.w3.org/)
* [CSS Validation](https://jigsaw.w3.org/css-validator/)

## Meet more user needs {#meet-more-user-needs}

With a good foundation, your website is ready to meet more user needs. What are the user needs? [Designing for accessibility is not that hard - Seven easy-to-implement guidelines to design a more accessible web ❤️](https://uxdesign.cc/designing-for-accessibility-is-not-that-hard-c04cc4779d94) is a good place to start finding answers for the question.

There are four main principles to make our website accessible based on these basic concepts:

* Understanding the user's perspective and needs
* Moving beyond technical accessibility
* Focusing on the principles of accessibility

### PERCEIVABLE information and user interface

Starting at the most basic level, users must be able to process information. The information could be text, audio, static image, video, and so on, things presented in your website, which are referred as **web content**.

Information that is not presented in a processable format is not accessible. Websites and apps that require sight or hearing won't pass the test of perceivability.

**Text alternatives for non-text content**

Text alternatives convey the purpose of an image or function to provide an equivalent user experience. For examples:

* Short equivalents for images, including icons, buttons, and graphics;
* Description of data represented on charts, diagrams, and illustrations;
* Brief descriptions of non-text content such as audio and video files;
* Labels for form controls, input, and other user interface components.

**Captions and other alternatives for multimedia**

Among other affordances, this means providing text for those who cannot hear, and audio for those who cannot see. It does not mean creating audio for all text, but content must be consumable by screen readers and other assistive technologies.

**Content can be presented in different ways**

Since not everyone has the same abilities or equal use of the same senses, one of the main keys to accessibility is ensuring that information is transformable from one form into another, so that it can be perceived in multiple ways.

Organize information to have with meaning \(semantic structure\). Design with text and create information hierarchies. When the presentation is disabled, the web content should still be able to communicate its message effectively.

**Content is easier to see and hear**

* Color is not used as the only way of conveying information or identifying content
* Default foreground and background color combinations provide sufficient contrast
* Text is resizable up to 200% without losing information, using a standard browser
* Images of text are resizable, replaced with actual text, or avoided where possible
* Users can pause, stop, or adjust the volume of audio that is played on a website
* Background audio is low or can be turned off, to avoid interference or distraction

**Ask yourself**: Is there anything on our website that a blind, deaf, low vision, or color blind user would not be able to perceive?

#### OPERABLE user interface and navigation

**Functionality is available from a keyboard**

Not everyone uses a standard keyboard and mouse to access the web. Some people use adaptive devices or alternative devices that accommodate their disabilities. Some people simply prefer to use the alternative technologies. Many users with disabilities cannot operate a mouse. Alternatives like keyboard-based operation should be implemented.

Keyboard accessibility includes:

* All functionality that is available by mouse is also available by keyboard;
* Keyboard focus does not get trapped in any part of the content;
* Web browsers, authoring tools, and other tools provide keyboard support.

**Users have enough time to read and use the content**

Some people need more time than others to read and use the content. For instance, some people require more time to type text, understand instructions, operate controls, or to otherwise complete tasks on a website.

Examples of providing enough time include providing mechanisms to:

* Stop, extend, or adjust time limits, except where necessary;
* Pause, stop, or hide moving, blinking, or scrolling content;
* Postpone or suppress interruptions, except where necessary;
* Re-authenticate when a session expires without losing data.
* Time limits for completing an action should be generous or configurable.

**Content does not cause seizures**

Content that flashes at certain rates or patterns can cause photosensitive reactions, including seizures. Flashing content is ideally avoided entirely or only used in a way that does not cause known risks.

**Users can easily navigate, find content, and determine where they are**

With web pages or sections of Web content, users should be able to bypass extraneous or irrelevant pieces of content in order to focus on the content of interest to them. They should be able discern the structure of the content by its headings, subsections, bulleted lists, and other elements of semantic markup.

Well organized content helps users to orient themselves and to navigate effectively. Such content includes:

* Pages have clear titles and are organized using descriptive section headings;
* There is more than one way to find relevant pages within a set of web pages;

  Users are informed about their current location within a set of related pages;

* There are ways to bypass blocks of content that are repeated on multiple pages;
* The keyboard focus is visible, and the focus order follows a meaningful sequence;
* The purpose of a link is evident, ideally even when the link is viewed on its own.

**Ask yourself**: Can all functions of our website be performed with a keyboard? Can users control interactive elements of our website? Does our website make completing tasks easy?

### UNDERSTANDABLE information and user interface

If users can perceive and operate a website, that doesn't mean they can understand it. Understandable websites use clear, concise language and offer functionality that is easy to comprehend. Writing should be clear and concise.

**Text is readable and understandable**

* Identifying the primary language of a web page, such as Arabic, Dutch, or Korean;
* Identifying the language of text passages, phrases, or other parts of a web page;
* Providing definitions for any unusual words, phrases, idioms, and abbreviations;
* Using the clearest and simplest language possible, or providing simplified versions.

**Content appears and operates in predictable ways**

Many people rely on predictable user interfaces and are disoriented or distracted by inconsistent appearance or behavior. Examples of making content more predictable include:

* Navigation mechanisms that are repeated on multiple pages appear in the same place each time;
* User interface components that are repeated on web pages have the same labels each time;
* Forms should follow a logical flow and provide clear labels.
* If a user takes an action, the connection between the action and the result should be obvious. 
* Significant changes on a web page do not happen without the consent of the user.

**Users are helped to avoid and correct mistakes**

Sites and apps should be forgiving. All people, not just those with disabilities, make mistakes through forms and other interaction, which can be confusing or difficult to use. Examples of helping users to avoid and correct mistakes include:

* Descriptive instructions, warnings, error messages, and suggestions for correction;
* Context-sensitive help for more complex functionality and interaction;
* Opportunity to review, correct, reverse submissions, or cancellation options if necessary.

If this feels like usability and not accessibility, that's because usable websites are inherently more accessible.

**Ask yourself**: Is all of the text on our website clearly written? Are all of the interactions easy to understand?

#### ROBUST content and reliable interpretation

**Content is compatible with current and future user tools**

Users pick their own mix of technologies. Within limits, websites should work well-enough across platforms, browsers, and devices to account for personal choice and user need.

Robust content is compatible with different browsers, assistive technologies, and other user agents. One of the best ways to meet the principle of robustness is to follow development standards and conventions. Clean code is generally more robust and consumable across platforms.

* Ensuring markup can be reliably interpreted, for instance by ensuring it is valid;
* Providing a name, role, and value for non-standard user interface components.

**Ask yourself**: Does our website only support the newest browsers or operating systems? Is our website developed with best practices?

\[TO DO: NAVIGATE TO MAYFLOWER SPECIFIC ITEMS.\]

