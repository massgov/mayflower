[⬅️ a11y Checklist](ally-checklist.md)

# Headings `<h#>`

## Heading level

A heading needs its **proper level number** to represent the hierarchy of the content in the relationship of the parent and child components.

HTML5 allows you to start with `<h1>` in every `<section>`. That is valid as HTML5, but it doesn't help assistive technology users to grasp the content hierachy in the page.

### ➤ Is the heading level number flexible?

**➣ Yes:** The heading level number is set dynamic meeting these conditions.  

☑️ It can receive and consume the level number value from the parent component.
 
☑️ It can have proper level number depending on where the component positions in a page in the sequential manner from small to large. (If its parent component has *h3*, this component starts with *h4*.)

The *sequential manner* means:

☑️ No skipping - Some inbetween number(s) is(are) NOT missing.

☑️ No jumping - NOT putting heading level numbers randomely.

☑️ No backword - Numbers does NOT go down from large to small.

**🛑 Watch out when your template contains multiple headings.** The heading levels could change in the template. You might need to adjust the level in the template.


📋 The template can have a *default value* for the heading level. The *default value* is only used when it’s unable to get the parent’s heading level value. This is the case the second condition might be omitted.

[Let's check the heading label next.⬇️](#heading-label)

**➢ No:** If your heading level number is static or doesn't meet above conditions, you have some work to do💪 

Below info. gives you some idea of what needs to be done.

> #### Overview
> 
> Only the page title can have `<h1>`. 
> 
> In page templates, the initial heading level is set. Then, before the level changes, the heading level value is ajdusted to reflect the content hierachy in templates. 
> 
> 📋 As of May, 2019, this is managed in Drupal theming, not in Mayflower.  In Mayflower, the heading level value can be passed on.
> 
> #### Example
> 
> 📄 */patternlab/source/_pattern/01-atoms/04-headings/comp-heading.twig*
> 
> The heading level value is passed from its parent tempalte as `compHeading.level`, and assgined to `headingLevel`.
> 
> Here the default value is set to `2`.
> ```{% set headingLevel = compHeading.level ? : 2 %}```
> 
> The heading level value is ready to render.
> 
> ```<h{{ headingLevel }}```
> 


<a name="heading-label"></a>
## Heading label 

### ➤ Is the label generic like “Contacts” and “Downloads”?

<a name="context"></a>
**➣ Yes:** Add context info as visually hidden text for screen reader users.

📋 Sighted users can get certain context from the page layout, but screen reader users usually are unable to take advantage of it and don't have the same context. So, we fill the gap by providing the context information as text.

Some pages could have multiple **Contacts** and **Dowloads** headings in a page. Make sure each one of them is *uniquely* identifiable.

Some label 

> ##### Examples
> Contacts`<span class=”ma--visually-hidden”> for the Department of Health office</span>`
> 
> Downloads`<span class=”ma--visually-hidden”> for the marine fishing license</span>`

**➢ No:** The label is unique. Then, move to the next question.⬇️

### ➤ Does the label have enough context to describe the section content?

Check if the label itself would tell what the following content is about.

**➣ Yes:** You are all set with the heading. [Move onto next element.➡️](a11y-checklist.md)

**➢ No:** Use [above technique](#context) to provide context. ⬆️ 

