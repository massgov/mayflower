[⬅️ a11y Checklist](a11y-checklist.md)

# Sections `<section>`

## ➤ Does the section have a [heading](headings.md) for it?


**➣ Yes:** 
[Move to the Headings section. ➡️](headings.md)

**➢ No:**
`<section>` requires `<h#>`. 
Move to the following question to find out more. ⬇️

## ➤ Does the section have a heading label content in other HTML tag to describe the section?

📋 You can consider the heading level content as a title for the section. It's generally placed before its main content.

**➣ Yes:** Follow below steps to set up the heading, [then check it in the Headings section.➡️](headings.md)

1. Replace the tag with `<h#>`.

1. Position the heading right below the `<section>` as its first child element.

1. [Then, go to the Headings section to check your heading. ➡️](headings.md)

**➢ No:**
Move to the following question. ⬇️

## ➤ Does the section need a heading? 

📋 You might need to confirm with the UX or content team:

1. whether it needs a heading or not,
1. what the heading label would be.

**➣ Yes:** Let's add a heading!

1. Place the heading label with `<h#>`.

1. Position the heading right below the `<section>` as its first child element.

1. Then, [go to the Headings section to check your heading. ➡️](headings.md)

**➢ No:**
Replace `<section>` with `<div>` or other proper semantic container element.

