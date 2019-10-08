import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import { DecorativeLink, Icon, LinkDropdown, EventTime, Email, PhoneNumber, Address, ButtonWithIcon } from '../../../index';
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

GenTeaser.displayName = 'GenTeaser';

GenTeaser.propTypes = {
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  children: PropTypes.node
};

const GenTeaserDetails = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__details" {...rest}>
      {children}
    </div>
  );
};

GenTeaserDetails.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.Details = GenTeaserDetails;
GenTeaser.Details.displayName = 'GenTeaser.Details';

const GenTeaserTitle = (props) => {
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

GenTeaserTitle.propTypes = {
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.shape(DecorativeLink.propTypes),
  children: PropTypes.node
};

GenTeaser.Title = GenTeaserTitle;
GenTeaser.Title.displayName = 'GenTeaser.Title';

const GenTeaserEyebrow = (props) => {
  const { eyebrow, children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__eyebrow" {...rest} >
      {eyebrow && <span>{eyebrow}</span>}
      {children}
    </div>
  );
};

GenTeaserEyebrow.propTypes = {
  eyebrow: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node
};

GenTeaser.Eyebrow = GenTeaserEyebrow;
GenTeaser.Eyebrow.displayName = 'GenTeaser.Eyebrow';

const GenTeaserEmphasis = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__emphasis" {...rest}>
      {children}
    </div>
  );
};

GenTeaserEmphasis.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.Emphasis = GenTeaserEmphasis;
GenTeaser.Emphasis.displayName = 'GenTeaser.Emphasis';

const GenTeaserDate = (props) => {
  const { date, children, ...rest } = props;
  return(
    <span className="ma__gen-teaser__date" {...rest}>
      {date && date}
      {children}
    </span>
  );
};

GenTeaserDate.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
};

GenTeaser.Date = GenTeaserDate;
GenTeaser.Date.displayName = 'GenTeaser.Date';

const GenTeaserOrgs = (props) => {
  const { orgs, ...rest } = props;
  return(
    <TeaserOrgs orgs={orgs} {...rest} />
  );
};

GenTeaserOrgs.propTypes = {
  orgs: PropTypes.string,
  children: PropTypes.node
};

GenTeaser.Orgs = GenTeaserOrgs;
GenTeaser.Orgs.displayName = 'GenTeaser.Orgs';

const GenTeaserDescription = (props) => {
  const { children, description, ...rest } = props;
  return(
    <div className="ma__gen-teaser__description" {...rest}>
      {description && <p>{ReactHtmlParser(description)}</p>}
      {children}
    </div>
  );
};

GenTeaserDescription.propTypes = {
  description: PropTypes.string,
  children: PropTypes.node
};

GenTeaser.Description = GenTeaserDescription;
GenTeaser.Description.displayName = 'GenTeaser.Description';

const GenTeaserKeyAction = (props) => {
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

GenTeaserKeyAction.propTypes = {
  description: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
  info: PropTypes.string,
  children: PropTypes.node
};

GenTeaser.KeyAction = GenTeaserKeyAction;
GenTeaser.KeyAction.displayName = 'GenTeaser.KeyAction';

const GenTeaserSubLinks = (props) => {
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

GenTeaserSubLinks.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.SubLinks = GenTeaserSubLinks;
GenTeaser.SubLinks.displayName = 'GenTeaser.SubLinks';

const GenTeaserMoreInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__moreinfo" {...rest}>
      {children}
    </div>
  );
};

GenTeaserMoreInfo.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.MoreInfo = GenTeaserMoreInfo;
GenTeaser.MoreInfo.displayName = 'GenTeaser.MoreInfo';

const GenTeaserPrimaryInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__pimary" {...rest}>
      {children}
    </div>
  );
};

GenTeaserPrimaryInfo.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.PrimaryInfo = GenTeaserPrimaryInfo;
GenTeaser.PrimaryInfo.displayName = 'GenTeaser.PrimaryInfo';

const GenTeaserSecondaryInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__secondary" {...rest}>
      {children}
    </div>
  );
};

GenTeaserSecondaryInfo.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.SecondaryInfo = GenTeaserSecondaryInfo;
GenTeaser.SecondaryInfo.displayName = 'GenTeaser.SecondaryInfo';

const GenTeaserAddress = (props) => {
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

GenTeaserAddress.propTypes = {
  address: PropTypes.string,
  directionLink: PropTypes.string,
  details: PropTypes.string
};

GenTeaser.Address = GenTeaserAddress;
GenTeaser.Address.displayName = 'GenTeaser.Address';

const GenTeaserPhone = (props) => {
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

GenTeaserPhone.propTypes = {
  number: PropTypes.string,
  details: PropTypes.string
};

GenTeaser.Phone = GenTeaserPhone;
GenTeaser.Phone.displayName = 'GenTeaser.Phone';

const GenTeaserEmail = (props) => {
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

GenTeaserEmail.propTypes = {
  email: PropTypes.string,
  details: PropTypes.string
};

GenTeaser.Email = GenTeaserEmail;
GenTeaser.Email.displayName = 'GenTeaser.Email';

const GenTeaserEvent = (props) => {
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

GenTeaserEvent.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  location: PropTypes.string,
  details: PropTypes.string,
  calendars: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  description: PropTypes.string
};

GenTeaser.Event = GenTeaserEvent;
GenTeaser.Event.displayName = 'GenTeaser.Event';

const GenTeaserInfoDetails = (props) => {
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

GenTeaserInfoDetails.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  href: PropTypes.string
};

GenTeaser.InfoDetails = GenTeaserInfoDetails;
GenTeaser.InfoDetails.displayName = 'GenTeaser.InfoDetails';

const GenTeaserTags = (props) => {
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

GenTeaserTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

GenTeaser.Tags = GenTeaserTags;
GenTeaser.Tags.displayName = 'GenTeaser.Tags';

const GenTeaserSearchBar = (props) => {
  const { search, ...rest } = props;
  return(
    <div className="ma__gen-teaser__search" {...rest}>
      <TeaserSearch
        {...search}
      />
    </div>
  );
};

GenTeaserSearchBar.propTypes = {
  search: PropTypes.shape(TeaserSearch.propTypes).isRequired
};

GenTeaser.SearchBar = GenTeaserSearchBar;
GenTeaser.SearchBar.displayName = 'GenTeaser.SearchBar';

const GenTeaserButton = (props) => {
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

GenTeaserButton.propTypes = {
  button: PropTypes.shape(ButtonWithIcon.propTypes).isRequired
};

GenTeaser.Button = GenTeaserButton;
GenTeaser.Button.displayName = 'GenTeaser.Button';

const GenTeaserStat = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__stat" {...rest}>
      {children}
    </div>
  );
};

GenTeaserStat.propTypes = {
  children: PropTypes.node.isRequired
};

GenTeaser.Stat = GenTeaserStat;
GenTeaser.Stat.displayName = 'GenTeaser.Stat';

export default GenTeaser;
