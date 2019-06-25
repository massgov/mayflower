[⬅️ a11y Checklist](a11y-checklist.md)

# Links `<a>`

## 📖 Definition

**Links** let us navigate to *pages* or *locations within a page*. They’re typically underlined to stand out from the surrounding content. Or they might reside in a special place like a header to help cognition.

**Call to action buttons** are considered LINKS since they take you to another pages or locations within a page.

**🛑 Be careful for a use of a *link* vs. a *button*.**

**Link** has a *hand cursor*.  **[Button](buttons.md)** has a pointer.
  
Their roles are different. Browsers recognize and implement them *differently* with their unique characters.

---

## ➤➤ Does your link’s functionality fit above definition?

**➣ Yes:** [Move onto the link label. ⬇️](#link-label) 

**➢ No:** Don't use `<a>`. Use `<button>` instead. Check your markup at the [Button section](buttons.md). ➡️

<a name="link-label"></a>
## Link label

### ➤➤ Is the link label text?

**➣ Yes:** Text [Go to the following question. ⬇️](#text)

**➢ No:** Image [Go to the next question. ⬇️](#image)

**➤ Yes/No:** Text + Image [Go to the next question. ⬇️](#text-image)

 
<a name="text"></a>
### Text 

#### ➤➤ Is the label passed from field data such as node title or user input label?

<!-- TODO: Need more info as actionable items. -->
Not sure? Check the spec.

<!-- 
sample link label in the comp if the link takes you to a content page created by authors, or programmatically generated page. If it meets the first one, "Yes".
-->

**➣ Yes:**  You are all set. [Move on to next element](ally-checklist.md). ➡️

**➢ No:**  It's defined in the template. [Go to the following question. ⬇️](#link-context)

<a name="link-context"></a> 
### ➤➤ Is the label text descriptive enough to see where it takes you without the *visual presentation* around the link? Is it clear enough to screen reader users?

📋 A visual presentation such as a layout can provide non-verbal context to sighted users, which screen reader users cannot take advantage of. We fill the gap by providing context info as text.

**➣ Yes:** [Move on to next element. ➡️](a11y-checklist.md)

**➢ No:**  It’s not descriptive enough: 

🤔 "The *label text* of WHAT?" If you don't see the answer of the question in the label text(This sounds funny, but if you see below samples, it should make sense.), context info. is necessary.

##### Case 1: Need supplemental information.

It makes sense when you can see the entire section, but doesn't when you see just the label itself:

- More
- See all
- List all
- Show more
- Show less

> We need to provide the WHAT as context information. Use visually hidden text to add contextual info.
> 
> ##### Examples
> More`<span class=”ma--visually-hidden”>` contact information for the Department of Health office`</span>`
> 
> List all`<span class=”ma--visually-hidden”>` upcoming events at the Great Brook Farm State Park.`</span>`
> 
> Show more`<span class=”ma--visually-hidden”>` VA facilities in Essex county.`</span>`


##### Case 2: Adding contextual info as visually hidden text doesn't help:

It needs supplemental information, but it doesn't make sense to add it as visually hidden text.

The label doesn't make sense by itself. 

"..." gets in a way in below sample since you cannot break it down to "Log in to" and "...". 

- Log in to...

📋 Screen readers announce "...", ":", ";". Screen reader users hear the sample as "log in to dot dot dot".


> - Use `aria-label` to override the existing link label. 
> 
> - Add any necessary context info as well. With above sample, the label could be "log in to *your account*". 
> 
> ```
> <a href="loginpage.html" aria-label="log in to your account.">Log in to...</a>
> ```
> 
> 📋 When `aria-label` is used, screen readers ignores the content between `<a>` and `</a> `and announce `aria-label` value.

[Move on to next element. ➡️](a11y-checklist.md)


<a name="image"></a>
### Image

#### ➤➤ Does the image have `alt` attribute?

**➣ Yes:** [Go to the following question. ⬇️](#alt)

**➢ No:**  Add `alt` attribute. [Go to the following question. ⬇️](#alt)

<a name="alt"></a>
#### ➤➤ Does the `alt` attribute clearly tell where it takes you as the link label?

**➣ Yes:** You are all set. [Move on to next element. ➡️](a11y-checklist.md)

**➢ No:** The value is empty, or isn't descriptive enough. 

**🛑 In this case, `alt` shouldn't be empty.**

> - Add descriptive `alt` value as the link label.
> 
> - Add any necessary context info as well.
> 
> 📋 You might need to confirm with the UX or content team what would be proper for the label.

[Move on to next element. ➡️](a11y-checklist.md)


<a name="text-image"></a>
### Text and Image

#### ➤➤ Do the text and the image both describe the same thing(= they have duplicate information)?

**➣ Yes:** Both information is same.

> Respect the text over the image. Empty the image’s `alt` value.
> The image is presented as a decorative purpose.

**🛑 Keep `alt` attribute even its value is empty.**

```<img src="image.jpg" alt="" />```

📋 If `<img>` doesn't have `alt` attribute, screen readers try to provide any other available information for the image and announce `src` value, which is not only not helpful, but also unpleasant to screen reader users.

When the `alt` value is empty, screen readers know it is *purposely* empty, and don't try to deliver any other information.

[Move on to next element. ➡️](a11y-checklist.md)

**➢ No [Case 1]:** The text and the image provide unique information.

> - Add `alt` value to provide the information the image delivers. For example, if the image is an icon, what the icon signifies such as PDF as a file format.
> 
> - As a link label, make sure the flow of *both information together* makes sense to screen reader users:
> 		
>    - “Img alt value + label text”, or 
> 	  - “label text + img alt value” 
>  
> 	flows naturally.
> 
> - If they don't flow well together, 
>     - add contextual text info as visually hidden text, or
> 
>		```
> 		<a href="loginpage.html">
> 			<img src="icon_pdf.png" alt="PDF" />
> 			<span class="ma--visually-hidden"> format of </span>
>  			Camp site reservation request form
> 		</a>
>		```
>
>		"PDF format of Campsite reservation request form"
>     - override them with `aria-label`, empty the `alt` value for cleaner markup.
> 
>		```
> 		<a href="loginpage.html" aria-label="Screen readers announce this.">
> 			Screen readers ignore anything goes here.
> 			<img src="image.png" alt="this is ignored, but leave empty for cleaner markup." />
> 		</a>
>		```
>
> 		"Screen readers announce this."
> 
> 📋 When `aria-label` is used, screen readers ignore the content between `<a>` and `</a> `and announce the `aria-label` value.
    
**➢ No [Case 2]:** Text is sufficient as the label. Image has no additional information.

- decorative icons
- decorative images

> - Use an empty `alt` value.
> - Hide the image from screen readers with `aria-hidden=”true”`.
> 
<!-- 
 	```
 	<img src="icon.png" alt="" aria-hidden="true" />
	```
TODO:  Add more info for aria-hidden.  Need some  use cases. -->

[Move on to next element. ➡️](a11y-checklist.md)

---
[⬅️ a11y Checklist](a11y-checklist.md)
