[⬅️ a11y Checklist](a11y-checklist.md)

# Buttons `<button>`

## 📖 Definition

**Buttons** (that have type="button") are not submit buttons. **Buttons** are used to *create features that rely on Javascript*. Behaviors such as revealing a menu or showing a date picker.

**🛑 Set type attribute**

If your buttons are not to submit form data to a server, be sure to set their type attribute to button. Otherwise they will try to submit form data and to load the (nonexistent) response, possibly destroying the current state of the document.

**🛑 Be careful for a use of a *link* vs. a *button*.**

**Link** has a *hand cursor*.  **[Button](buttons.md)** has a pointer.
  
Their roles are different. Browsers recognize and implement them *differently* with their unique characters.


## ➤➤ Does your buton’s functionality fit this definition?

**➣ Yes:** [Move onto the button label. ⬇️](#button-label) 

**➢ No:** Don't use `<button>`. Use `<a>` instead. Check your markup at the [Link section](links.md). ➡️

<a name="button-label"></a>
## Button label

### ➤➤ Is the buton label text?

**➣ Yes:** Text [Go to the following question. ⬇️](#text)

**➢ No:** Image [Go to the next question. ⬇️](#image)

**➤ Yes/No:** Text + Image [Go to the next question. ⬇️](#text-image)

 
<a name="text"></a>
### Text 

<a name="link-context"></a> 
### ➤➤ Is the label text descriptive enough to see what the button does? Is it clear enough to screen reader users?

**➣ Yes:** [Move on to next element. ➡️](a11y-checklist.md)

**➢ No:**  It’s not descriptive enough: 

🤔 "The *label text* of WHAT?" If you don't see the answer of the question in the label text(This sounds funny, but if you see below samples, it should make sense.), context info. is necessary.

##### Case 1: Need supplemental information.

It makes sense when you can see the entire section, but doesn't when you see just the label itself:

- open/expand
- close
- show more
- show less

TO DO: CHECK FOR THE SAMPLES.
> We need to provide the WHAT as context information. Use visually hidden text to add contextual info.
> 
> ##### Examples
> Expand`<span class=”ma--visually-hidden”>` the Table of Content`</span>`
> 
> Show more`<span class=”ma--visually-hidden”>` related pages to this page, page title.`</span>`


##### Case 2: Adding contextual info as visually hidden text doesn't help:

It needs supplemental information, but it doesn't make sense to add it as visually hidden text.

The label doesn't make sense by itself.

- The button label is a symbol.

```
<button 
  type="button"  
  aria-expanded="false" 
  aria-controls="toc-overlay">+</button>
```

> - Use `aria-label` to override the existing link label. 
> 
> - Add any necessary context info to the  `aria-label` as well. With above sample, the label could be "click to show the table of contents". 
> 
> 
> ```
> <button 
>   type="button"  
>   aria-expanded="false"
>   aria-label="click to show the table of contents" 
>   aria-controls="toc-overlay">+</button>
> ```
> 
> 📋 When `aria-label` is used, screen readers ignores the content between `<button>` and `</button> `and announce `aria-label` value.


<a name="image"></a>
### Image

#### ➤➤ Does the image have `alt` attribute?

**➣ Yes:** [Go to the following question. ⬇️](#alt)

**➢ No:**  Add `alt` attribute. [Go to the following question. ⬇️](#alt)

<a name="alt"></a>
#### ➤➤ Does the `alt` attribute clearly tell what the button does as the button label?

**➣ Yes:** You are all set. [Move on to next element. ➡️](a11y-checklist.md)

**➢ No:** The value is empty, or isn't descriptive enough. 

**🛑 In this case, `alt` shouldn't be empty.**

> - Add descriptive `alt` value as the button label.
> 
> - Add any necessary context info to `alt` as well.
> 
> 📋 You might need to confirm with the UX or content team what would be proper for the label.

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

**➢ No [Case 1]:** The text and the image provide unique information.

> - Add `alt` value to provide the information the image delivers. For example, if the image is an icon, what an icon signifies such as "open" or "close".
> 
> - As a button label, make sure the flow of *both information together* makes sense to screen reader users:
> 		- “Img alt value + label text”, or 
> 		- “label text + img alt value” 
> 
> 	flows naturally.
> 
> - If they don't flow well together, 
>     - add contextual text info as visually hidden text, or
> 
>		```
> 		<button type="button">
> 		   <img src="icon.png" alt="Sort" />
> 			<span class="ma--visually-hidden"> by </span>
>  			Dates
> 		</button>
>		```
>
>		"Sort by dates."
>     - override them with `aria-label`, empty the `alt` value for cleaner markup.
> 
>		```
> 		<button type="button" 
>        aria-label="Show the office hours.">
> 		  Office Hours
> 		  <img src="icon_open.png" alt="" />
> 		</button>
>		```
>
> 		"Show the office hours."
>
> 📋 When `aria-label` is used, screen readers ignore the content between `<button>` and `</button>` and announce `aria-label` value.
> 
> **🛑  When the image indicates the state of what the button triggers, make sure the text information also gets updated as the state changes.**
    
**➢ No [Case 2]:** Text has enough information as the label. Image has no information to deliver.

- decorative icons
- decorative images

> - Leave the `alt` value blank.
> - Hide the image from screen readers with `aria-hidden=”true”`.
> 
<!-- 
 	```
 	<img src="icon.png" alt="" aria-hidden="true" />
	```
TODO:  Add more info for aria-hidden.  Need some  use cases. -->


---
[⬅️ a11y Checklist](a11y-checklist.md)