Description: The pattern displays 2 cards as secondary variants for the campaign feature organism

### Status
* Added in 9.22.0

### Pattern Contains
* [Card as secondary](./?p=molecules-card-as-secondary) molecule

### Variables
~~~
campaignFeature2up: [{
  id:
    type: string / required
    description: The id of the card element.
  link:
    type: string / required
    description: The link an onclick of the card should lead to.
  title:
    type: string / required
    description: The title of the card.
  thumbnail:
    type: string / required
    description: A link to an image to include in the card. Should work with aspect ration 4:3.
  text:
    type: string of rich text / required
    description: Rich text description field of the card.
  level:
    type: number / optional / default 3
    description: The heading level the title.
}]
~~~