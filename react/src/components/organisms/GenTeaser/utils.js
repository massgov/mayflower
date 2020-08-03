import { differenceInMinutes } from 'date-fns';
import { format, zonedTimeToUtc } from 'date-fns-tz';

/** The following helper function was implemented following the same logic/strucure
 *  as react-add-to-calendar helpers class.
 *  (https://github.com/jasonsalzman/react-add-to-calendar/blob/master/src/helpers/index.js)
*/

const convertMinsToHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  return`${h}:${m}`;
};

export const getRandomKey = () => {
  const n = Math.floor(Math.random() * 999999999999).toString();
  return`${new Date().getTime().toString()}_${n}`;
};

export const formatTime = (date) => `${format(zonedTimeToUtc(date, 'America/New_York'), "yyyyMMdd'T'HHmmss")}Z`;

export const calculateDuration = (startTime, endTime) => convertMinsToHrsMins(differenceInMinutes(endTime, startTime));

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
