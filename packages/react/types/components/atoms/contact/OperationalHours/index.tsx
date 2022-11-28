// @ts-nocheck
/**
 * OperationalHours module.
 * @module @massds/mayflower-react/OperationalHours
 * @requires module:@massds/mayflower-assets/scss/01-atoms/operational-hours
 */
import React from 'react';

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

export interface OperationalHoursProps {
  /** An object that is keyed by the days of the week. Each day
      contains the following:
      status: represents an open or closed day of business for the week. If true, the business is open.
      start: The time the business opens.
      end: The time the business closes. */
  hours: {
    monday?: {
      status?: boolean
      start?: Date
      end?: Date
    }
    tuesday?: {
      start?: Date
      end?: Date
    }
    wednesday?: {
      start?: Date
      end?: Date
    }
    thursday?: {
      start?: Date
      end?: Date
    }
    friday?: {
      start?: Date
      end?: Date
    }
    saturday?: {
      start?: Date
      end?: Date
    }
    sunday?: {
      start?: Date
      end?: Date
    }
  }
  /** Whether to show if currently active or not. */
  showActive?: boolean
  /** A unique string used for generating the display of days for week. */
  listKey: string
  /** Current day for the week that gets highlighted. */
  currentDay?: string
}

const OperationalHours = (props: OperationalHoursProps) => {
  const listing = props.listKey ? '--listing' : '';
  return(
    <div className="ma__operational-hours">
      <table className={`ma__operational-hours-table${listing}`}>
        <tbody>
          {props.hours
            && Object.entries(props.hours).map(([key, value]) => {
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

OperationalHours.defaultProps = {
  showActive: true,
  currentDay
};

export default OperationalHours;
