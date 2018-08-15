import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import stateSeal from '@massds/mayflower/images/stateseal.png';
import FooterLinks from '../../molecules/FooterLinks';
import SocialLinks from '../../molecules/SocialLinks';
import SvgArrow from '../../atoms/icons/SvgArrow';

const Footer = (footer) => (
  <footer className="ma__footer js-footer" id="footer">
    <div className="ma__footer__container">
      <div className="ma__footer__nav">
        <FooterLinks {...footer.footerLinks} />
      </div>
      <section className="ma__footer__info">
        <div className="ma__footer__logo">
          <img src={stateSeal} alt="Massachusetts State Seal" width="120" height="120" />
        </div>
        <div className="ma__footer__social">
          <SocialLinks {...footer.socialLinks} />
        </div>
        <div className="ma__footer__copyright">
          <p><b>&copy; {moment().year()} Commonwealth of Massachusetts.</b></p>
          <p>Mass.gov&#x00AE; is a registered service mark of the Commonwealth of Massachusetts.</p>
          <a href={footer.privacyPolicy}>Mass.gov Privacy Policy</a>
        </div>
      </section>
    </div>
    {footer.backToTopButton &&
    <button className="ma__footer__back2top js-back2top is-hidden">
      <SvgArrow />
      <span aria-hidden="true">Top</span>
      <span className="visually-hidden">Go to the top of the page</span>
    </button>}
  </footer>
);

Footer.propTypes = {
  /** @molecules/FooterLinks */
  footerLinks: PropTypes.shape(FooterLinks.propTypes).isRequired,
  /** @molecules/SocialLinks */
  socialLinks: PropTypes.shape(SocialLinks.propTypes).isRequired,
  /** A floating button on the lower right corner which onClick takes user to the top of the page. */
  backToTopButton: PropTypes.bool,
  /** Adds a link to the privacy policy page of the site */
  privacyPolicy: PropTypes.string
};

Footer.defaultProps = {
  backToTopButton: false,
  privacyPolicy: 'https://www.mass.gov/privacypolicy'
};

export default Footer;
