/**
 * Footer module.
 * @module @massds/mayflower-react/Footer
 * @requires module:@massds/mayflower-assets/scss/03-organisms/footer
 * @requires module:@massds/mayflower-assets/scss/02-molecules/footer-links
 * @requires module:@massds/mayflower-assets/scss/01-atoms/sidebar-heading
 * @requires module:@massds/mayflower-assets/scss/02-molecules/social-links
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import { getYear } from 'date-fns';
import FooterLinks from 'MayflowerReactMolecules/FooterLinks';
import SocialLinks from 'MayflowerReactMolecules/SocialLinks';
// eslint-disable-next-line import/no-unresolved
import IconArrow from 'MayflowerReactBase/Icon/IconArrow';

const Footer = ({
  footerLinks,
  socialLinks,
  backToTopButton = false,
  footerText: {
    copyright = `${getYear(new Date())} Commonwealth of Massachusetts.`,
    description = 'Mass.gov® is a registered service mark of the Commonwealth of Massachusetts.',
    privacyPolicy: {
      text: privacyText = 'Mass.gov Privacy Policy',
      url: privacyUrl = 'https://www.mass.gov/privacypolicy'
    }
  },
  footerLogo: {
    src = '',
    domain = '/',
    title = 'Mass.gov homepage'
  },
  showNavHeading = false
}) => (
  <footer className="ma__footer js-footer" id="footer">
    <div className="ma__footer__container">
      <section className="ma__footer__info">
        <div className="ma__footer__logo">
          <a href={domain} title={title}>
            <img src={src} alt="" width="100" height="100" />
          </a>
        </div>
        <div className="ma__footer__social">
          <SocialLinks {...socialLinks} />
        </div>
        <div className="ma__footer__copyright">
          <p className="ma__footer__copyright--date">
            &copy;
            {copyright}
          </p>
          <p>{description}</p>
          <a href={privacyUrl}>{privacyText}</a>
        </div>
      </section>
      <div className="ma__footer__nav">
        <FooterLinks {...footerLinks} showNavHeading={showNavHeading} />
      </div>
    </div>
    { backToTopButton
    && (
    <button type="button" className="ma__footer__back2top js-back2top is-hidden">
      <IconArrow />
      <span aria-hidden="true">Top</span>
      <span className="visually-hidden">Go to the top of the page</span>
    </button>
    ) }
  </footer>
);

Footer.propTypes = {
  /** @molecules/FooterLinks */
  footerLinks: PropTypes.shape(FooterLinks.propTypes).isRequired,
  /** Whether to display or visually hiding footer nav headings */
  showNavHeading: PropTypes.bool,
  /** @molecules/SocialLinks */
  socialLinks: PropTypes.shape(SocialLinks.propTypes).isRequired,
  /** A floating button on the lower right corner which onClick takes user to the top of the page. */
  backToTopButton: PropTypes.bool,
  /** Adds footer logo */
  footerLogo: PropTypes.shape({
    /** logo image source url */
    src: PropTypes.string,
    /** The URL for the site root */
    domain: PropTypes.string,
    /** The title of the logo link */
    title: PropTypes.string
  }),
  /** Adds footer info section */
  footerText: PropTypes.shape({
    /** Bolded copyright info starting with © */
    copyright: PropTypes.string,
    /** Descriptive info below copyright */
    description: PropTypes.string,
    /** A link to the privacy policy page of the site */
    privacyPolicy: PropTypes.shape({
      text: PropTypes.string,
      url: PropTypes.string
    })
  })
};

export default Footer;
