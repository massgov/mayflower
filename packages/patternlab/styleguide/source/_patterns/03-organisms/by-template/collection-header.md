### Description
A full width header for collections.
Despite bg_color is not required, the template will not show if the bg_color is empty.

### Variables
~~~
  "collection": {
    title:
      type: string / required
      description: A title. text only.
    description:
      type: string / optional
      description: A short description. Text only.
    image:
      type: string / optional
      description: An image HTML code.
    bg_color:
      type: string / optional
      description: any color valid for css background color.
  }
~~~
