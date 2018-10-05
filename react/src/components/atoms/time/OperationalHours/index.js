import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const getDayOfWeek = () => {
  const d = new Date();
  const weekday = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];

  return weekday[d.getDay()];
};

const OperationalHours = (props) => {
  const currentDay = getDayOfWeek();
  const listing = props.listKey ? '--listing' : '';
  return(
    <div className="ma__operational-hours">
      <table className={`ma__operational-hours-table${listing}`}>
        <tbody>
          {props.hours &&
            Object.entries(props.hours).map(([key, value]) => {
              const active = key === currentDay ? '--active' : '';
              const rowKey = props.listKey
                ? `${props.listKey}-row-${key}`
                : null;
              const status = (typeof value.status !== 'undefined' && value.status !== null) ? value.status : true;
              let time = '';
              const dateFormat = new Intl.DateTimeFormat('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric'
              });
              if (status === false) {
                time = 'Closed';
              } else {
                time = `${dateFormat.format(value.start)} - ${dateFormat.format(value.end)}`;
              }
              return(
                <tr
                  key={rowKey}
                  className={`ma__operational-hours-row${active}`}
                >
                  <td className="ma__operational-hours-day">{key}</td>
                  <td className="ma__operational-hours-time">{time}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

OperationalHours.propTypes = {
  hours: PropTypes.shape({
    monday: PropTypes.shape({
      status: PropTypes.bool,
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date)
    }),
    tuesday: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date)
    }),
    wednesday: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date)
    }),
    thursday: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date)
    }),
    friday: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date)
    }),
    saturday: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date)
    }),
    sunday: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date)
    })
  }).isRequired,
  listKey: PropTypes.string.isRequired
};

export default OperationalHours;
