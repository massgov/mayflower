### Description
A Pattern that displays the Name, Location, Time, Date and a brief description of an event

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link

### Variant options
* Can be shown with the Date as a [graphic](./?p=molecules-event-teaser-with-graphic)

### Usage Guidelines
* The start and end month variables should always be a three letter month abbreviation.
* The `time` variable (and any times written in `date.summary`) should be formatted as '12 p.m.' (not 12:00 p.m.)
* The `startTimestamp` and `endTimestamp` variables are used to sort and filter events by date in the Event Listing Interactive pattern.

### Variables
~~~
eventTeaser: {
  title: 
    type: decorativeLink / optional
  level: 
    type: number / optional
  location: 
    type: string (address) / optional
  date: {
    summary: 
      type: string (human readable date) / required
    startMonth: 
      type: string (format: Mar) / optional
    startDay:
      type: string (number) / optional
    startTimestamp:
      type: string (format: MM/D/YYYY - HH:MM) / required only for event listing interactive
    endMonth: 
      type: string (format: Apr) / optional
    endDay:
      type: string (number) / optional
    endTimestamp:
      type: string (format: MM/D/YYYY - HH:MM) / required only for event listing interactive
  }
  time: 
    type: string / optional
  description: 
    type: string / optional
}
~~~
