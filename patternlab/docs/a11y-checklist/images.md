[⬅️ a11y Checklist](a11y-checklist.md)

# Images `<img>` `<CONTAINER role="img">` `<CONTAINER style="background-image: url();">` `<svg>`

📋 For a linked image and a button label image, see the [Links](links.md) and the [Buttons](buttons.md) pages respectively for their specific details.

## 📖 Types of images

Which markup to use?

### `<img>`

This is always the first choice of HTML tag for images unless it's a **svg** format.

[Check your `<img>`. ⬇️](#img)


### `<CONTAINER role="img">`

**🛑 Do not add an image with `role="img"` unless it's ABSOLUTELY necessary.**

`role` overrides the current HTML element to `<img>`. It sets the element **focusable** for assistive technology. 

This means screen readers focus on the element whether its image is decorative or not.

[Check your `role="img"`. ⬇️](#role-img)
 
### `<CONTAINER style="background-image: url();">`

When the image is fully decorative and not providing any information, add an image as a background.

**🛑 If the image possibly provide any information in some cases, use `<img>` instead.**

---
<a name="img"></a>
## `<img>`

### ➤➤ Does the image have `alt` attribute?

**➣ Yes:** [Go to the following question. ⬇️](#anchor)

**➢ No:** `<img>` always needs `alt`. Let's add one.

> ```<img alt="" />```

[Go to the following question. ⬇️](#anchor)

<a name="role-img"></a>
## `<CONTAINER role="img">`

Use `aria-label` to add text alternative information.

<a name="background"></a>
## `<CONTAINER style="background-image: url();">` 

<a name="svg"></a>
## `<svg>`

Make sure the file is compressed well, not contain any style data in it.

Styles (size, color, etc.) are set via CSS to optimize the use of the file.




---
[⬅️ a11y Checklist](a11y-checklist.md)