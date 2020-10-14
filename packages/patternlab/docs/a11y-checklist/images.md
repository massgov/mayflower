[⬅️ a11y Checklist](a11y-checklist.md)

# Images
# &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<img>`
# &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<CONTAINER role="img">`
# &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<CONTAINER style="background-image: url();">`
# &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<svg>`

📋 For a **linked image** or a **button with an image label**, see the [Links](links.md) and the [Buttons](buttons.md) pages respectively for their specific details.

## 📖 Types of image markup

🤔 Which markup to use?

### `<img>`

This is always the first choice for images unless using a **svg** format.

[See more about `<img>`. ⬇️](#img)


### `<CONTAINER role="img">`

**🛑 Do not add an image with `role="img"` unless it's ABSOLUTELY necessary.**

`role` overrides the original HTML element, setting it to `<img>`. This makes the element **focusable** for assistive technology.

This means screen readers get focus on the element whether its image is decorative or not, meanwhile other users don't.

[See more about `role="img"`. ⬇️](#role-img)

### `<CONTAINER style="background-image: url();">`

When the image is fully decorative and does not provide any information, adding an image as a CSS background with this technique is a good method.

#### Use cases:
- banner image
- background image for a container (content is displayed over the background.)

**🛑 If the image could possibly provide information in some cases, use `<img>` instead.**

[See more about `style="background-image: url();`. ⬇️](#background)

### `<svg>`

Icons in Mayflower are generally `<svg>` files.

Mayflower icons are found at *assets/images/svg-icons/*.

[See more about `<svg>`. ⬇️](#svg)

---

<a name="img"></a>
## `<img>`

### ➤➤ Does the image have an `alt` attribute?

**➣ Yes:** [Go to the following question. ⬇️](#alt)

**➢ No:** `<img>` always needs `alt`.

> Let's add one now.
>
> ```<img alt="" />```

[Go to the following question. ⬇️](#alt)


<a name="alt"></a>
### ➤➤ In this component, does the image convey information (in other words, is it more than decorative)?

**➣ Yes:** The image has information that is necessary to fully understand the page/section content.

> Make sure the template can receive the `alt` value as a part of the image data set.
>
> **🛑 Do NOT leave the `alt` value *empty*.**

[Move on to next element. ➡️](a11y-checklist.md)

**➢ No:** The image is for a decorative purpose.

> Empty the `alt` value.
>
> ```<img alt="" />```
>
> **🛑 Keep `alt` attribute even when its value is empty.**

```<img src="image.jpg" alt="" />```

📋 If `<img>` doesn't have an `alt` attribute, screen readers will provide whatever other information is available. Without an `alt` attribute, they will usually announce the `src` value, which is not only not helpful, but also unpleasant for screen reader users.

When the `alt` value is empty, screen readers know it is *purposely* empty, and don't try to deliver any other information.

[Move on to next element. ➡️](a11y-checklist.md)

**➤ Yes/No(Not sure):** It's possible...

> Make sure the template can receive the `alt` value when it's available. Otherwise, leave it empty.
>
> **🛑 Keep `alt` attribute even if its value is empty.**

See above 📋.

[Move on to next element. ➡️](a11y-checklist.md)


<a name="role-img"></a>
## `<CONTAINER role="img">`

### ➤➤ Can the image be added with `<img>` instead?

**➣ Yes:** Use `<img>` and check it at the [`<img>` section.⬆️](#img)

**➢ No:** [Go to the following question. ⬇️](#role-alt)

<a name="role-alt"></a>
### ➤➤ In this component, does the image convey information (in other words, is it more than decorative)?

**➣ Yes:** The image has its unique information to deliver.

> - Use `aria-label`, which is equivalent to `alt` with `<img>` in this case, to add alternative information.
>
>   ```
>   <CONTAINER role="img" aria-label="text that provides alternative info for the image here"></CONTAINER>
>   ```
>
> - Make sure the template can receive data for `aria-label` value.
>
> **🛑 Do not leave the `aria-label` value *empty*.**


<!-- Add aria-labelledby with use cases.
	  Most likely, no use case with general templates. -->

[Move on to next element. ➡️](a11y-checklist.md)

**➢ No:** The image is only decorative.

`<CONTAINER role="img">` is not appropriate for this case.
Instead use:

1. [`<img>`](#img)⬆️, or

1. [`<CONTAINER style="background-image: url();">`](#background.)⬇️.

---

<a name="background"></a>
## `<CONTAINER style="background-image: url();">`

This method is only appropriate for a fully decorative image that doesn't convey any content, such as a banner image in a page or section. 

📋 This methods offers no attributes to override its original role, such as `role="img"`, or any other way to deliver alternative information, such as `aria-label` or `alt`.

Don't use this method to present content such as a *linked image + text* unit unless it's absolutely certain the image will never contain information. That is something that's very hard to be certain about when building templates in a CMS, so use this method sparingly.

There are 2 ways to add an image as background: 
<a name="bg-markup"></a>
> Method 1: Separate the style from the markup. If the background image is static, the `<style>` content belongs in a CSS file.
>
> ```
> <style>
>   .bg_container {
>     background-image: url(background.jpg);
>   }
> </style>
> <CONTAINER class="bg_container"></CONTAINER>
> ```
>
> Method 2: Inline styles are not ideal, but there can be cases where this method is necessary.
>
> ```
> <CONTAINER style="background-image: url(background.jpg);"></CONTAINER>
> ```

### ➤➤ In this component, does the image convey information (in other words, is it more than decorative)?

**➣ Yes:** The image has unique information to deliver. [Use `<img>` instead ⬆️.](#img)

**➢ No:** The image is only decorative.
[Go to the following question. ⬇️](#role)

<a name="role"></a>
### ➤➤ Does the image container have `role="img"`?

**➣ Yes:** 

> Remove the `role="img"`.
> 
> `role="img"` makes the element focusable, which is not necessary in this case because the image is decorative.

[Go to the following question. ⬇️](#alt2)

**➢ No:** [Go to the following question. ⬇️](#alt2)

<a name="alt2"></a>
### ➤➤ Does the image container have `aria-label` or `alt`?

**➣ Yes:** The image doesn't need either `aria-label` or `alt`.

> Remove it entirely.
> The markup should look like [Method 1 or Method 2 above](#bg-markup).

[Move on to next element. ➡️](a11y-checklist.md)

**➢ No:** The image is marked up for a decorative purpose. 

[Move on to next element. ➡️](a11y-checklist.md)

<a name="svg"></a>
## `<svg>`

Make sure the file is compressed well and does not contain any style data.

Styles (size, color, etc.) should always be set via CSS to optimize the use of the file. Do not include style data in the svg file itself.

In Mayflower Patternlab, all icons are treated as decorative. All svg files contain `aria-hidden="true"` in the file to ensure their visibility setting is correct.

```
<svg aria-hidden="true" ...>...</svg>
```

<!-- For future use...
### ➤➤ Does the image have information to deliver?

**➣ Yes:**

**➢ No:**

**➤ Yes/No:**
-->


[Move on to next element. ➡️](a11y-checklist.md)

---
[⬅️ a11y Checklist](a11y-checklist.md)
