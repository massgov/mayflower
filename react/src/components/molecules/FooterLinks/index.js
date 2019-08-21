import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { SidebarHeading } from '../../../index';

const FooterLinks = (footerLinks) => (
  <React.Fragment>
    <h2 className="ma__visually-hidden" id="footerMenu">Site Navigation Links</h2>
    <nav className="ma__footer-links" aria-labelledby="footerMenu">
      {
        footerLinks.items.map((footerLinksNav, i) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <FooterLinksNav {...footerLinksNav} showNavHeading={footerLinks.showNavHeading} key={`footerLinksNav_${i}`} index={i} />
        ))
      }
    </nav>
  </React.Fragment>
);


const FooterLinksNav = (footerLinksNav) => (
  <div className={`ma__footer-links__items${footerLinksNav.showNavHeading ? ' ma__footer-links__items--heading' : ''}`}>
    {
      footerLinksNav.showNavHeading ? <SidebarHeading title={footerLinksNav.heading} level={2} /> : <h3 className="visually-hidden">{footerLinksNav.heading}</h3>
    }
    <ul>
      {
        footerLinksNav.links.map((link, i) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <FooterLink {...link} key={`footerLink_${i}`} />
        ))
      }
    </ul>
  </div>
);

const FooterLink = (footerLink) => (
  <li className="ma__footer-links__item">
    <a href={footerLink.href} className="ma__footer-links__link">{footerLink.text}</a>
  </li>
);

FooterLink.propTypes = {
  /** The URL for the link */
  href: PropTypes.string.isRequired,
  /** The text for the link */
  text: PropTypes.string.isRequired
};

FooterLinksNav.propTypes = {
  /** The unique ID for the column of links */
  id: PropTypes.string.isRequired,
  /** The text for the heading above the column of links, visually hidden from users */
  heading: PropTypes.string.isRequired,
  /** The links in the column */
  links: PropTypes.arrayOf(PropTypes.shape(FooterLink.propTypes)).isRequired
};

FooterLinks.propTypes = {
  /** The columns of the nav links */
  items: PropTypes.arrayOf(PropTypes.shape(FooterLinksNav.propTypes)).isRequired
};

export default FooterLinks;
