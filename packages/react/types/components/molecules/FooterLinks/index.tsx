// @ts-nocheck
/**
 * FooterLinks module.
 * @module @massds/mayflower-react/FooterLinks
 * @requires module:@massds/mayflower-assets/scss/02-molecules/footer-links
 * @requires module:@massds/mayflower-assets/scss/01-atoms/sidebar-heading
 */
import React from 'react';
import SidebarHeading from 'MayflowerReactHeadings/SidebarHeading';
import Heading from 'MayflowerReactHeadings/Heading';

export interface FooterLinksProps {
  /** The columns of the nav links */
  items: FooterLinksNavProps[]
}

const FooterLinks = (footerLinks: FooterLinksProps) => (
  <nav className="ma__footer-links" aria-label="Footer navigation">
    {
      footerLinks.items.map((footerLinksNav, i) => (
        /* eslint-disable-next-line react/no-array-index-key */
        (<FooterLinksNav {...footerLinksNav} showNavHeading={footerLinks.showNavHeading} key={`footerLinksNav_${i}`} index={i} />)
      ))
    }
  </nav>
);

export interface FooterLinksNavProps {
  /** The text for the heading above the column of links, visually hidden from users */
  heading: string
  /** The heading level above the column of links, default to 2 */
  headingLevel?: number
  /** The links in the column */
  links: FooterLinkProps[]
}

const FooterLinksNav = (footerLinksNav: FooterLinksNavProps) => (
  <div className={`ma__footer-links__nav ${footerLinksNav.showNavHeading ? ' ma__footer-links__nav--heading' : ''}`}>
    {
      footerLinksNav.showNavHeading ? <SidebarHeading title={footerLinksNav.heading} level={footerLinksNav.headingLevel || 2} /> : <Heading text={footerLinksNav.heading} level={footerLinksNav.headingLevel || 2} class="visually-hidden" />
    }
    <ul className="ma__footer-links__items">
      {
        footerLinksNav.links.map((link, i) => (
          /* eslint-disable-next-line react/no-array-index-key */
          (<FooterLink {...link} key={`footerLink_${i}`} />)
        ))
      }
    </ul>
  </div>
);

export interface FooterLinkProps {
  /** The URL for the link */
  href: string
  /** The text for the link */
  text: string
}

const FooterLink = (footerLink: FooterLinkProps) => (
  <li className="ma__footer-links__item">
    <a href={footerLink.href} className="ma__footer-links__link">{footerLink.text}</a>
  </li>
);

export default FooterLinks;
