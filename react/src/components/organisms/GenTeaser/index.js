import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import Address from '../../atoms/contact/Address';
import PhoneNumber from '../../atoms/contact/PhoneNumber';
import Email from '../../atoms/contact/Email';
import EventTime from '../../atoms/contact/EventTime';
import LinkDropdown from '../../molecules/LinkDropdown';
import { DecorativeLink, Icon } from '../../../index';
import TeaserSearch from './TeaserSearch';
import TeaserOrgs from './TeaserOrgs';
import { buildUrl } from './utils';
import './style.css';

const GenTeaser = (props) => {
  const {
    children, onClick, onKeyDown, ...rest
  } = props;
  const className = onClick ? 'ma__gen-teaser ma__gen-teaser--clickable' : 'ma__gen-teaser';
  const role = onClick ? 'button' : '';
  return(
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section className={className} onClick={onClick} onKeyDown={onKeyDown} role={role} {...rest}>
      {children}
    </section>
  );
};

GenTeaser.propTypes = {
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  children: PropTypes.node
};

GenTeaser.Details = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__details" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.Details.displayName = 'GenTeaser.Details';

GenTeaser.Details.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.Title = (props) => {
  const {
    level, title, title: { icon }, children, ...rest
  } = props;
  title.icon = icon ? <Icon name={icon} svgWidth={15} svgHeight={15} aria-hidden="true" /> : '';
  const Element = `h${level || 2}`;
  return(
    <Element className="ma__gen-teaser__title" {...rest} >
      {title && <DecorativeLink {...title} />}
      {children}
    </Element>
  );
};

GenTeaser.Title.displayName = 'GenTeaser.Title';

GenTeaser.Title.propTypes = {
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.shape(DecorativeLink.propTypes),
  children: PropTypes.node
};

GenTeaser.Eyebrow = (props) => {
  const { eyebrow, children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__eyebrow" {...rest} >
      {eyebrow && <span>{eyebrow}</span>}
      {children}
    </div>
  );
};

GenTeaser.Eyebrow.displayName = 'GenTeaser.Eyebrow';

GenTeaser.Eyebrow.propTypes = {
  eyebrow: PropTypes.string,
  children: PropTypes.node
};

GenTeaser.Emphasis = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__emphasis" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.Emphasis.displayName = 'GenTeaser.Emphasis';

GenTeaser.Emphasis.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.Date = (props) => {
  const { date, children, ...rest } = props;
  return(
    <span className="ma__gen-teaser__date" {...rest}>
      {date && date}
      {children}
    </span>
  );
};

GenTeaser.Date.displayName = 'GenTeaser.Date';

GenTeaser.Date.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
};

GenTeaser.Orgs = (props) => {
  const { orgs, ...rest } = props;
  return(
    <TeaserOrgs orgs={orgs} {...rest} />
  );
};

GenTeaser.Orgs.displayName = 'GenTeaser.Orgs';

GenTeaser.Orgs.propTypes = {
  orgs: PropTypes.string,
  children: PropTypes.node
};

GenTeaser.Description = (props) => {
  const { children, description, ...rest } = props;
  return(
    <div className="ma__gen-teaser__description" {...rest}>
      {description && <p>{ReactHtmlParser(description)}</p>}
      {children}
    </div>
  );
};

GenTeaser.Description.displayName = 'GenTeaser.Description';

GenTeaser.Description.propTypes = {
  description: PropTypes.string,
  children: PropTypes.node
};

GenTeaser.KeyAction = (props) => {
  const {
    description, href, text, info, children, ...rest
  } = props;
  return(
    <div className="ma__gen-teaser__key-action-item" {...rest} >
      {text && href && <DecorativeLink href={href} text={text} info={info} />}
      {description && <p>{ReactHtmlParser(description)}</p>}
      {children}
    </div>
  );
};

GenTeaser.KeyAction.displayName = 'GenTeaser.KeyAction';

GenTeaser.KeyAction.propTypes = {
  description: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
  info: PropTypes.string,
  children: PropTypes.node
};

GenTeaser.SubLinks = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__key-action" {...rest}>
      {children.length > 2 ? (
        <React.Fragment>
          <div className="ma__gen-teaser__key-action-col">
            {children.slice(0, 2)}
          </div>
          <div className="ma__gen-teaser__key-action-col">
            {children.slice(2, 4)}
          </div>
        </React.Fragment>
      ) : <div className="ma__gen-teaser__key-action-col">{children}</div>}
    </div>
  );
};

GenTeaser.SubLinks.displayName = 'GenTeaser.SubLinks';

GenTeaser.SubLinks.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.MoreInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__moreinfo" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.MoreInfo.displayName = 'GenTeaser.MoreInfo';

GenTeaser.MoreInfo.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.PrimaryInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__pimary" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.PrimaryInfo.displayName = 'GenTeaser.PrimaryInfo';

GenTeaser.PrimaryInfo.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.SecondaryInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__secondary" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.SecondaryInfo.displayName = 'GenTeaser.SecondaryInfo';

GenTeaser.SecondaryInfo.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.Address = (props) => {
  const {
    address, directionLink, details, ...rest
  } = props;
  const addrProps = {
    address,
    directionLink,
    details
  };
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <Icon name="marker" svgWidth={15} svgHeight={15} />
      </span>
      <Address {...addrProps} />
    </div>
  );
};

GenTeaser.Address.displayName = 'GenTeaser.Address';

GenTeaser.Address.propTypes = {
  address: PropTypes.string,
  directionLink: PropTypes.string,
  details: PropTypes.string
};

GenTeaser.Phone = (props) => {
  const { number, details, ...rest } = props;
  const phoneProps = {
    number,
    details
  };
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <Icon name="phone" svgWidth={15} svgHeight={15} />
      </span>
      <PhoneNumber {...phoneProps} />
    </div>
  );
};

GenTeaser.Phone.displayName = 'GenTeaser.Phone';

GenTeaser.Phone.propTypes = {
  number: PropTypes.string,
  details: PropTypes.string
};

GenTeaser.Email = (props) => {
  const { email, details, ...rest } = props;
  const emailProps = {
    email,
    details
  };
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <Icon name="mail" svgWidth={15} svgHeight={15} />
      </span>
      <Email {...emailProps} />
    </div>
  );
};

GenTeaser.Email.displayName = 'GenTeaser.Email';

GenTeaser.Email.propTypes = {
  email: PropTypes.string,
  details: PropTypes.string
};

GenTeaser.Event = (props) => {
  const {
    calendars, startDate, endDate, details, location, description, title, ...rest
  } = props;
  const dropdownProps = {
    dropdownButton: {
      text: 'Add to calendar',
      theme: 'c-primary',
      usage: 'quaternary-simple',
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
    <React.Fragment>
      <div className="ma__gen-teaser__infoitem" {...rest}>
        <span className="ma__gen-teaser__infoitem-icon">
          <Icon name="calendar" svgWidth={15} svgHeight={15} />
        </span>
        <EventTime {...eventProps} />
      </div>
      <LinkDropdown {...dropdownProps} />
    </React.Fragment>
  );
};

GenTeaser.Event.displayName = 'GenTeaser.Event';

GenTeaser.Event.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  location: PropTypes.string,
  details: PropTypes.string,
  calendars: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  description: PropTypes.string
};

GenTeaser.InfoDetails = (props) => {
  const {
    icon, href, text, ...rest
  } = props;
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <Icon name={icon || 'laptop'} svgWidth={15} svgHeight={15} />
      </span>
      {text && !href && <span>{text}</span>}
      {href && text && <DecorativeLink text={text} href={href} />}
    </div>
  );
};

GenTeaser.InfoDetails.displayName = 'GenTeaser.InfoDetails';

GenTeaser.InfoDetails.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  href: PropTypes.string
};

GenTeaser.Tags = (props) => {
  const { tags, ...rest } = props;
  return(
    <div className="ma__gen-teaser__tags" {...rest}>
      {
        // eslint-disable-next-line react/no-array-index-key
        tags.map((tag, index) => <span key={`${tag}--${index}`} className="ma__gen-teaser__tag">{tag}</span>)
      }
    </div>
  );
};

GenTeaser.Tags.displayName = 'GenTeaser.Tags';

GenTeaser.Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

GenTeaser.SearchBar = (props) => {
  const { search, ...rest } = props;
  return(
    <div className="ma__gen-teaser__search" {...rest}>
      <TeaserSearch
        {...search}
      />
    </div>
  );
};

GenTeaser.SearchBar.displayName = 'GenTeaser.SearchBar';

GenTeaser.SearchBar.propTypes = {
  search: PropTypes.shape(TeaserSearch.propTypes).isRequired
};

GenTeaser.Button = (props) => {
  const { button, ...rest } = props;
  const icon = button.icon ? button.icon : <Icon name="expand" width={15} height={15} />;
  return(
    <div className="ma__gen-teaser__button" {...rest}>
      <ButtonWithIcon
        capitalized
        {...button}
        icon={icon}
        size="small"
      />
    </div>
  );
};

GenTeaser.Button.displayName = 'GenTeaser.Button';

GenTeaser.Button.propTypes = {
  button: PropTypes.shape(ButtonWithIcon.propTypes).isRequired
};

GenTeaser.Stat = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__stat" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.Stat.displayName = 'GenTeaser.Stat';

GenTeaser.Stat.propTypes = {
  children: PropTypes.node.isRequired
};

export default GenTeaser;
