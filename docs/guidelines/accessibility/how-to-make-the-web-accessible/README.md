# How to make the web accessible

Before we go into approaches for making an accessible website, it is important to understand the basic pieces needed for anyone to access a website.

| Component | Description | Examples |
| :--- | :--- | :--- |
| **Web Content** | The informational content put on a website. | text, images, forms, multimedia \(audio, video, animation\), any markup code, scripts, applications |
| **Authoring Tools** | The tools to build a website. | code editors, document conversion tools, content management systems \(CMS\), blogs, database scripts |
| **User Agents** | The software people use to access web content. | desktop graphical browsers, voice browsers, mobile phone browsers, multimedia players, plug-ins , assistive technologies |

To be able to access a website, these components need to play well together. If web content is not available, you wouldn't see anything on the website. If authoring tools are not available, you couldn't have your information or messages on your website. If user agents are not available, you cannot get to the website or the content on the website. Every component is equally important to make a website available.

Web accessibility principles and techniques support these components, permitting websites to be available to broad range of users.

{% hint style="info" %}
Learn more about [how people with disabilities use the web](../global-why-accessibility-matters/global-obstacles.md).
{% endhint %}

## Think POUR

WCAG lays out four guiding principles that are important for creating an accessible web experience called POUR \(Perceivable, Operable, Understandable and Robust\). By following these guidelines from the design through to the implementation stages, Mayflower strives to provide an intuitive and fully accessible user experience.

|  |  |
| :--- | :--- |
| **Perceivable** | Starting at the most basic level, users must be able to process information. The information could be text, audio, static image, video, and so on, things presented in your website, which are referred as **web content**. |
| **Operable** | Overall, users can easily navigate, find content, and determine where they are. In particular users using alternatives like keyboard-based operations should be able to navigate and understand the content of your website. |
| **Understandable** | Understandable websites use clear, concise language and offer functionality that is easy to comprehend. Writing should be clear and concise. |
| **Robust** | Robust content is compatible with different browsers, assistive technologies, and other user agents. One of the best ways to meet the principle of robustness is to follow development standards and conventions. Clean code is generally more robust and consumable across platforms. |

## Checklist

This checklist is not intended to be a replacement or supplement for Section 508 Standards, but to help designers and developers check their work at every step of the process to conform to the Section 508 Standards and accessibility best practices.

### Ask these questions

* [ ] Is there anything on our website that a blind, deaf, low vision, or color blind user would not be able to perceive?
* [ ] Can all functions of our website be performed with a keyboard? Can users control interactive elements of our website? Does our website make completing tasks easy?
* [ ] Is all of the text on our website clearly written? Are all of the interactions easy to understand?
* [ ] Does our website only support the newest browsers or operating systems? Is our website developed with best practices?

### Check these components

{% page-ref page="semantic-markup.md" %}

{% page-ref page="language.md" %}

{% page-ref page="animation-and-timeouts.md" %}

{% page-ref page="color-and-contrast.md" %}

{% page-ref page="keyboard-access.md" %}

{% page-ref page="multimedia.md" %}

{% page-ref page="alternative-text.md" %}

{% page-ref page="graphics.md" %}

{% page-ref page="predictable-flow.md" %}

{% page-ref page="forms.md" %}

