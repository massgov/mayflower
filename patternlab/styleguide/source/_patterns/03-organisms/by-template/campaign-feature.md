Description: The pattern displays a primary card with 2 side by side secondary cards.

### Status
* Added in 9.22.0
  * `moreLink` added in 9.26.0

### Pattern Contains
* [Card](./?p=molecules-card) molecule (Primary card)
* [Campaign Feature 2up](/?p=molecules-campaign-feature-2up) molecule
* [Decorative Link](/?p=atoms-decorative-link) atom

### Variables
~~~
campaignFeature: {
  compHeading: {
    title:
      type: string / required
    level:
      type: string /required
  },
  positionTop: 
    type: boolean / optional
  campaignFullWidthFeature: {
	id:
	  type: string / required
	link:
	  type: string (url) / required
	title:
	  type: string / required
	thumbnail:
	  type: string / required
	text:
	  type: string of rich text / required
	level:
	  type: number / optional / default 3
  },
  campaignFeature2up: [{
	id:
	  type: string / required
	link:
	  type: string / required
	title:
	  type: string / required
	thumbnail:
	  type: string / required
	text:
	  type: string of rich text / required
	level:
	  type: number / optional / default 3
  }]
  moreLink:
    text:
      type: string / optional
    href:
      type: string (url) / optional
}
~~~
