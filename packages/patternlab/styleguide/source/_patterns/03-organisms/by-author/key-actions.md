### Description
This pattern shows a grid containing a combination of Callout links and Illustrated Links beneath an optional title

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading atom (optional)
* Sidebar Heading atom (optional)
* Callout Link molecule
* Illustrated Link molecule (optional)

### Variant options
* This pattern can also contain Illustrated Links in addition to just Callout Links.


### Variables
~~~
"keyActions": {
  "compHeading": {
    "type": compHeading / optional 
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  },
  "links":[{
    type: array of Callout Links or Illustrated Links / required
  }]
}
~~~
