import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Icon from '../../atoms/icons/Icon';
import SiteLogo from '../../atoms/media/SiteLogo';

import './style.css';


const FooterSlim = (props) => (
  <footer className="ma__footer_slim" id="footer">
    <div className="ma__footer_slim--container ma__container">
      <SiteLogo />
      <div className="ma__footer_slim--container-inner">
        <section className="ma__footer_slim--info">
          <h3>{props.title }</h3>
          <p>{props.description }</p>
          <p className="ma__footer_slim--copyright">
            &copy; {moment().year()} Commonwealth of Massachusetts
          </p>
        </section>
        <section className="ma__footer_slim--details">
          {props.links &&
            <div className="ma__footer_slim--links">
              {props.links.map((link, linkIndex) => (
                <a href={link.href} key={`footslimlinks-${linkIndex}`}>{link.title}</a>
              ))}
            </div>
          }
          <div className="ma__footer_slim--contact">
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
            {props.contact.online &&
              <p>
                <Icon name="laptop" svgWidth={20} svgHeight={20} />
                <a href={props.contact.online.href}>{props.contact.online.title}</a>
              </p>
            }
          </div>
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
  })
};

export default FooterSlim;
