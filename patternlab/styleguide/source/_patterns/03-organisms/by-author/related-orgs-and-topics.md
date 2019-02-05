### Description
This is a two column list layout for use on Topic pages

### Status
* Stable as of 5.0.0

### Pattern Contains
* Link List


### Variables
~~~
title: 
  type: string / optional
linkList : {
  compHeading: {
    type: compHeading / optional
  },
  stacked: true
  hideBullets: false,
  links : [{
    type: array of decorativeLink / required
  }]
}
~~~
