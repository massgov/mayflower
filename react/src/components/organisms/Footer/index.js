import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import logo from 'SharedAssets/images/stateseal.png';
import FooterLinks from '../../molecules/FooterLinks';
import SocialLinks from '../../molecules/SocialLinks';
import Icon from '../../base/Icon';

import './style.css';

const Footer = ({
  footerLinks, socialLinks, backToTopButton, footerText, footerLogo, showNavHeading
}) => (
  <footer className="ma__footer js-footer" id="footer">
    <div className="ma__footer__container">
      <section className="ma__footer__info">
        <div className="ma__footer__logo">
          <a href={footerLogo.domain} title={footerLogo.title}>
            <img src={footerLogo.src} alt="" width="100" height="100" />
          </a>
        </div>
        <div className="ma__footer__social">
          <SocialLinks {...socialLinks} />
        </div>
        <div className="ma__footer__copyright">
          <p className="ma__footer__copyright--date">&copy; {footerText.copyright}</p>
          <p>{footerText.description}</p>
          <a href={footerText.privacyPolicy.url}>{footerText.privacyPolicy.text}</a>
        </div>
      </section>
      <div className="ma__footer__nav">
        <FooterLinks {...footerLinks} showNavHeading={showNavHeading} />
      </div>
    </div>
    { backToTopButton &&
    <button className="ma__footer__back2top js-back2top is-hidden">
      <Icon name="arrow" />
      <span aria-hidden="true">Top</span>
      <span className="visually-hidden">Go to the top of the page</span>
    </button> }
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

Footer.defaultProps = {
  showNavHeading: false,
  backToTopButton: false,
  footerLogo: {
    domain: '/',
    src: logo,
    title: 'Mass.gov homepage'
  },
  footerText: {
    copyright: `${moment().year()} Commonwealth of Massachusetts.`,
    description: 'Mass.gov® is a registered service mark of the Commonwealth of Massachusetts.',
    privacyPolicy: {
      text: 'Mass.gov Privacy Policy',
      url: 'https://www.mass.gov/privacypolicy'
    }
  }
};

export default Footer;
