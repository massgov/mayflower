### Status
* Obsolete as of 5.0.0

Description: Displays a set of contact information in the header.

## State: Depreciated.

### Contains:
- [@molecules/contact-group](/?p=organisms-contact-group)

### Used in:
- [@organisms/by-author/action-header](/?p=organisms-action-header)

## Notes:
- `{{ accordion }}, {{ accordionParent }}, {{ accordionContent }}` are a set of local twig variables which is set in the molecule if phone, online and fax is set.

### Required Variables
~~~
headerContact {
  title:
    type: string/required
  address1:
    type: string/required
  address2:
    type: string/required
  city:
    type: string/required
  state:
    type: string/required
  zip:
    type: string/required
  directions {
    href:
      type: url/string/required
    target:
      type: default '_blank'/required
    text:
      type: default 'Directions'/required
    chevron:
      type: boolean
    property:
      type: string/optional
  },
  phone {
    icon:
      type: string
    name:
      type: string
    items: [{
      type:
        type: string
      label:
        type: string
      value:
        type: formatted string
      rawVal:
        type: string
      details:
        type: string
    }]
  },
  online: {
    icon:
      type: string
    name:
      type: string
    items: [{
      type:
        type: string
      label:
        type: string
      value:
        type: string
      details:
        type: string
    }]
  },
  fax: {
    icon:
      type: string
    name:
      type: string
    items: [{
      type:
        type: string
      label:
        type: string
      value:
        type: string
      details:
        type: string
    }]
  }
}
~~~
