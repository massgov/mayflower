[⬅️ a11y Checklist](a11y-checklist.md)

# Sections `<section>`

## ➤➤ Does the section have a [heading](headings.md) for it?


**➣ Yes:** 
[Move to the Headings section. ➡️](headings.md)

**➢ No:**
`<section>` requires `<h#>`. Missing `<h#>` is invalid as HTML5.
Move to the following question to find out more. ⬇️

## ➤➤ Does the section have a heading label content in other HTML tag to describe the section?

📋 You can consider the heading level content as a title for the section. It's generally placed before its main content.

**➣ Yes:** Follow below steps to set up the heading.
> 1. Replace the tag with `<h#>`.
> 
> 1. Position the heading close to the `<section>` if possible. 
> 
>   It might need to be wrapped with container elements for styling, but a closer placement to the `<section>` is better.
> 
> 1. [Go to the Headings section to check your heading. ➡️](headings.md)

**➢ No:**
Move to the following question. ⬇️

## ➤➤ Does the section contain a page title?

**➣ Yes:** A page title markup is inside the `<section>`.

**🛑 A page title component, which contains `<h1>` for a page title shouldn't be inside `<section>` unless the entire page content portion is wrapped with `<section>`.**

In Mass.gov, `<h1>` is reserved for a page title.

Headings in `<section>`s are meant for a label for the `<section>` it resides in. 

When `<h1>` for a page title is inside a `<section>` and the `<section>` is NOT wrapping the *entire* page content, the `<h1>` is semantically NOT representing the page title.

> Don't use `<section>`. Replace `<section>` with `<div>` or other proper semantic container element.

**➢ No:** It doesn't contain a page title. Move to the following question. ⬇️

## ➤➤ Does the section need a heading? 

📋 You might need to confirm with the UX or content team:

1. whether it needs a heading or not,
1. what would be the heading label.

**➣ Yes:** Let's add a heading!

> 1. Place the heading label with `<h#>`.
> 
> 1. Position the heading close to the `<section>`. 
> 
>   It might need to be wrapped with container elements for styling, but a closer placement to the `<section>` is better.
> 
> 1. [Then, go to the Headings section to check your heading. ➡️](headings.md)

**➢ No:** Don't use `<section>`.

> Replace `<section>` with `<div>` or other proper semantic container element.

[Move on to next element. ➡️](a11y-checklist.md)

---
[⬅️ a11y Checklist](a11y-checklist.md)

