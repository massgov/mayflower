Description: This pattern shows a card with an title, image, and rich text area.

### Status
* Added as beta version of molecule in 9.25.0

### Variant options
* As [secondary](./?p=molecules-card-as-secondary) with usage set to `"secondary"`.

### Variables
~~~
card: {
  id:
    type: string / required
    description: The id of the card element.
  link:
    type: string / required
    description: The link an onclick of the card should lead to.
  title:
    type: string / required
    description: The title of the card.
  title:
    type: string / optional
    description: Eyebrow of the card, displayed above the title link.
  thumbnail:
    type: string / required
    description: A link to an image to include in the card. Should work with aspect ration 4:3.
  text:
    type: string of rich text / required
    description: Rich text description field of the card.
  usage:
    type: string ("" or "secondary" or "vertical") / optional / default ""
    description: 
        - "" treats the card as Primary Card
        - "secondary" treats the card as Secondary Card
        - "vertical" stacks the image and card content on both desktop and mobile
  level:
    type: number / optional / default 3
    description: The heading level the title.
}
~~~