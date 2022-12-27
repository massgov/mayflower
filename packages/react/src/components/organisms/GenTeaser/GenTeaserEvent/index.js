/**
 * GenTeaserEvent module.
 * @module @massds/mayflower-react/GenTeaserEvent
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import PropTypes from "prop-types";
import IconCalendar from 'MayflowerReactBase/Icon/IconCalendar';
import LinkDropdown from 'MayflowerReactMolecules/LinkDropdown';
import EventTime from 'MayflowerReactContact/EventTime';
import { buildUrl } from 'MayflowerReactOrganisms/GenTeaser/utils';

/**
 * Event
 */
const GenTeaserEvent = (props) => {
  const {
    calendars, startDate, endDate, details, location, description, title, ...rest
  } = props;
  const dropdownProps = {
    dropdownButton: {
      text: 'Add to Calendar',
      theme: 'c-primary',
      usage: 'quaternary',
      id: 'dropdownbutton-simple',
      'aria-haspopup': true,
      capitalized: true
    }
  };
  const eventProps = {
    startDate,
    endDate,
    details,
    location,
    description,
    title
  };
  dropdownProps.dropdownItems = calendars.map((item) => {
    const { type, text } = item;
    let itemVals = '';
    switch (type) {
      case 'yahoo':
      case 'google':
      case 'outlookcom':
        itemVals = {
          text,
          href: buildUrl(eventProps, type)
        };
        break;
      default:
        itemVals = {
          text,
          href: buildUrl(eventProps, type, window || ''),
          target: '_blank',
          download: 'download.ics'
        };
        break;
    }
    return itemVals;
  });
  return(
    <>
      <div className="ma__gen-teaser__infoitem" {...rest}>
        <span className="ma__gen-teaser__infoitem-icon">
          <IconCalendar width={15} height={15} />
        </span>
        <EventTime {...eventProps} />
      </div>
      <LinkDropdown {...dropdownProps} />
    </>
  );
};

GenTeaserEvent.propTypes = {
  /** The start date & time of the event  */
  startDate: PropTypes.string,
  /** The end date & time of the event  */
  endDate: PropTypes.string,
  /** The address of the event */
  location: PropTypes.string,
  /** Any details about the event */
  details: PropTypes.string,
  /** What type of calendars you would like users to be able to add to.
   'google', 'yahoo', and 'outlookcom' if passed will render as specific
   formats, all others render as base ics format.
   */
  calendars: PropTypes.arrayOf(PropTypes.string),
  /** The title of the event */
  title: PropTypes.string,
  /** A description of the event */
  description: PropTypes.string
};

export default GenTeaserEvent;
