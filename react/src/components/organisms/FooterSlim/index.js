import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Icon from '../../base/Icon';

import './style.css';

const FooterSlim = (props) => (
  <footer className="ma__footer-slim" id="footer">
    <div className="ma__footer-slim__container ma__container">
      {props.siteLogo}
      <div className="ma__footer-slim__container__inner">
        <div className="ma__footer-slim__info">
          <div className="ma__footer-slim__title">{props.title }</div>
          <p>{props.description }</p>
          <p className="ma__footer-slim__copyright">
            &copy; {moment().year()} Commonwealth of Massachusetts
          </p>
        </div>
        <div className="ma__footer-slim__details">
          {props.links &&
            <div className="ma__footer-slim__links">
              {props.links.map((link, linkIndex) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <a href={link.href} key={`footslimlinks-${linkIndex}`}>{link.title}</a>
              ))}
            </div>
          }
          {props.contact &&
            <div className="ma__footer-slim__contact">
              {props.contact.address &&
              <p>
                <Icon name="marker" svgWidth={20} svgHeight={20} />
                <span>{props.contact.address}</span>
              </p>
              }
              {props.contact.phone &&
              <p>
                <Icon name="phone" svgWidth={20} svgHeight={20} />
                <span>{props.contact.phone}</span>
              </p>
              }
              {props.contact.online && props.contact.online.href && props.contact.online.title &&
              <p>
                <Icon name="laptop" svgWidth={20} svgHeight={20} />
                <a href={props.contact.online.href}>{props.contact.online.title}</a>
              </p>
              }
            </div>
          }
        </div>
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
