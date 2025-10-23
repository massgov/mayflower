/**
 * SocialLinks module.
 * @module @massds/mayflower-react/SocialLinks
 * @requires module:@massds/mayflower-assets/scss/02-molecules/social-links
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// eslint-disable-next-line import/no-unresolved
import IconFacebook from 'MayflowerReactBase/Icon/IconFacebook';
// eslint-disable-next-line import/no-unresolved
import IconTwitter from 'MayflowerReactBase/Icon/IconTwitter';
// eslint-disable-next-line import/no-unresolved
import IconLinkedInLogo from 'MayflowerReactBase/Icon/IconLinkedInLogo';
// eslint-disable-next-line import/no-unresolved
import IconYoutube from 'MayflowerReactBase/Icon/IconYoutube';
// eslint-disable-next-line import/no-unresolved
import IconInstagram from 'MayflowerReactBase/Icon/IconInstagram';
// eslint-disable-next-line import/no-unresolved
import IconVimeo from 'MayflowerReactBase/Icon/IconVimeo';

const SocialLinks = (socialLinks) => {
  const linkClasses = classNames({
    'ma__social-links__link': true,
    [`ma__social-links__link--${socialLinks.theme}--inverted`]: socialLinks.theme && socialLinks.inverted,
    [`ma__social-links__link--${socialLinks.theme}`]: socialLinks.theme && !socialLinks.inverted
  });

  return(
    <section className="ma__social-links">
      {socialLinks.label && <span className="ma__social-links__label">{socialLinks.label}</span>}
      <ul className="ma__social-links__items">
        {
          socialLinks.items.map((socialLink, i) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <SocialLink {...socialLink} linkClasses={linkClasses} key={`socialLink_${i}`} index={i} />
          ))
        }
      </ul>
    </section>
  );
};

const SocialLink = (socialLink) => {
  const icons = {
    facebook: IconFacebook,
    twitter: IconTwitter,
    linkedin: IconLinkedInLogo,
    youtube: IconYoutube,
    instagram: IconInstagram,
    vimeo: IconVimeo
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

SocialLink.propTypes = {
  /** The URL for the link */
  href: PropTypes.string.isRequired,
  /** The type of social link and the icon name */
  linkType: PropTypes.oneOf(['facebook', 'twitter', 'linkedin', 'youtube', 'instagram', 'vimeo']).isRequired,
  /** Alt text for accessibility */
  altText: PropTypes.string.isRequired
};

SocialLinks.propTypes = {
  /** The optional label for the social links */
  label: PropTypes.string,
  /** Whether the social media icons are inverted and have a background */
  inverted: PropTypes.bool,
  /** The color theme of the social media icons */
  theme: PropTypes.oneOf(['c-primary', 'c-primary-alt']),
  /** The social links to display */
  items: PropTypes.arrayOf(PropTypes.shape(SocialLink.propTypes)).isRequired
};

SocialLinks.defaultProps = {
  label: '',
  theme: 'c-primary',
  inverted: true
};

export default SocialLinks;
