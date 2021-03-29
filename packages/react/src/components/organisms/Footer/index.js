/**
 * Footer module.
 * @module @massds/mayflower-react/Footer
 * @requires module:@massds/mayflower-assets/scss/03-organisms/footer
 * @requires module:@massds/mayflower-assets/scss/02-molecules/footer-links
 * @requires module:@massds/mayflower-assets/scss/01-atoms/sidebar-heading
 * @requires module:@massds/mayflower-assets/scss/02-molecules/social-links
 */
import React from 'react';
import PropTypes from 'prop-types';

import FooterLinks from 'MayflowerReactMolecules/FooterLinks';
import SocialLinks from 'MayflowerReactMolecules/SocialLinks';
// eslint-disable-next-line import/no-unresolved
import IconArrow from 'MayflowerReactBase/Icon/IconArrow';

const today = new Date();
const year = today.getFullYear();

const Footer = ({
  footerLinks, socialLinks,
  footerText: {
    copyright = `${year} Commonwealth of Massachusetts.`,
    description = 'Mass.gov® is a registered service mark of the Commonwealth of Massachusetts.',
    privacyPolicy = {
      text: 'Mass.gov Privacy Policy',
      url: 'https://www.mass.gov/privacypolicy'
    }
  },
  footerLogo: {
    domain = '/',
    title = 'Mass.gov homepage',
    src
  },
  showNavHeading = false,
  backToTopButton = false
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
            {' '}
            {copyright}
          </p>
          <p>{description}</p>
          <a href={privacyPolicy.url}>{privacyPolicy.text}</a>
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
  /** `@molecules/FooterLinks` */
  footerLinks: PropTypes.shape(FooterLinks.propTypes).isRequired,
  /** Whether to display or visually hiding footer nav headings */
  showNavHeading: PropTypes.bool,
  /** `@molecules/SocialLinks` */
  socialLinks: PropTypes.shape(SocialLinks.propTypes).isRequired,
  /** A floating button on the lower right corner which onClick takes user to the top of the page. */
  backToTopButton: PropTypes.bool,
  /** Adds footer logo. (Defaults to matching Mass.gov) <br />
   * `src:` logo image source url <br />
   * `domain:` The URL for the site root <br />
   * `title:` The title of the logo link
  */
  footerLogo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    domain: PropTypes.string,
    title: PropTypes.string
  }),
  /** Adds footer info section. (Defaults to matching Mass.gov) <br />
   * `copyright:` Bolded copyright info starting with © <br />
   * `description:` Descriptive info below copyright <br />
   * `privacyPolicy:` A link to the privacy policy page of the site
  */
  footerText: PropTypes.shape({
    copyright: PropTypes.string,
    description: PropTypes.string,
    privacyPolicy: PropTypes.shape({
      text: PropTypes.string,
      url: PropTypes.string
    })
  })
};

export default Footer;
