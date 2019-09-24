Description: The pattern displays a primary card with 2 side by side secondary cards.

### Status
* Added in 9.22.0

### Pattern Contains
* [Card](./?p=molecules-card) molecule (Primary card)
* [Campaign feature 2 up](/?p=molecules-campaign-feature-2up) molecule

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
	  type: string / required
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
}
~~~
