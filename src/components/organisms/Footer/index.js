import React from 'react';
import PropTypes from 'prop-types';
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
          <p><b>&copy; 2016 Commonwealth of Massachusetts.</b></p>
          <p>Mass.Gov&#x00AE; is a registered service mark of the Commonwealth of Massachusetts.</p>
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
  footerLinks: PropTypes.shape(FooterLinks.propTypes).isRequired,
  socialLinks: PropTypes.shape(SocialLinks.propTypes).isRequired,
  backToTopButton: PropTypes.bool
};

Footer.defaultProps = {
  backToTopButton: false
};

export default Footer;
