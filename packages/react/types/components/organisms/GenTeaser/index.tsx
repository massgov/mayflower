// @ts-nocheck
/**
 * GenTeaser module.
 * @module @massds/mayflower-react/GenTeaser
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/email
 * @requires module:@massds/mayflower-assets/scss/01-atoms/image
 * @requires module:@massds/mayflower-assets/scss/01-atoms/event-time
 * @requires module:@massds/mayflower-assets/scss/01-atoms/phone-number
 * @requires module:@massds/mayflower-assets/scss/01-atoms/address
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import ReactHtmlParser from 'html-react-parser';
import classNames from 'classnames';

import LinkDropdown from 'MayflowerReactMolecules/LinkDropdown';
// eslint-disable-next-line import/no-unresolved
import * as Icon from 'MayflowerReactBase/Icon';
import ButtonWithIcon, { ButtonWithIconProps } from 'MayflowerReactButtons/ButtonWithIcon';
import DecorativeLink, { DecorativeLinkProps } from 'MayflowerReactLinks/DecorativeLink';
import Email from 'MayflowerReactContact/Email';
import Image, { ImageProps } from 'MayflowerReactMedia/Image';
import EventTime from 'MayflowerReactContact/EventTime';
import PhoneNumber from 'MayflowerReactContact/PhoneNumber';
import Address from 'MayflowerReactContact/Address';
import TeaserSearch, { TeaserSearchProps } from 'MayflowerReactGenTeaser/TeaserSearch';
import TeaserOrgs from 'MayflowerReactGenTeaser/TeaserOrgs';
import { buildUrl } from 'MayflowerReactOrganisms/GenTeaser/utils';

export interface GenTeaserProps {
  /** A custom on click function */
  onClick?(...args: unknown[]): unknown
  /** A custom on key down function */
  onKeyDown?(...args: unknown[]): unknown
  /** React children to render */
  children?: React.ReactNode
  /** whether to stack image on top */
  stacked?: boolean
  /** alignment for description relative to image */
  align?: "top" | "center"
  /** A custom class. */
  className?: string
}

const GenTeaser = (props: GenTeaserProps) => {
  const {
    children, onClick, onKeyDown, stacked, align, className, ...rest
  } = props;
  const teaserClasses = classNames({
    'ma__gen-teaser': true,
    'ma__gen-teaser--clickable': onClick,
    'ma__gen-teaser--stacked': stacked,
    [`ma__gen-teaser--align-${align}`]: align,
    [`${className}`]: !!className
  });
  const role = onClick ? 'button' : null;
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    (<section className={teaserClasses} onClick={onClick} onKeyDown={onKeyDown} role={role} {...rest}>
      {children}
    </section>)
  );
};

GenTeaser.displayName = 'GenTeaser';

export default GenTeaser;

export interface GenTeaserDetailsProps {
  /** React children to render */
  children: React.ReactNode
}

/**
  Wrapper
  */

const GenTeaserDetails = (props: GenTeaserDetailsProps) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__details" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.Details = GenTeaserDetails;
GenTeaser.Details.displayName = 'GenTeaser.Details';

export interface GenTeaserImageProps {
  /** Either a string or react component */
  img?: ImageProps
  /** React children to render */
  children?: React.ReactNode
}

/**
  Image
  */

const GenTeaserImage = (props: GenTeaserImageProps) => {
  const { img, children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__image" {...rest}>
      {children || (img && (
        <Image {...img} />
      ))}
    </div>
  );
};

GenTeaser.Image = GenTeaserImage;
GenTeaser.Image.displayName = 'GenTeaser.Image';

export interface GenTeaserEyebrowProps {
  /** Either a string or react component */
  eyebrow?: string | object
  /** React children to render */
  children?: React.ReactNode
}

/**
  Eyebrow
  */

const GenTeaserEyebrow = (props: GenTeaserEyebrowProps) => {
  const { eyebrow, children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__eyebrow" {...rest}>
      {children || eyebrow}
    </div>
  );
};

GenTeaser.Eyebrow = GenTeaserEyebrow;
GenTeaser.Eyebrow.displayName = 'GenTeaser.Eyebrow';

export interface GenTeaserButtonProps {
  /** Expects props from ButtonWithIcon (e.g. text, info, etc.) */
  button: ButtonWithIconProps
}

/**
  Expand Button
  */

const GenTeaserButton = (props: GenTeaserButtonProps) => {
  const { button, ...rest } = props;
  const icon = button.icon ? button.icon : <Icon.IconExpand width={15} height={15} />;
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

GenTeaser.Button = GenTeaserButton;
GenTeaser.Button.displayName = 'GenTeaser.Button';

export interface GenTeaserStatProps {
  /** Expects to receive children directly (e.g. `<span><b>103 item</b></span>`). */
  children: React.ReactNode
}

/**
  Stat info
  */

const GenTeaserStat = (props: GenTeaserStatProps) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__stat" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.Stat = GenTeaserStat;
GenTeaser.Stat.displayName = 'GenTeaser.Stat';

export interface GenTeaserTitleProps {
  /** The heading level of the title */
  level?: string | number
  /** The title object (text, info, href) */
  title?: DecorativeLinkProps
  /** React children to render */
  children?: React.ReactNode
}

/**
  Title Link
  */
const GenTeaserTitle = (props: GenTeaserTitleProps) => {
  const {
    level, title = {}, children, ...rest
  } = props;
  const decorativeProps = JSON.parse(JSON.stringify(title));
  if (title.icon) {
    const IconComponent = Icon[title.icon];
    decorativeProps.icon = <IconComponent width={15} height={15} aria-hidden="true" />;
  }
  const Element = `h${level || 2}`;
  return(
    <Element className="ma__gen-teaser__title" {...rest}>
      {children || <DecorativeLink {...decorativeProps} />}
    </Element>
  );
};

GenTeaser.Title = GenTeaserTitle;
GenTeaser.Title.displayName = 'GenTeaser.Title';

export interface GenTeaserEmphasisProps {
  /** React children to render */
  children: React.ReactNode
}

/**
  Emphasis wrapper for Date and Orgs
  */

const GenTeaserEmphasis = (props: GenTeaserEmphasisProps) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__emphasis" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.Emphasis = GenTeaserEmphasis;
GenTeaser.Emphasis.displayName = 'GenTeaser.Emphasis';

export interface GenTeaserDateProps {
  /** Either a formatted date or a formatted date with a label */
  date?: string | number
  /** React children to render */
  children?: React.ReactNode
}

/**
  Date
  */

const GenTeaserDate = (props: GenTeaserDateProps) => {
  const { date, children, ...rest } = props;
  return(
    <span className="ma__gen-teaser__date" {...rest}>
      {children || date}
    </span>
  );
};

GenTeaser.Date = GenTeaserDate;
GenTeaser.Date.displayName = 'GenTeaser.Date';

export interface GenTeaserOrgsProps {
  /** An comma seperate list of organizations */
  orgs?: string
}

/**
  Orgs
  */

const GenTeaserOrgs = (props: GenTeaserOrgsProps) => {
  const { orgs, ...rest } = props;
  return(
    <TeaserOrgs orgs={orgs} {...rest} />
  );
};

GenTeaser.Orgs = GenTeaserOrgs;
GenTeaser.Orgs.displayName = 'GenTeaser.Orgs';

export interface GenTeaserDescriptionProps {
  /** A html formatted or plain string of text */
  description?: string
  /** React children to render */
  children?: React.ReactNode
}

/**
  Description
  */

const GenTeaserDescription = (props: GenTeaserDescriptionProps) => {
  const { children, description, ...rest } = props;
  let descriptionHTML = null;
  if (typeof (description) === 'string') {
    const parserOptions = {
      replace: (domNode) => {
        // Wrap children text nodes in spans to persist DOM relationship consistency for ReactDOM when Google Translate manipulates the DOM tree
        // eslint-disable-next-line react/no-array-index-key
        if (domNode.type === 'text') {
          return(
            <span>
              {domNode.data}
            </span>
          );
        }

        return null;
      }
    };
    descriptionHTML = ReactHtmlParser(description, parserOptions);
  }

  return(
    <div className="ma__gen-teaser__description" {...rest}>
      {children || <p>{descriptionHTML}</p>}
    </div>
  );
};

GenTeaser.Description = GenTeaserDescription;
GenTeaser.Description.displayName = 'GenTeaser.Description';

export interface GenTeaserSearchBarProps {
  /**
    search:
      target: target url of the search bar
      id: id of the search bar
      queryInput: query input variable to replace in the target url with the user entered term
      placeholder: Placeholder text of the search bar.
  */
  search: TeaserSearchProps
}

/**
  Search bar
  */

const GenTeaserSearchBar = (props: GenTeaserSearchBarProps) => {
  const { search, ...rest } = props;
  return(
    <div className="ma__gen-teaser__search" {...rest}>
      <TeaserSearch
        {...search}
      />
    </div>
  );
};

GenTeaser.SearchBar = GenTeaserSearchBar;
GenTeaser.SearchBar.displayName = 'GenTeaser.SearchBar';

export interface GenTeaserSubLinksProps {
  /** React children to render */
  children: React.ReactNode
}

/**
  SubLinks wrapper for formatting key actions into 2 columns
  */

const GenTeaserSubLinks = (props: GenTeaserSubLinksProps) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__key-action" {...rest}>
      {children.length > 2 ? (
        <>
          <div className="ma__gen-teaser__key-action-col">
            {children.slice(0, 2)}
          </div>
          <div className="ma__gen-teaser__key-action-col">
            {children.slice(2, 4)}
          </div>
        </>
      ) : <div className="ma__gen-teaser__key-action-col">{children}</div>}
    </div>
  );
};

GenTeaser.SubLinks = GenTeaserSubLinks;
GenTeaser.SubLinks.displayName = 'GenTeaser.SubLinks';

export interface GenTeaserKeyActionProps {
  /** A description of the link */
  description?: string
  /** A link */
  href?: string
  /** Link text */
  text?: string
  /** Link info */
  info?: string
  /** React children to render */
  children?: React.ReactNode
}

/**
  KeyAction
  */

const GenTeaserKeyAction = (props: GenTeaserKeyActionProps) => {
  const {
    description, href, text, info, children, ...rest
  } = props;
  return(
    <div className="ma__gen-teaser__key-action-item" {...rest}>
      {children || (
        <>
          {text && href && <DecorativeLink href={href} text={text} info={info} />}
          {description && <p>{ReactHtmlParser(description)}</p>}
        </>
      )}
    </div>
  );
};

GenTeaser.KeyAction = GenTeaserKeyAction;
GenTeaser.KeyAction.displayName = 'GenTeaser.KeyAction';

export interface GenTeaserMoreInfoProps {
  /** React children to render */
  children: React.ReactNode
}

/**
  MoreInfo wrapper for formatting primary and secondary info
  */

const GenTeaserMoreInfo = (props: GenTeaserMoreInfoProps) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__moreinfo" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.MoreInfo = GenTeaserMoreInfo;
GenTeaser.MoreInfo.displayName = 'GenTeaser.MoreInfo';

export interface GenTeaserPrimaryInfoProps {
  /** React children to render */
  children: React.ReactNode
}

/**
  Primary info
  */

const GenTeaserPrimaryInfo = (props: GenTeaserPrimaryInfoProps) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__pimary" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.PrimaryInfo = GenTeaserPrimaryInfo;
GenTeaser.PrimaryInfo.displayName = 'GenTeaser.PrimaryInfo';

export interface GenTeaserSecondaryInfoProps {
  /** React children to render */
  children: React.ReactNode
}

/**
  Secondary info
  */

const GenTeaserSecondaryInfo = (props: GenTeaserSecondaryInfoProps) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__secondary" {...rest}>
      {children}
    </div>
  );
};

GenTeaser.SecondaryInfo = GenTeaserSecondaryInfo;
GenTeaser.SecondaryInfo.displayName = 'GenTeaser.SecondaryInfo';

export interface GenTeaserAddressProps {
  /** A string or html formatted string of the address */
  address?: string
  /** A link to directions to the address */
  directionLink?: string
  /** Any details related to the phone number */
  details?: string
}

/**
  Address
  */

const GenTeaserAddress = (props: GenTeaserAddressProps) => {
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
        <Icon.IconMarker width={15} height={15} />
      </span>
      <Address {...addrProps} />
    </div>
  );
};

GenTeaser.Address = GenTeaserAddress;
GenTeaser.Address.displayName = 'GenTeaser.Address';

export interface GenTeaserPhoneProps {
  /** The phone number */
  number?: string
  /** Any details related to the phone number */
  details?: string
}

/**
  Phone
  */

const GenTeaserPhone = (props: GenTeaserPhoneProps) => {
  const { number, details, ...rest } = props;
  const phoneProps = {
    number,
    details
  };
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <Icon.IconPhone width={15} height={15} />
      </span>
      <PhoneNumber {...phoneProps} />
    </div>
  );
};

GenTeaser.Phone = GenTeaserPhone;
GenTeaser.Phone.displayName = 'GenTeaser.Phone';

export interface GenTeaserEmailProps {
  /** The email address. */
  email: string
  /** Details around contacting the provided email. */
  details?: string | object
}

/**
  Email
  */

const GenTeaserEmail = (props: GenTeaserEmailProps) => {
  const { email, details, ...rest } = props;
  const emailProps = {
    email,
    details
  };
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <Icon.IconMail width={15} height={15} />
      </span>
      <Email {...emailProps} />
    </div>
  );
};

GenTeaser.Email = GenTeaserEmail;
GenTeaser.Email.displayName = 'GenTeaser.Email';

export interface GenTeaserEventProps {
  /** The start date & time of the event  */
  startDate?: string
  /** The end date & time of the event  */
  endDate?: string
  /** The address of the event */
  location?: string
  /** Any details about the event */
  details?: string
  /** What type of calendars you would like users to be able to add to.
      'google', 'yahoo', and 'outlookcom' if passed will render as specific
      formats, all others render as base ics format.
   */
  calendars?: string[]
  /** The title of the event */
  title?: string
  /** A description of the event */
  description?: string
}

/**
  Event
  */

const GenTeaserEvent = (props: GenTeaserEventProps) => {
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
          <Icon.IconCalendar width={15} height={15} />
        </span>
        <EventTime {...eventProps} />
      </div>
      <LinkDropdown {...dropdownProps} />
    </>
  );
};

GenTeaser.Event = GenTeaserEvent;
GenTeaser.Event.displayName = 'GenTeaser.Event';

export interface GenTeaserInfoDetailsProps {
  /** The text information related to the details */
  text: string
  /** The icon to render in the text, defaults to laptop icon. */
  icon?: string
  /** A link for the text */
  href?: string
}

/**
  Info details
  */

const GenTeaserInfoDetails = (props: GenTeaserInfoDetailsProps) => {
  const {
    icon, href, text, ...rest
  } = props;
  const IconComponent = Icon?.[icon] ? Icon[icon] : Icon.IconLaptop;
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <IconComponent width={15} height={15} />
      </span>
      {text && !href && <span>{text}</span>}
      {href && text && <DecorativeLink text={text} href={href} />}
    </div>
  );
};

GenTeaser.InfoDetails = GenTeaserInfoDetails;
GenTeaser.InfoDetails.displayName = 'GenTeaser.InfoDetails';

export interface GenTeaserTagsProps {
  /** An array of tags */
  tags: string[]
}

/**
  Tags
  */

const GenTeaserTags = (props: GenTeaserTagsProps) => {
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

GenTeaser.Tags = GenTeaserTags;
GenTeaser.Tags.displayName = 'GenTeaser.Tags';
