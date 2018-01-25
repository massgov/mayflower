import React from 'react';
import data from '../../data/socialLinks.json';
import SocialIcon from '../SocialIcon';

/**
 * Scaffolds out Mayflower social links pattern: @molecules/social-links
 * @see https://mayflower.digital.mass.gov/?p=molecules-social-links&view=c
 * @data structure:
 *   socialLinks: {
 *     label: (string / optional)
 *     items: [{
 *       href: (string[url] / required)
 *       icon: (string[path to icon] / required) // replaced with component for react
 *       component (string[name of react component] / required)
 *       altText: (string / required for accessibility)
 *     }
 *   }]
 */
const SocialLinks = () => {
  const { socialLinks } = data;
  let label = null;
  if (socialLinks.label) {
    label = <span className="ma__social-links__label">{socialLinks.label}</span>;
  }
  return(
    <section className="ma__social-links">
      { label }
      <ul className="ma__social-links__items">
        {
          socialLinks.items.map((socialLink, i) => (
            <SocialLink data={socialLink} key={`socialLink_${i}`} index={i} />
            ))
        }
      </ul>
    </section>
  );
};

const SocialLink = ({ data }) => {
  const {
    href, altText, component, linkType
  } = data;
  return(
    <li className="ma__social-links__item">
      <a href={href} className="ma__social-links__link js-social-share" data-social-share={linkType} title={altText}>
        {/* Include a dynamically named component based on data passed in */}
        <SocialIcon data={component} />
      </a>
    </li>
  );
};

export default SocialLinks;
