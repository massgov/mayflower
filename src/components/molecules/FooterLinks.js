import React from 'react';
import data from '../../data/footerLinks.json';

/**
 * Scaffolds out Mayflower footer links pattern: @molecules/footer-links
 * @see https://mayflower.digital.mass.gov/?p=molecules-footer-links&view=c
 * @data structure:
 *    footerLinks: {
 *      items: [{
 *        heading: (string / required)
 *        id: (string (unique ID) / required)
 *        links: [{
 *          href: (string (url) / required)
 *          text: (string / required)
 *        }]
 *      }]
 *    }
 */
const FooterLinks = () => {
  const { footerLinks } = data;
  return(
    <section className="ma__footer-links">
      {
        footerLinks.items.map((footerLinksNav, i) => (
          <FooterLinksNav data={footerLinksNav} key={`footerLinksNav_${i}`} index={i} />
          ))
      }
    </section>
  );
};

const FooterLinksNav = ({ data }) => {
  const { id, heading, links } = data;
  return(
    <nav aria-labelledby={id}>
      <h2 className="visually-hidden" id={id}>{heading}</h2>
      <ul className="ma__footer-links__items">
        {
          links.map((link, i) => (
            <FooterLink data={link} key={`footerLink_${i}`} />
            ))
        }
      </ul>
    </nav>
  );
};

const FooterLink = ({ data }) => {
  const { href, text } = data;
  return(
    <li className="ma__footer-links__item">
      <a href={href} className="ma__footer-links__link">{text}</a>
    </li>
  );
};

export default FooterLinks;
