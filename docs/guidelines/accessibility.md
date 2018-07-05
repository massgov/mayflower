---
description: >-
  Mass.gov and other Massachusetts government websites must comply with 508c
  which is defined by the WCAG-AA web-standard.
---

# Accessibility

In addition to the following items below individual components, colors and page layouts may also have additional accessibility notes. For design purposes the following at minimum must be met, though there may be other applicable guidelines.

## Accessibility Guidelines

### Standards

* WCAG 2.0
* AA

### Contrast

* For font sizes under 18 point  \(or 14 points if bold\) contrast must be a minimum of 4.5:1
* For font sizes greater than 18 points \(or 14 points if bold\) contrast must be a minimum of 3:1

### **Color**

* Color cannot be the only means of displaying information. Additional items such as a label, higher contrast or another visual cue must be used.

### Images and other Non-Text Content

* All non-text content must have a text alternative on the page that displays the same information such as
  * Alt tags or aria labels on all images \(these must describe what is happening within the image\)
    * In the event an image is purely decorative in nature the alt tag must be present but should be blank
    * Note that items such as stock photography or landscapes are not considered purely decorative and must have the appropriate descriptors
  * Transcriptions of video or closed captioning

#### Iconography

Note that iconography is a special type of image content.

* * Current guidelines display all icons with a label underneath them
  * If this guideline is followed then the alt tag should be left empty \(but it should still exist\)
  * If the label is removed then an alt tag with proper information must be applied

### **Links**

* The purpose of a link can be determined from the link text alone or or from the text combined with programmatically determined content
  * The largest errors usually found here are on article preview links or similar where there may be multiple links on a page stating “read more” or other similar repeatable text, this should be avoided.
* Additionally links that are not links but items such as files, e-mail to links and phone numbers should be clearly labeled as such

### Rich Text Editors

* These should be used sparingly across the site. Rich text editors have the potential to easily break 508c compliance as many of the programmatic fail safes that exist will not happen within a rich text editor
* If a rich text editor is used the content author needs to be sure to follow good programming guidelines if using HTML \(such as semantic markup and using appropriate labels\)
* Additional focus also needs to be taken on headings, labels and other items to guarantee an [adherence to the pages navigability](https://www.w3.org/WAI/WCAG20/quickref/?currentsidebar=%23col_overview&showtechniques=111%2C141%2C143&levels=aaa#navigation-mechanisms)

### Headings

* Headings should not be used to convey style items
* Headings must be hierarchical and properly nested \(all h2’s within an h1 etc\) so as to maintain proper navigability for low or non-sighted users

### **Tables**

The current tables as defined in components are accessible. However these tables must be used appropriately in-order to remain so. The following rules must be adhered too

* Only use tables for tabular data \(don’t use tables for styling purposes\)
* All labels within a table must be next to the data they are labeling \(the current examples adhere to this pattern\)

## **Accessibility Checkers**

Note that the following checkers will only catch programmatic misses such as missing alt tags or improper contrast ratios. Many accessibility errors can only be caught by humans and hence online checkers should only be one part of the confirmation process.

* [Wave](http://wave.webaim.org/)
* [Access Valet](http://valet.webthing.com/access/url.html)
* [A Checker](https://achecker.ca/checker/)

## **Additional Resources and Guidelines**

Generally speaking the rules above do not encompass the entirety of all accessibility considerations on the site and additional information may be necessary. Further resources can be found below

* [WCAG Quick Reference](https://www.w3.org/WAI/WCAG20/quickref/)
* [Entirety of the WCAG 2.0 Guidelines](https://www.w3.org/TR/WCAG20/)
* [Web Aim which is an independent company with good information](http://webaim.org/)

