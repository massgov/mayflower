### Status
* Obsolete as of 5.0.0

Description: Widget to display a wait time at a given location.
## Status: Alpha
### Notes:
- The way the icons are rendered is deprecrated and will need to be updated here once refactored.
### Contains:
- [atoms/05-icons/svg-wait-time](?p=atoms-svg-wait-time)
### Required Variables
~~~
waitTime: {
  items:[{
    label:
      type: string/required
    time:
      type: string/required
    units:
      type: string/required
  }]
}
~~~
