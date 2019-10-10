import moment from 'moment';

/** The following helper function was implemented following the same logic/strucure
 *  as react-add-to-calendar helpers class.
 *  (https://github.com/jasonsalzman/react-add-to-calendar/blob/master/src/helpers/index.js)
*/

export const getRandomKey = () => {
  const n = Math.floor(Math.random() * 999999999999).toString();
  return`${new Date().getTime().toString()}_${n}`;
};

export const formatTime = (date) => {
  const formattedDate = moment.utc(date).format('YYYYMMDDTHHmmssZ');
  return formattedDate.replace('+00:00', 'Z');
};

export const calculateDuration = (startTime, endTime) => {
  // snag parameters and format properly in UTC
  const end = moment.utc(endTime).format('DD/MM/YYYY HH:mm:ss');
  const start = moment.utc(startTime).format('DD/MM/YYYY HH:mm:ss');

  // calculate the difference in milliseconds between the start and end times
  const difference = moment(end, 'DD/MM/YYYY HH:mm:ss').diff(moment(start, 'DD/MM/YYYY HH:mm:ss'));

  // convert difference from above to a proper momentJs duration object
  const duration = moment.duration(difference);

  return(
    Math.floor(duration.asHours()) + moment.utc(difference).format(':mm')
  );
};

export const buildUrl = (event, type, window) => {
  let calendarUrl = '';

  // allow mobile browsers to open the gmail data URI within native calendar app
  // type = (type == "google" && this.isMobile()) ? "outlook" : type;

  switch (type) {
    case 'google':
      calendarUrl = 'https://calendar.google.com/calendar/render';
      calendarUrl += '?action=TEMPLATE';
      calendarUrl += `&dates=${formatTime(event.startDate)}`;
      calendarUrl += `/${formatTime(event.endDate)}`;
      calendarUrl += `&location=${encodeURIComponent(event.location)}`;
      calendarUrl += `&text=${encodeURIComponent(event.title)}`;
      calendarUrl += `&details=${encodeURIComponent(event.description)}`;
      break;

    case 'yahoo': {
      // yahoo doesn't utilize endTime so we need to calulate duration
      const duration = calculateDuration(event.startDate, event.endDate);
      calendarUrl = 'https://calendar.yahoo.com/?v=60&view=d&type=20';
      calendarUrl += `&title=${encodeURIComponent(event.title)}`;
      calendarUrl += `&st=${formatTime(event.startDate)}`;
      calendarUrl += `&dur=${duration}`;
      calendarUrl += `&desc=${encodeURIComponent(event.description)}`;
      calendarUrl += `&in_loc=${encodeURIComponent(event.location)}`;
      break;
    }


    case 'outlookcom':
      calendarUrl = 'https://outlook.live.com/owa/?rru=addevent';
      calendarUrl += `&startdt=${formatTime(event.startDate)}`;
      calendarUrl += `&enddt=${formatTime(event.endDate)}`;
      calendarUrl += `&subject=${encodeURIComponent(event.title)}`;
      calendarUrl += `&location=${encodeURIComponent(event.location)}`;
      calendarUrl += `&body=${encodeURIComponent(event.description)}`;
      calendarUrl += '&allday=false';
      calendarUrl += `&uid=${getRandomKey()}`;
      calendarUrl += '&path=/calendar/view/Month';
      break;

    default:
      calendarUrl = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `URL:${document.URL}`,
        `DTSTART:${formatTime(event.startDate)}`,
        `DTEND:${formatTime(event.endDate)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\n');
      if (window) {
        calendarUrl = window.URL.createObjectURL(new Blob([calendarUrl], { type: 'text/calendar;charset=utf-8' }));
      }
  }

  return calendarUrl;
};
