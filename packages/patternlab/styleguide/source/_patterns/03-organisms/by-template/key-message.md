### Description
A full width header for campaign pages

### Status
* Beta version 0.3 in package 9.26.0

### Pattern Contains
* Compheading, Button, RichText

### Variables
~~~
keyMessage: {
  positionTop: 
    type: bool / required
    description: Whether to treat the action card as a main header or not.
  textOverlay:
    type: string / optional
    options: "c-primary", "c-primary-lightest", "c-primary-alt": $c-primary-alt, "c-primary-alt-lightest", "c-white", "c-gray-lightest"
    description: The theme of the shifted box of text overlay.
  backgroundColor:
    type: string / optional / default = "c-gray-lightest"
    options: "c-primary", "c-primary-lightest", "c-primary-alt": $c-primary-alt, "c-primary-alt-lightest", "c-white", "c-gray-lightest"
    description: The theme of the centered text variant.
  bgImage: 
    type: url / optional
    description: Url to an image for the background.
  mobileBgImage:
    type: url / optional
    description: Url to an image for the background on mobile screen.
  compheading: 
    {
      title
        type: string / required with positionTop = true
    }
    type: compheading / required with positionTop = true
    description: The title header.
  subtitle:
    type: string / optional
    description: The subtitle text.
  description:
    type: wysiwyg / optional
    description: The description text.
  button:
    {
      href: string / required with button
      text: string / required with button
    }
    type: button / optional
    description: The description text.
}
~~~


