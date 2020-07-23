/**
 * FooterSlim module.
 * @module @massds/mayflower-react/FooterSlim
 * @requires module:@massds/mayflower-assets/scss/03-organisms/footer-slim
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import IconMarker from 'MayflowerReactBase/Icon/IconMarker';
import IconPhone from 'MayflowerReactBase/Icon/IconPhone';
import IconLaptop from 'MayflowerReactBase/Icon/IconLaptop';

const FooterSlim = (props) => (
  <footer className="ma__footer_slim" id="footer">
    <div className="ma__footer_slim--container ma__container">
      {props.siteLogo}
      <div className="ma__footer_slim--container-inner">
        <section className="ma__footer_slim--info">
          <h3>{props.title }</h3>
          <p>{props.description }</p>
          <p className="ma__footer_slim--copyright">
            &copy;
            {' '}
            {moment().year()}
            {' '}
            Commonwealth of Massachusetts
          </p>
        </section>
        <section className="ma__footer_slim--details">
          {props.links
            && (
            <div className="ma__footer_slim--links">
              {props.links.map((link, linkIndex) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <a href={link.href} key={`footslimlinks-${linkIndex}`}>{link.title}</a>
              ))}
            </div>
            )}
          {props.contact
            && (
            <div className="ma__footer_slim--contact">
              {props.contact.address
              && (
              <p>
                <IconMarker width={20} height={20} />
                <span>{props.contact.address}</span>
              </p>
              )}
              {props.contact.phone
              && (
              <p>
                <IconPhone width={20} height={20} />
                <span>{props.contact.phone}</span>
              </p>
              )}
              {props.contact.online && props.contact.online.href && props.contact.online.title
              && (
              <p>
                <IconLaptop width={20} height={20} />
                <a href={props.contact.online.href}>{props.contact.online.title}</a>
              </p>
              )}
            </div>
            )}
        </section>
      </div>
    </div>
  </footer>
);

FooterSlim.propTypes = {
  /** The main title to be displayed in the footer */
  title: PropTypes.string.isRequired,
  /** A short description */
  description: PropTypes.string.isRequired,
  /** Additional links for key information */
  links: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string
  })),
  /** Contact details for the responsible authority */
  contact: PropTypes.shape({
    address: PropTypes.string,
    phone: PropTypes.string,
    online: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string
    })
  }),
  /** The domain you want to send users to from the site logo icon */
  // eslint-disable-next-line consistent-return
  siteLogo: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (typeof comp.type === 'string') {
        return comp.type === 'SiteLogo';
      }
      return comp.type.name && comp.type.name === 'SiteLogo';
    };
    if (!component || (component && !isValid(component))) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${
        component.type.name
      }. Validation failed.`);
    }
  }
};

export default FooterSlim;
