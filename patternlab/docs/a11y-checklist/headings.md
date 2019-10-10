[⬅️ a11y Checklist](a11y-checklist.md)

# Headings `<h#>`

## Heading level

A heading's level number must accurately represent the hierarchy of the content in the relationship of the parent and child components.

HTML5 allows you to start with `<h1>` in every `<section>`. That is valid as HTML5, but it doesn't help assistive technology users to grasp the content hierarchy in the page.

### ➤➤ Is the heading level number flexible?

☑️ It can receive and consume the level number value from the parent component.

☑️ The component's heading level number should adjust according to the component's placement on a page. For example, if its parent component starts with an *h3*, this component starts with *h4*.

Proper heading level number means:

☑️ No skipping - no in-between number(s) is(are) missing.

☑️ No jumping - heading level numbers always go from small to large (never large to small).

<!--
- [ ] No backward - Numbers does NOT go down from large to small.
-->

**➣ Yes:** The heading level number is set dynamically, and meets these conditions.

**🛑 Watch out when your template contains multiple headings.** The heading levels could change in the template. You might need to adjust the level in the template.


📋 The template can have a *default value* for the heading level. The *default value* is only used when no heading level value for the parent is present. In this case, the second condition may be omitted.

[Let's check the heading label next.⬇️](#heading-label)

**➢ No:** If your heading level number is static or doesn't meet these conditions, you have some work to do💪

Here are some ideas about what you may need to do:

> #### Overview
>
> Only the page title should use `<h1>`.
>
> In page templates, the initial heading level is set. Then, before the level changes, the heading level value is adjusted to reflect the content hierarchy in templates.
>
> 📋 As of May, 2019, this is managed in Drupal theming, not in Mayflower.  In Mayflower, the heading level value can be passed on.
>
> #### Example
>
> 📄 */patternlab/source/_pattern/01-atoms/04-headings/comp-heading.twig*
>
> The heading level value is passed from its parent template as `compHeading.level`, and assigned to `headingLevel`.
>
> Here the default value is set to `2`.
> 
> ```{% set headingLevel = compHeading.level ? : 2 %}```
>
> The heading level value is ready to render.
>
> ```<h{{ headingLevel }}```
>


<a name="heading-label"></a>
## Heading label

### ➤➤ Is the label generic like “Contacts” or “Downloads”?

🤔 If the heading label does not answer the question "of/for/about WHAT?" , context information is necessary.

<a name="context"></a>
**➣ Yes:** Add context info as visually hidden text for screen reader users.

📋 Sighted users can get certain context from the page layout, but screen reader users don't have the same context. Context info fills the gap for those users.

> Some pages could have multiple **Contacts** and **Dowloads** headings in a page. Make sure each one of them is *uniquely* identifiable.
> 
> ##### Examples
> Contacts`<span class=”ma--visually-hidden”>` for the Department of Health office`</span>`
>
> Downloads`<span class=”ma--visually-hidden”>`	 for the marine fishing license`</span>`

**➢ No:** The label is unique. Then, move to the following question.⬇️

### ➤➤ Does the label have enough context to describe the section content?

🤔 Check if the label itself describes the content. If it doesn't, context info is necessary.

**➣ Yes:** You are all set with the heading. [Move onto next element.➡️](a11y-checklist.md)

**➢ No:** Use [the techniques above](#context) to provide context. ⬆️

---
[⬅️ a11y Checklist](a11y-checklist.md)
