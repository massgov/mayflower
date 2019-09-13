import moment from "moment";

/** The following helper function was implemented following the same logic/strucure
 *  as react-add-to-calendar helpers class.
 *  (https://github.com/jasonsalzman/react-add-to-calendar/blob/master/src/helpers/index.js)
*/

class helpers {
  getRandomKey() {
    let n = Math.floor(Math.random() * 999999999999).toString();
    return new Date().getTime().toString() + "_" + n;
  }

  formatTime(date) {
    let formattedDate = moment.utc(date).format("YYYYMMDDTHHmmssZ");
    return formattedDate.replace("+00:00", "Z");
  }

  calculateDuration(startTime, endTime) {
    // snag parameters and format properly in UTC
    let end = moment.utc(endTime).format("DD/MM/YYYY HH:mm:ss");
    let start = moment.utc(startTime).format("DD/MM/YYYY HH:mm:ss");

    // calculate the difference in milliseconds between the start and end times
    let difference = moment(end, "DD/MM/YYYY HH:mm:ss").diff(
      moment(start, "DD/MM/YYYY HH:mm:ss")
    );

    // convert difference from above to a proper momentJs duration object
    let duration = moment.duration(difference);

    return (
      Math.floor(duration.asHours()) + moment.utc(difference).format(":mm")
    );
  }

  buildUrl(event, type, window) {
    let calendarUrl = "";

    // allow mobile browsers to open the gmail data URI within native calendar app
    // type = (type == "google" && this.isMobile()) ? "outlook" : type;

    switch (type) {
      case "google":
        calendarUrl = "https://calendar.google.com/calendar/render";
        calendarUrl += "?action=TEMPLATE";
        calendarUrl += "&dates=" + this.formatTime(event.startTime);
        calendarUrl += "/" + this.formatTime(event.endTime);
        calendarUrl += "&location=" + encodeURIComponent(event.location);
        calendarUrl += "&text=" + encodeURIComponent(event.title);
        calendarUrl += "&details=" + encodeURIComponent(event.description);
        break;

      case "yahoo":
        // yahoo doesn't utilize endTime so we need to calulate duration
        let duration = this.calculateDuration(event.startTime, event.endTime);
        calendarUrl = "https://calendar.yahoo.com/?v=60&view=d&type=20";
        calendarUrl += "&title=" + encodeURIComponent(event.title);
        calendarUrl += "&st=" + this.formatTime(event.startTime);
        calendarUrl += "&dur=" + duration;
        calendarUrl += "&desc=" + encodeURIComponent(event.description);
        calendarUrl += "&in_loc=" + encodeURIComponent(event.location);
        break;

      case "outlookcom":
        calendarUrl = "https://outlook.live.com/owa/?rru=addevent";
        calendarUrl += "&startdt=" + this.formatTime(event.startTime);
        calendarUrl += "&enddt=" + this.formatTime(event.endTime);
        calendarUrl += "&subject=" + encodeURIComponent(event.title);
        calendarUrl += "&location=" + encodeURIComponent(event.location);
        calendarUrl += "&body=" + encodeURIComponent(event.description);
        calendarUrl += "&allday=false";
        calendarUrl += "&uid=" + this.getRandomKey();
        calendarUrl += "&path=/calendar/view/Month";
        break;

      default:
        calendarUrl = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "BEGIN:VEVENT",
          "URL:" + document.URL,
          "DTSTART:" + this.formatTime(event.startTime),
          "DTEND:" + this.formatTime(event.endTime),
          "SUMMARY:" + event.title,
          "DESCRIPTION:" + event.description,
          "LOCATION:" + event.location,
          "END:VEVENT",
          "END:VCALENDAR"
        ].join("\n");
        if(window){
          calendarUrl = window.URL.createObjectURL(new Blob([calendarUrl], { type: "text/calendar;charset=utf-8" }));
        }
    }

    return calendarUrl;
  }
}

export default helpers;
