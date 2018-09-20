import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import logo from 'SharedAssets/images/stateseal.png';
import FooterLinks from '../../molecules/FooterLinks';
import SocialLinks from '../../molecules/SocialLinks';
import Icon from '../../atoms/icons/Icon';

const Footer = ({
  footerLinks, socialLinks, backToTopButton, footerText, footerLogo
}) => (
  <footer className="ma__footer js-footer" id="footer">
    <div className="ma__footer__container">
      <div className="ma__footer__nav">
        <FooterLinks {...footerLinks} />
      </div>
      <section className="ma__footer__info">
        <div className="ma__footer__logo">
          <img src={footerLogo.src} alt={footerLogo.altText} width="120" height="120" />
        </div>
        <div className="ma__footer__social">
          <SocialLinks {...socialLinks} />
        </div>
        <div className="ma__footer__copyright">
          <p><b>&copy; {footerText.copyright}</b></p>
          <p>{footerText.description}</p>
          <a href={footerText.privacyPolicy.url}>{footerText.privacyPolicy.text}</a>
        </div>
      </section>
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
  /** @molecules/SocialLinks */
  socialLinks: PropTypes.shape(SocialLinks.propTypes).isRequired,
  /** A floating button on the lower right corner which onClick takes user to the top of the page. */
  backToTopButton: PropTypes.bool,
  /** Adds footer logo */
  footerLogo: PropTypes.shape({
    /** logo image source url */
    src: PropTypes.string,
    /** logo image alt text */
    altText: PropTypes.string
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
  backToTopButton: false,
  footerLogo: {
    src: logo,
    altText: 'Massachusetts State Seal'
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
