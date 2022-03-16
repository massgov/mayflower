### Description

This is a set of related links for Organization pages to inculded the Organization links and optional related links.

### Status

* Stable as of 5.0.0

### Notes

Primary: at least one tag required.
Secondary: optional, by default all secondary tags will be shown. To display less items, use the `groupAfter` variable.

### Variables

~~~
relationshipIndicators: {
  pageTitle: string / required,
  primary: {
    label: string / required,
    tags: [{
      class: string / optional,
      href: url / required,
      title: string / optional
    }]
  },
  secondary: {
    icon: string / optional,
    label: string / required,
    groupAfter: integer / optional,
    tags: [{
      class: string / optional,
      href: url / required,
      title: string / optional
    }]
  }
}
~~~
