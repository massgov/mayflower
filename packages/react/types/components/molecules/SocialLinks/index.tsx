// @ts-nocheck
/**
 * SocialLinks module.
 * @module @massds/mayflower-react/SocialLinks
 * @requires module:@massds/mayflower-assets/scss/02-molecules/social-links
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-unresolved
import IconFacebook from 'MayflowerReactBase/Icon/IconFacebook';
// eslint-disable-next-line import/no-unresolved
import IconTwitter from 'MayflowerReactBase/Icon/IconTwitter';
// eslint-disable-next-line import/no-unresolved
import IconLinkedin from 'MayflowerReactBase/Icon/IconLinkedin';
// eslint-disable-next-line import/no-unresolved
import IconYoutube from 'MayflowerReactBase/Icon/IconYoutube';
// eslint-disable-next-line import/no-unresolved
import IconInstagram from 'MayflowerReactBase/Icon/IconInstagram';

export interface SocialLinksProps {
  /** The optional label for the social links */
  label?: string
  /** Whether the social media icons are inverted and have a background */
  inverted?: boolean
  /** The color theme of the social media icons */
  theme?: "c-primary" | "c-primary-alt"
  /** The social links to display */
  items: SocialLinkProps[]
}

const SocialLinks = (socialLinks: SocialLinksProps) => {
  const linkClasses = classNames({
    'ma__social-links__link': true,
    [`ma__social-links__link--${socialLinks.theme}--inverted`]: socialLinks.theme && socialLinks.inverted,
    [`ma__social-links__link--${socialLinks.theme}`]: socialLinks.theme && !socialLinks.inverted
  });

  return (
    (<section className="ma__social-links">
      {socialLinks.label && <span className="ma__social-links__label">{socialLinks.label}</span>}
      <ul className="ma__social-links__items">
        {
          socialLinks.items.map((socialLink, i) => (
            /* eslint-disable-next-line react/no-array-index-key */
            (<SocialLink {...socialLink} linkClasses={linkClasses} key={`socialLink_${i}`} index={i} />)
          ))
        }
      </ul>
    </section>)
  );
};

export interface SocialLinkProps {
  /** The URL for the link */
  href: string
  /** The type of social link and the icon name */
  linkType: "facebook" | "twitter" | "linkedin" | "youtube" | "instagram"
  /** Alt text for accessibility */
  altText: string
}

const SocialLink = (socialLink: SocialLinkProps) => {
  const icons = {
    facebook: IconFacebook,
    twitter: IconTwitter,
    linkedin: IconLinkedin,
    youtube: IconYoutube,
    instagram: IconInstagram
  };
  const IconComponent = socialLink.linkType ? icons[socialLink.linkType] : null;

  return(
    <li className="ma__social-links__item">
      <a
        href={socialLink.href}
        className={socialLink.linkClasses}
        data-social-share={socialLink.linkType}
        aria-label={socialLink.altText}
      >
        <IconComponent />
      </a>
    </li>
  );
};

SocialLinks.defaultProps = {
  label: '',
  theme: 'c-primary',
  inverted: true
};

export default SocialLinks;
