### Description
A full width header for campaign pages

### Status
* Stable as of 5.0.0

### Pattern Contains
* Link

### Variables
~~~
CampaignFullWidthHeader: {
  positionTop: 
    type: bool / required
  backgroundColor:
    type: string / optional
  backgroundImage: 
    type: url / optional
  title:
    type: string / required with positionTop = true
  subtitle:
    type: string / optional
  description:
    type: wysiwyg / optional
  textColor: 
    type: string / optional
  button: button / optional
}
~~~
