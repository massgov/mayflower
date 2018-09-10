# How people with disabilities use websites

Mary audience and including those who may have difficulty with some of the content. People with disability might need some assistance to use websites depending on their conditions. Not all of them need assistance to use a website, but their user experience could be much better with a mindfully created website.

Understanding [their obstacles](https://github.com/massgov/edit-mayflower-docs/tree/2dd65c3a6517f7982b93ad0772be51cea6997750/docs/guidelines/accessibility/LINK%20to%20Obstacles%20to%20use%20websites/README.md) would help us creating practically accessible websites.

## Visual disabilities

**Blindness**

People who are blind are not able to see things as well as those who are not blind. Although it's true that most blind people do have some degree of vision, it could be said that whatever vision they have is not useful enough for using the web. A computer monitor and mouse would be much less useful to a person who is blind. It's not that blind people are incapable of moving or clicking a mouse; it's just that they don't know where to move it or when to click it, since they can't see what's on the screen.

People with substantial, uncorrectable loss of vision in both eyes generally use [**screen readers**](http://www.afb.org/prodBrowseCatResults.aspx?CatID=49) such as VoiceOver for Mac OS, JAWS for Windows, and so on.

Screen readers read aloud a web page based on how the page is structured as markup, which might not reflect how the page is visually laid out.

Screen readers can also be used by **those who are both deaf and blind**. Rather than convert text into speech, screen readers for the deaf-blind convert text into Braille characters on refreshable Braille devices, which have small pins that can be raised or lowered to form Braille characters which the deaf-blind individual can feel.

**Obstacle 1: Unstructured presentation**

If the page is not marked up in a reading order the page content makes sense, they would have a difficult time to navigate the page and comprehend the content.

The flow of the page elements such as header, footer, navigation, main content area, and so on really matters to screen readers to understand what is going on in the page.

**Obstacle 2: Non-semantic content**

Screen readers process the content as it's marked up. The content doesn't have semantic markup could miss its context to pass on and makes it harder to understand to the users.

Screen readers recognize headings, links, lists, forms, and so on, and announce what those elements are before reading through their contents.

**Obstacle 3: Non-text content missing text alternative presentation**

If images, movies, videos don't have their alternative text presentation, screen readers cannot accurately convey their content.

**Obstacle 4: Keyboard inaccessibiilty**

Screen reader users use their keyboard as their primary means of navigating the web. If a website is unable to navigate with keyboard, they wouldn't be able to use the website.

**Low vision**

The visual acuity of people with low vision varies widely, but, in general, low vision is defined as a condition in which a person's vision cannot be fully corrected by glasses, thus interfering with daily activities such as reading and driving.

The most common technology used by people with low vision is [screen magnifiers](http://www.afb.org/prodBrowseCatResults.aspx?CatID=39), assistive technology to adjust the page elements' contrast to suit their vision condition.

Some might need high contrast. Some might need to tone down bright colors because of their sensitivity to a light\(= brightness\).

Some people with low vision will change the settings in their operating system and/or browser to not only enlarge the text, but to increase the contrast of the text in relation to the background.

**Obstacle 1: Text presented in graphics**

Some kinds of content are difficult to interpret when enlarged. For example, graphics that contain text can become blocky and pixilated, making the text difficult to understand.

**Obstacle 2: Horizontal scrolling**

Espeially for screen magnifiers users, websites require to use horizontal scrollbar is difficult to use since they browse a page little by little enlarging a small section of the page.

**Color-blindness**

People with color blindness might use assistive technology to transform colors by converting to ones they can recognize. But, you'd better prepare your website assuming they don't use assistive technology.

[You can see how people with color-blindness would see colors](https://webaim.org/articles/visual/colorblind).

**Obstacle: no alternative presentation to colors**

When the colors, only the colors, convey important information, for example using a color they cannot recognize to indicate something important becomes a problem to them. Under these circumstances you will need to either change the graphic or provide an additional means of obtaining the same information. Oftentimes the most appropriate way to do this is to provide an explanation in the text itself.

## Auditory disabilities

Most of people with deafness and hard-of-hearing rely on visual presentation of information. Depending on their severity of hard-of-hearing, they might be able to obtain audio content with some adjustment.

**Obstacle 1: no alternative visual presentation of audio content**

* Audio content, such as videos with voices and sounds, without captions or transcripts.
* Web-based services, including web applications, that rely on interaction using voice only.
* Lack of sign language to supplement important information and text that is difficult to read.

**Obstacle 2: no control options for media players**

* Media players that do not display captions and that do not provide volume controls.
* Media players that do not provide options to adjust the text size and colors for captions.

## Physical disabilities \(sometimes called “motor disabilities”\)

The conditions for physical disabilities vary in their types and severities. Most likely they have difficulty to use a mouse and/or keyboard.

To use the Web, people with physical disabilities often use specialized hardware and software such as:

* Ergonomic or specially designed keyboard or mouse;
* Head pointer, mouth stick, and other aids to help with typing;
* On-screen keyboard with trackball, joysticks, or other pointing devices;
* Switches operated by foot, shoulder, sip-and-puff, or other movements;
* Voice recognition, eye tracking, and other approaches for hands-free interaction.

People with physical disabilities may be using a mouse or mouse-like device only, or keyboard or keyboard-like device only to operate the computer. **People with physical disabilities rely on keyboard support to activate functionality provided on web pages.** They may need more time to type, click, or carry out other interaction, and they may type single keystrokes in sequence rather than typing simultaneous keystrokes \(“chording”\) to activate commands. Such keystrokes include commands for special characters, shortcut keys, and to active menu items.

People with physical disabilities may have trouble clicking small areas and are more likely to make mistakes in typing and clicking. Providing large clickable areas, enough time to complete tasks, and error correction options for forms are important design aspects. Other important design aspects include providing visible indicators of the current focus, and mechanisms to skip over blocks, such as over page headers or navigation bars. People with cognitive and visual disabilities share many of these requirements.

**Obstacle 1: lack of keyboard support**

Websites and web browsers that do not provide full keyboard support.

**Obstacle 2: lack of time to complete a task**

Insufficient time limits to respond or to complete tasks, such as to fill out online forms.

**Obstacle 3: lack of alternative presentation**

Controls, including links with images of text, that do not have equivalent text alternatives.

**Obstacle 4: poor presentation**

Missing visual and non-visual orientation cues, page structure, and other navigational aids.

Inconsistent, unpredictable, and overly complicated navigation mechanisms and page functions.

## Cognitive \(reading and understanding\)

The concept of cognitive disabilities is extremely broad, and not always well-defined. In loose terms, **a person with a cognitive disability has greater difficulty with one or more types of mental tasks than the average person**.

In fact, one may reasonably argue that a great deal of web content cannot be made accessible to individuals with profound cognitive disabilities, no matter how hard the developer tries. Some content will always be too complex for certain audiences. This is unavoidable. Nevertheless, there are still some things that designers can do to increase the accessibility of web content to people with less severe cognitive disabilities.

Usually, the best advice to help users with cognitive disabilities is to provide information in multiple formats, with a heavy emphasis on visual formats. Even though most web content suffers for a lack of visually-enhanced communicative methods, the take-home message is that no one method is sufficient by itself. **Supplement the information with multiple modes and methods of communication**.

The main categories of functional cognitive disabilities include deficits or difficulties with:

**Obstacle 1: Memory**

Some users may have memory difficulties that impair their ability to remember how they got to content.

Any kind of reminder of the overall context of a web site can help people with memory deficits.

**Obstacle 2: Problem-solving**

Some individuals have a difficult time solving problems as they arise. In many instances, their resilience can be low and the resulting frustration is such that they choose to leave the site and not persist to solve the problem.

Providing instructions at the start of a task will eliminate or at least reduce the overall number of user errors.

Error messages should be as explanatory as possible, telling users what they did wrong and how to fix the problem.

Also, avoid extreme changes in the context of the web site without first warning users.

All functionality should be as predictable as possible, and any deviations from predictability should be preceded by warnings and/or explained to users after the changes occur.

**Obstacle 3: Attention**

There are many individuals that have difficulty with focusing their attention to the task at hand. Distractions like below can make the web environment difficult or even impossible:

* scrolling text
* blinking icons
* pop-up windows  

Avoiding anything that draws a person's attention away from the main content and using good design, such as color, white space, and simple presentation can help users focus on important content and functionality.

**Obstacle 4: Reading, linguistic, and verbal comprehension**

Some individuals have difficulties understanding text in various severities like the brightest minds of recent generations such as Albert Einstein, Thomas Edison, and Henry Ford.

It would be unreasonable to expect web developers and content authors to accommodate the entire range of reading abilities. It is reasonable, however, to expect content authors to **write as simply and clearly as is feasible**, taking into account the primary audience and including those who may have difficulty with some of the content.

**Non-Literal Text**

Non-literal text, such as sarcasm, satire, parody, allegory, metaphor, slang, and colloquialisms, can be a problem for some readers.

**Non-Existent Text**

The unstated assumptions and implied meaning of written content may seem obvious to the writer, but readers may not have the necessary background knowledge. Some readers may not have the skills to infer meaning from text without additional help.

**Obstacle 5: Math comprehension**

Mathematical expressions are not easy for everybody to understand.

For people who are comfortable reading equations and thinking mathematically, the best way to explain mathematical concepts is to use equations. On the other hand, often it is helpful to explain math conceptually, either with or without the formulas.

Conceptual explanations help readers understand the reasoning behind the math.

**Obstacle 6: Visual comprehension**

Some individuals have difficulties processing visual information, the opposite of the problem experienced by people with reading and verbal processing difficulties.

They may recognize the fact that there are objects on a web page, but may not be able to identify the objects.

For example, they may not realize that a photograph of a person is a representation of a person, though they can plainly see the photograph itself \(as an object\) on the web page.

For these people, a moving, talking person in a video may be easier to identify and mentally process than a static image of a person in a photograph. Video and multimedia, accompanied with narration, may be the best way to communicate to these individuals.

### Seizure

Some people are susceptible to seizures caused by **strobing**, **flickering**, or **flashing** effects. This kind of seizure is sometimes referred to as a photoepileptic seizure because it is caused by pulses of light \(hence the prefix "photo"\) interacting with the eye's light-receptive neurons and the body's central nervous system.

Most web content is completely harmless to individuals with photoepileptic tendencies. Even most animations, videos, moving text, and Flash objects do not present any danger.

We should still make every effort to ensure that our content does not have strobing, flickering, or flashing effects.

### Vestibular disorders

Even if an animating or moving object does not cause a seizure, it may cause nausea or dizziness in some people.

The following items can result in difficulties for users with vestibular disorders:

* High contrast graphics with tight parallel lines.
* Animated scrolling that lasts longer than perhaps 1/4 second.
* Parallax or reverse parallax - simultaneous foreground and background scrolling in different directions or at different speeds.
* Moving images beneath static text.

\[TO DO: ADD NEXT STEP LINKS\]

* [What you can do to make your website accessible](https://github.com/massgov/edit-mayflower-docs/tree/940a489a97dd344008fe3e5e245fb321b63e5405/docs/guidelines/global-implement-accessibility.md)

