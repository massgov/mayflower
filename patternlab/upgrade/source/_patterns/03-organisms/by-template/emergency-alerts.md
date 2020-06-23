### Description
This pattern is designed to be used site wide to show important alert messages 


### Status
* Stable as of 5.0.0


### Pattern Contains
* Emergency Header
* Button Alert
* Emergency Alert

### Usage Guidelines 
  * This will only render if the alerts array is populated
  * After hiding the alerts, they will stay collapsed during the users session if the browser supports JS
  * The Id value should be consistent across the site
  * When new alerts are created, the id should be changed to reopen the accordion
  * Messages should be sorted with the newest one first

### JavaScript Used
* Accordions (js/modules/accordions.js)
* Emergency Alerts (js/modules/emergencyAlerts.js)

### Variables
~~~
emergencyAlerts: {
  id: 
    type: string (unique per page and consistent across the site) / required
  buttonAlert: {
    type: buttonAlert / required
  },
  emergencyHeader: {
    type: emergencyHeader / required
  },
  alerts (optional): [{
    type: array of emergencyAlert / required
  }]
}
~~~
