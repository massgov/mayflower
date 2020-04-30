[⬅️ a11y Checklist](a11y-checklist.md)

# Buttons `<button>`

## 📖 Definition

**Buttons** (that have type="button") are not submit buttons. **Buttons** are used to *create features that rely on Javascript*. Behaviors such as revealing a menu or showing a date picker.

**🛑 Set type attribute**

If your button does not submit form data to a server, be sure to set the type attribute to button. Otherwise, it will try to submit form data and to load the (nonexistent) response, possibly destroying the current state of the document.

**🛑 Should you use a *link* or a *button*?**

**Link** has a *hand cursor*.  **[Button](buttons.md)** has a pointer.
  
Their roles are different. Browsers recognize and implement them *differently* with their unique characters.

---


## ➤➤ Does your button’s functionality fit above definition?

**➣ Yes:** [Move onto the button label. ⬇️](#button-label) 

**➢ No:** Don't use `<button>`. Use `<a>` instead. Check your markup at the [Link section](links.md). ➡️

<a name="button-label"></a>
## Button label

### ➤➤ Is the button label text (that is, not an image)?

**➣ Yes:** Text [Go to the following question. ⬇️](#text)

**➢ No:** Is it an image? [Go to the Image section below. ⬇️](#image)

**➤ Yes/No:** Is it text plus an image? [See the Text + Image section below. ⬇️](#text-image)

 
<a name="text"></a>
### Text 

<a name="link-context"></a> 
#### ➤➤ Is the text descriptive enough to explain what the button does to screen reader users?

**➣ Yes:** [Move on to next element. ➡️](a11y-checklist.md)

**➢ No:**  It’s not descriptive enough: 

🤔 "Does the *label text* answer of/for/about WHAT?" If it doesn't, context info is necessary.

##### Case 1: Need supplemental information.

Some labels make sense when you can see the entire section, but don't when you see just the label itself. For example:

- open/expand
- close
- show more
- show less

> We need to provide the WHAT as context information. Use visually hidden text to add contextual info.
> 
> ###### Examples
> Expand`<span class=”ma--visually-hidden”>` the Table of Contents`</span>`
> 
> Show more`<span class=”ma--visually-hidden”>` pages related to this page, [page title].`</span>`


##### Case 2: Adding contextual info as visually hidden text doesn't help:

It needs supplemental information, but it doesn't make sense to add it as visually hidden text.

Some labels don't make sense by themselves:

- For example, if the button label is a symbol, screen readers announce the symbol.

```
<button 
  type="button"  
  aria-expanded="false" 
  aria-controls="toc-overlay">+</button>
```

> - In these cases, use `aria-label` to override the existing button label. 
> 
> - Add any necessary context info to the  `aria-label` as well. In the example above, the label could be "click to show the table of contents". 
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
> 📋 When `aria-label` is used, screen readers ignore the content between `<button>` and `</button> `and announce the `aria-label` value.

[Move on to next element. ➡️](a11y-checklist.md)


<a name="image"></a>
### Image

#### ➤➤ Does the image have an `alt` attribute?

**➣ Yes:** [Go to the following question. ⬇️](#alt)

**➢ No:**  Add an `alt` attribute. [Go to the following question. ⬇️](#alt)

<a name="alt"></a>
#### ➤➤ Does the `alt` attribute work as a button label, and clearly tell what the button does?

**➣ Yes:** You are all set. [Move on to next element. ➡️](a11y-checklist.md)

**➢ No:** The value is empty, or isn't descriptive enough. 

**🛑 In this case, `alt` shouldn't be empty.**

> - Add descriptive `alt` value as the button label.
> 
> - Add any necessary context info to `alt` as well.
> 
> 📋 You might need to confirm with the UX or content team what would be proper for the label.

[Move on to next element. ➡️](a11y-checklist.md)


<a name="text-image"></a>
### Text and Image

#### ➤➤ Do the text and the image both describe the same thing (in other words, do they provide duplicate information)?

**➣ Yes:** 

> Respect the text over the image. Make sure the image has an empty `alt` value.
> In this case, the purpose of the image is decorative.

**🛑 Keep an `alt` attribute even its value is empty.**

```<img src="image.jpg" alt="" />```

📋 If an `<img>` doesn't have an `alt` attribute, screen readers try to provide any other available information for the image and announce the `src` value, which is not only not helpful, but actually annoying for screen reader users.

When the `alt` value is empty, screen readers know it is *purposely* empty, and don't try to deliver any other information.

[Move on to next element. ➡️](a11y-checklist.md)

**➢ No [Case 1]:** The text and the image provide unique information.

> - Add an `alt` value to provide the information the image delivers. For example, if the image is an icon, the `alt` value should describe what the icon signifies, such as "open" or "close".
> 
> - When a button's label contains both text and an image, make sure the flow of *both together* makes sense to screen reader users and flow naturally together:
> 		
>    - “Img alt value + label text”, or 
> 	  - “label text + img alt value” 
> 
> 
> - If they don't flow well together, 
>     - add contextual text info as visually hidden text, like this:
> 
>		```
> 		<button type="button">
> 		   <img src="icon.png" alt="Sort" />
> 			<span class="ma--visually-hidden"> by </span>
>  			Dates
> 		</button>
>		```
>
>		This label will now read "Sort by dates."
>     - override them with `aria-label` and empty the `alt` value for cleaner markup.
> 
>		```
> 		<button type="button" 
>        aria-label="Show the office hours.">
> 		  Office Hours
> 		  <img src="icon_open.png" alt="" />
> 		</button>
>		```
>
> 		This label will now read: "Show the office hours."
>
> 📋 When `aria-label` is used, screen readers ignore the content between `<button>` and `</button>` and announce `aria-label` value.
> 
> **🛑  When the image describes the state that the button triggers, make sure the text information also gets updated as the state changes.**
    
**➢ No [Case 2]:** Text has enough information as the label. Image has no information to deliver.

- decorative icons
- decorative images

> - Provide an empty `alt` value.
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
