[⬅️ a11y Checklist](a11y-checklist.md)

# Sections `<section>`

## ➤➤ Does the section have a [heading](headings.md)?


**➣ Yes:** 
[Move to the Headings section. ➡️](headings.md)

**➢ No:**
A `<section>` element requires an `<h#>`. A  `<section>` without a heading is invalid HTML5.
Move to the following question to find out more. ⬇️

## ➤➤ Does the section have a heading label content in other HTML tag to describe the section?

📋 Consider using that content as a heading for the section, and place it before the main content.

**➣ Yes:** Follow the steps below to set up the heading.
> 1. Replace the tag with `<h#>`.
> 
> 1. Position the heading right below the `<section>` as its first child element.
> 
> 1. [Go to the Headings section to check your heading. ➡️](headings.md)

**➢ No:**
Move to the following question. ⬇️

## ➤➤ Does the section need a heading? 

📋 You might need to confirm with the UX or content team:

1. whether it needs a heading or not,
1. what the heading label would be.

**➣ Yes:** Let's add a heading!

> 1. Add a heading using `<h#>`.
> 
> 1. Position the heading right below the `<section>` as its first child element.
> 
> 1. [Then, go to the Headings section to check your heading. ➡️](headings.md)

**➢ No:** Don't use `<section>`.

> Replace `<section>` with `<div>` or other proper semantic container element.

---
[⬅️ a11y Checklist](a11y-checklist.md)

