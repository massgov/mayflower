### Description
This is a pattern for the site header. The options to hide the search header and back to link are only included in the mayflower react instance of this organism.

@see [@organisms/header](https://mayflower.digital.mass.gov/patternlab/?p=organisms-header)

### Pattern Contains
* Utility Nav
* Site Logo
* Header Search
* Main Nav

### Variables
~~~
utilityNav: {
  type: utilityNav / required
}
headerSearch : {
  type: headerSearch / required
}
mainNav: [{
  type: mainNav / required
}]
hideHeaderSearch [{
	type: boolean / optional (added in Mayflower React)
}]
hideBackTo: PropTypes.bool [{
	type: boolean / optional (added in Mayflower React)
}]
siteLogoDomain: [{
	type: siteLogo / optional (added in Mayflower React)
}]
~~~
