import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

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
const currentDay = getDayOfWeek();

const OperationalHours = (props) => {
  const listing = props.listKey ? '--listing' : '';
  return(
    <div className="ma__operational-hours">
      <table className={`ma__operational-hours-table${listing}`}>
        <tbody>
          {props.hours &&
            Object.entries(props.hours).map(([key, value]) => {
              const active = (props.showActive && key === props.currentDay) ? '--active' : '';
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
  /** An object that is keyed by the days of the week. Each day
      contains the following:
      status: represents an open or closed day of business for the week. If true, the business is open.
      start: The time the business opens.
      end: The time the business closes. */
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
  /** Whether to show if currently active or not. */
  showActive: PropTypes.bool,
  /** A unique string used for generating the display of days for week. */
  listKey: PropTypes.string.isRequired,
  /** Current day for the week that gets highlighted. */
  currentDay: PropTypes.string
};

OperationalHours.defaultProps = {
  showActive: true,
  currentDay
};

export default OperationalHours;
