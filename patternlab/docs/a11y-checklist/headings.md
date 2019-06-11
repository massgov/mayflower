[⬅️ a11y Checklist](a11y-checklist.md)

# Headings `<h#>`

## Heading level

A heading needs its **proper level number** to represent the hierarchy of the content in the relationship of the parent and child components.

HTML5 allows you to start with `<h1>` in every `<section>`. That is valid as HTML5, but it doesn't help assistive technology users to grasp the content hierarchy in the page.

`<h1>` is reserved for a page title.

### ➤➤ Is the heading level number flexible?

☑️ It can receive and consume the level number value from the parent component.

☑️ It can have proper level number depending on where the component is placed in a page in the *sequential manner* from small to large. (If its parent component has *h3*, this component starts with *h4*.)

📋 The template can have a *default value* for the heading level. The *default value* is only used when it’s unable to get the heading level value from a parent tempalte. This is the case the second condition might be omitted.

The *sequential manner* means:

☑️ No skipping - Some in-between number(s) is(are) NOT missing.

☑️ No jumping - NOT putting heading level numbers randomly.

☑️ The level number increases by 1 from a parent component to a child one.

**🛑 Watch out when your template contains multiple headings.** The heading levels could change in the template for multiple headings in it. You might need to adjust the level in the template based on its content structure.


**➣ Yes:** The heading level number is set dynamically, and meets these conditions.

[Let's check the heading label next.⬇️](#heading-label)

**➢ No:** If your heading level number is static or doesn't meet above conditions, you have some work to do💪

Below info. gives you some idea of what needs to be done.

> #### Overview
>
> Only the page title can have `<h1>`.
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
> ```
> {% set headingLevel = compHeading.level ? : 2 %}
> ```
>
> The heading level value is ready to render.
>
> ```<h{{ headingLevel }}```
>

Once you see template's heading level can be flexible to fit the content structure where the template is used, [let's check the heading label next.⬇️](#heading-label)

**➤ Yes/No:** The heading level is set flexible to receive the value from a parent template, but the value appears to be incorrect.

> 1. Check its ancestor templates to identify where starts passing an incorrect value for the heading level value.
> 
> 1. When the ancestor template contains multiple child components to share the same heading level in it, adjust/define the value for the child components right after the heading level value for the template is used to make sure to cover all child components' heading levels. 
> 
>   To adjust/define the value, use the template's heading level variable. For example, something like below can be placed right after the heading template call for the template:
>   ```
>   {% set childHeadingLevel = headingLevel + 1 %}
>   ```
> 
>   `headingLevel` contains the heading level value received from its parent template. 
> 
>   For the child components, the value is increased by 1.
> 
> 1. Test the adjusted/defined value is passed on to its descendant templates, to the heading template you need to see the correct heading level.
> 
> 📋 The Step 2 might also need to happen a template(s) in between if the test fails at the Step 3.
> 

Once you see the heading level is properly propagated with the correct value, [let's check the heading label next.⬇️](#heading-label)

<a name="heading-label"></a>
## Heading label

### ➤➤ Is the label generic like “Contacts” and “Downloads”?

🤔 "The label text of/for/about WHAT?" If you don't see the answer for the question, context info is necessary.

<a name="context"></a>
**➣ Yes:** Add context info as visually hidden text for screen reader users.

📋 Sighted users can get certain context from the page layout, but screen reader users are usually unable to take advantage of it and don't have the same context. So, we fill the gap by providing the context information as text.

> Some pages could have multiple **Contacts** and **Dowloads** headings in a page. Make sure each one of them is *uniquely* identifiable.
> 
> ##### Examples
> Contacts`<span class=”ma--visually-hidden”>` for the Department of Health office`</span>`
>
> Downloads`<span class=”ma--visually-hidden”>`	 for the marine fishing license`</span>`

**➢ No:** The label is unique. Then, move to the following question.⬇️

### ➤➤ Does the label have enough context to describe the section content?

🤔 Check if the label itself would tell what the following content is about. If it doesn't, context info is necessary.

**➣ Yes:** You are all set with the heading. [Move onto next element.➡️](a11y-checklist.md)

**➢ No:** Use [above technique](#context) to provide context. ⬆️

---
[⬅️ a11y Checklist](a11y-checklist.md)