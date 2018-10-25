import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const FooterLinks = (footerLinks) => (
  <section className="ma__footer-links">
    {
      footerLinks.items.map((footerLinksNav, i) => (
        <FooterLinksNav {...footerLinksNav} key={`footerLinksNav_${i}`} index={i} />
      ))
    }
  </section>
);

const FooterLinksNav = (footerLinksNav) => (
  <nav aria-labelledby={footerLinksNav.id}>
    <h2 className="visually-hidden" id={footerLinksNav.id}>{footerLinksNav.heading}</h2>
    <ul className="ma__footer-links__items">
      {
        footerLinksNav.links.map((link, i) => (
          <FooterLink {...link} key={`footerLink_${i}`} />
        ))
      }
    </ul>
  </nav>
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
