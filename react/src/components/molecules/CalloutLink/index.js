import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../atoms/icons/Icon';
import './style.css';

const CalloutLink = (calloutLink) => {
  const calloutLinkTheme = calloutLink.theme ? ` ma__callout-link--${calloutLink.theme}` : '';
  const classNames = `ma__callout-link${calloutLinkTheme}`;

  return(
    <div className={classNames} title={calloutLink.info}>
      <a href={calloutLink.href}>
        { (calloutLink.eyebrow || calloutLink.time) && (
          <div className="ma__callout-link__header">
            <span className="ma__callout-link__eyebrow">{calloutLink.eyebrow}</span>
            <span className="ma__callout-link__time">{calloutLink.time}</span>
          </div>
        )}
        <span className="ma__callout-link__container">
          <span className="ma__callout-link__text" >{calloutLink.text}&nbsp;<Icon name="arrow" /></span>
        </span>
        { calloutLink.emphasized && (<span className="ma__callout-link__emphasized">{calloutLink.emphasized}</span>)}
        { calloutLink.description && (<p className="ma__callout-link__description">{calloutLink.description}</p>)}
      </a>
    </div>
  );
};

CalloutLink.propTypes = {
  /** The heading text  */
  text: PropTypes.string.isRequired,
  /** The link the callout is going to */
  href: PropTypes.string.isRequired,
  /** Add more information about the link */
  info: PropTypes.string,
  /** Add description text under the title text */
  description: PropTypes.string,
  /** Adds and eyebrow to the callout link */
  eyebrow: PropTypes.string,
  /** Adds a time note to the top left of the card */
  time: PropTypes.string,
  /** Adds emphasized text below the title link */
  emphasized: PropTypes.string,
  /** Change the theme of the callout link, option are default (blue) and white */
  theme: PropTypes.oneOf(['', 'white'])
};

export default CalloutLink;
