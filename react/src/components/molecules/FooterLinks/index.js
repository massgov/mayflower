/**
 * FooterLinks module.
 * @module @massds/mayflower-react/FooterLinks
 * @requires module:@massds/mayflower-assets/scss/02-molecules/footer-links
 * @requires module:@massds/mayflower-assets/scss/01-atoms/sidebar-heading
 */
import React from 'react';
import PropTypes from 'prop-types';
import SidebarHeading from 'MayflowerReactHeadings/SidebarHeading';

const FooterLinks = (footerLinks) => (
  <section className="ma__footer-links">
    {
      footerLinks.items.map((footerLinksNav, i) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <FooterLinksNav {...footerLinksNav} showNavHeading={footerLinks.showNavHeading} key={`footerLinksNav_${i}`} index={i} />
      ))
    }
  </section>
);


const FooterLinksNav = (footerLinksNav) => (
  <nav aria-labelledby={footerLinksNav.id} className={`ma__footer-links__items${footerLinksNav.showNavHeading ? ' ma__footer-links__items--heading' : ''}`}>
    {
      footerLinksNav.showNavHeading ? <SidebarHeading title={footerLinksNav.heading} level={2} /> : <h2 className="visually-hidden" id={footerLinksNav.id}>{footerLinksNav.heading}</h2>
    }
    <ul>
      {
        footerLinksNav.links.map((link, i) => (
          /* eslint-disable-next-line react/no-array-index-key */
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
