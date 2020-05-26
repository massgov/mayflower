import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';

import LinkDropdown from '../../molecules/LinkDropdown';
import Icon from '../../base/Icon';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import DecorativeLink from '../../atoms/links/DecorativeLink';
import Email from '../../atoms/contact/Email';
import Image from '../../atoms/media/Image';
import EventTime from '../../atoms/contact/EventTime';
import PhoneNumber from '../../atoms/contact/PhoneNumber';
import Address from '../../atoms/contact/Address';
import TeaserSearch from './TeaserSearch';
import TeaserOrgs from './TeaserOrgs';
import { buildUrl } from './utils';
import './style.scss';

const GenTeaser = (props) => {
  const {
    children, onClick, onKeyDown, stacked, align, ...rest
  } = props;
  const teaserClasses = classNames({
    'ma__gen-teaser': true,
    'ma__gen-teaser--clickable': onClick,
    'ma__gen-teaser--stacked': stacked,
    [`ma__gen-teaser--align-${align}`]: align
  });
  const role = onClick ? 'button' : '';
  return(
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section className={teaserClasses} onClick={onClick} onKeyDown={onKeyDown} role={role} {...rest}>
      {children}
    </section>
  );
};

GenTeaser.displayName = 'GenTeaser';

GenTeaser.propTypes = {
  /** A custom on click function */
  onClick: PropTypes.func,
  /** A custom on key down function */
  onKeyDown: PropTypes.func,
  /** React children to render */
  children: PropTypes.node,
  /** whether to stack image on top */
  stacked: PropTypes.bool,
  /** alignment for description relative to image */
  align: PropTypes.oneOf(['top', 'center'])
};

export default GenTeaser;

/**
  Wrapper
  */

const GenTeaserDetails = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__details" {...rest}>
      {children}
    </div>
  );
};

GenTeaserDetails.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

GenTeaser.Details = GenTeaserDetails;
GenTeaser.Details.displayName = 'GenTeaser.Details';

/**
  Image
  */

const GenTeaserImage = (props) => {
  const { img, children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__image" {...rest}>
      {children || (img && (
        <Image {...img} />
      ))}
    </div>
  );
};

GenTeaserImage.propTypes = {
  /** Either a string or react component */
  img: PropTypes.shape(Image.propTypes),
  /** React children to render */
  children: PropTypes.node
};

GenTeaser.Image = GenTeaserImage;
GenTeaser.Image.displayName = 'GenTeaser.Image';

/**
  Eyebrow
  */

const GenTeaserEyebrow = (props) => {
  const { eyebrow, children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__eyebrow" {...rest} >
      {children || <span>{eyebrow}</span>}
    </div>
  );
};

GenTeaserEyebrow.propTypes = {
  /** Either a string or react component */
  eyebrow: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** React children to render */
  children: PropTypes.node
};

GenTeaser.Eyebrow = GenTeaserEyebrow;
GenTeaser.Eyebrow.displayName = 'GenTeaser.Eyebrow';

/**
  Expand Button
  */

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
  /** Expects props from ButtonWithIcon (e.g. text, info, etc.) */
  button: PropTypes.shape(ButtonWithIcon.propTypes).isRequired
};

GenTeaser.Button = GenTeaserButton;
GenTeaser.Button.displayName = 'GenTeaser.Button';

/**
  Stat info
  */

const GenTeaserStat = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__stat" {...rest}>
      {children}
    </div>
  );
};

GenTeaserStat.propTypes = {
  /** Expects to receive children directly (e.g. <span><b>103 item</b></span>). */
  children: PropTypes.node.isRequired
};

GenTeaser.Stat = GenTeaserStat;
GenTeaser.Stat.displayName = 'GenTeaser.Stat';


/**
  Title Link
  */
const GenTeaserTitle = (props) => {
  const {
    level, title, children, ...rest
  } = props;
  if (title) {
    title.icon = title.icon ? <Icon name={title.icon} svgWidth={15} svgHeight={15} aria-hidden="true" /> : '';
  }
  const Element = `h${level || 2}`;
  return(
    <Element className="ma__gen-teaser__title" {...rest} >
      {children || <DecorativeLink {...title} />}
    </Element>
  );
};

GenTeaserTitle.propTypes = {
  /** The heading level of the title */
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The title object (text, info, href) */
  title: PropTypes.shape(DecorativeLink.propTypes),
  /** React children to render */
  children: PropTypes.node
};

GenTeaser.Title = GenTeaserTitle;
GenTeaser.Title.displayName = 'GenTeaser.Title';

/**
  Emphasis wrapper for Date and Orgs
  */

const GenTeaserEmphasis = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__emphasis" {...rest}>
      {children}
    </div>
  );
};


GenTeaserEmphasis.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

GenTeaser.Emphasis = GenTeaserEmphasis;
GenTeaser.Emphasis.displayName = 'GenTeaser.Emphasis';

/**
  Date
  */

const GenTeaserDate = (props) => {
  const { date, children, ...rest } = props;
  return(
    <span className="ma__gen-teaser__date" {...rest}>
      {children || date}
    </span>
  );
};

GenTeaserDate.propTypes = {
  /** Either a formatted date or a formatted date with a label */
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** React children to render */
  children: PropTypes.node
};

GenTeaser.Date = GenTeaserDate;
GenTeaser.Date.displayName = 'GenTeaser.Date';


/**
  Orgs
  */

const GenTeaserOrgs = (props) => {
  const { orgs, ...rest } = props;
  return(
    <TeaserOrgs orgs={orgs} {...rest} />
  );
};

GenTeaserOrgs.propTypes = {
  /** An comma seperate list of organizations */
  orgs: PropTypes.string
};

GenTeaser.Orgs = GenTeaserOrgs;
GenTeaser.Orgs.displayName = 'GenTeaser.Orgs';

/**
  Description
  */

const GenTeaserDescription = (props) => {
  const { children, description, ...rest } = props;
  return(
    <div className="ma__gen-teaser__description" {...rest}>
      {children || <p>{ReactHtmlParser(description)}</p>}
    </div>
  );
};

GenTeaserDescription.propTypes = {
  /** A html formatted or plain string of text */
  description: PropTypes.string,
  /** React children to render */
  children: PropTypes.node
};

GenTeaser.Description = GenTeaserDescription;
GenTeaser.Description.displayName = 'GenTeaser.Description';

/**
  Search bar
  */

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
  /**
    search:
      target: target url of the search bar
      id: id of the search bar
      queryInput: query input variable to replace in the target url with the user entered term
      placeholder: Placeholder text of the search bar.
  */
  search: PropTypes.shape(TeaserSearch.propTypes).isRequired
};

GenTeaser.SearchBar = GenTeaserSearchBar;
GenTeaser.SearchBar.displayName = 'GenTeaser.SearchBar';

/**
  SubLinks wrapper for formatting key actions into 2 columns
  */

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
  /** React children to render */
  children: PropTypes.node.isRequired
};

GenTeaser.SubLinks = GenTeaserSubLinks;
GenTeaser.SubLinks.displayName = 'GenTeaser.SubLinks';

/**
  KeyAction
  */

const GenTeaserKeyAction = (props) => {
  const {
    description, href, text, info, children, ...rest
  } = props;
  return(
    <div className="ma__gen-teaser__key-action-item" {...rest} >
      {children || (
        <React.Fragment>
          {text && href && <DecorativeLink href={href} text={text} info={info} />}
          {description && <p>{ReactHtmlParser(description)}</p>}
        </React.Fragment>
      )}
    </div>
  );
};

GenTeaserKeyAction.propTypes = {
  /** A description of the link */
  description: PropTypes.string,
  /** A link */
  href: PropTypes.string,
  /** Link text */
  text: PropTypes.string,
  /** Link info */
  info: PropTypes.string,
  /** React children to render */
  children: PropTypes.node
};

GenTeaser.KeyAction = GenTeaserKeyAction;
GenTeaser.KeyAction.displayName = 'GenTeaser.KeyAction';

/**
  MoreInfo wrapper for formatting primary and secondary info
  */

const GenTeaserMoreInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__moreinfo" {...rest}>
      {children}
    </div>
  );
};

GenTeaserMoreInfo.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

GenTeaser.MoreInfo = GenTeaserMoreInfo;
GenTeaser.MoreInfo.displayName = 'GenTeaser.MoreInfo';

/**
  Primary info
  */

const GenTeaserPrimaryInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__pimary" {...rest}>
      {children}
    </div>
  );
};

GenTeaserPrimaryInfo.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

GenTeaser.PrimaryInfo = GenTeaserPrimaryInfo;
GenTeaser.PrimaryInfo.displayName = 'GenTeaser.PrimaryInfo';

/**
  Secondary info
  */

const GenTeaserSecondaryInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__secondary" {...rest}>
      {children}
    </div>
  );
};

GenTeaserSecondaryInfo.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

GenTeaser.SecondaryInfo = GenTeaserSecondaryInfo;
GenTeaser.SecondaryInfo.displayName = 'GenTeaser.SecondaryInfo';

/**
  Address
  */

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
  /** A string or html formatted string of the address */
  address: PropTypes.string,
  /** A link to directions to the address */
  directionLink: PropTypes.string,
  /** Any details related to the phone number */
  details: PropTypes.string
};

GenTeaser.Address = GenTeaserAddress;
GenTeaser.Address.displayName = 'GenTeaser.Address';

/**
  Phone
  */

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
  /** The phone number */
  number: PropTypes.string,
  /** Any details related to the phone number */
  details: PropTypes.string
};

GenTeaser.Phone = GenTeaserPhone;
GenTeaser.Phone.displayName = 'GenTeaser.Phone';

/**
  Email
  */

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
  /** An email object */
  email: PropTypes.shape(Email.propTypes).isRequired,
  /** Any details related to the email */
  details: PropTypes.string
};

GenTeaser.Email = GenTeaserEmail;
GenTeaser.Email.displayName = 'GenTeaser.Email';

/**
  Event
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

GenTeaser.Event = GenTeaserEvent;
GenTeaser.Event.displayName = 'GenTeaser.Event';

/**
  Info details
  */

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
  /** The text information related to the details */
  text: PropTypes.string.isRequired,
  /** The icon to render in the text, defaults to laptop icon. */
  icon: PropTypes.string,
  /** A link for the text */
  href: PropTypes.string
};

GenTeaser.InfoDetails = GenTeaserInfoDetails;
GenTeaser.InfoDetails.displayName = 'GenTeaser.InfoDetails';

/**
  Tags
  */

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
  /** An array of tags */
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

GenTeaser.Tags = GenTeaserTags;
GenTeaser.Tags.displayName = 'GenTeaser.Tags';
