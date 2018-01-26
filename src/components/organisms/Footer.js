import React from 'react';
import stateSeal from '@massds/mayflower/images/stateseal.png';
import FooterLinks from '../molecules/FooterLinks';
import SocialLinks from '../molecules/SocialLinks';

/**
 * Scaffolds out Mayflower footer pattern: @organisms/by-template/footer
 * @see https://mayflower.digital.mass.gov/?p=organisms-footer&view=c
 * @includes @molecules/footer-links, @molecules/social-links
 */
const Footer = () => (
  <footer className="ma__footer js-footer" id="footer">
    <div className="ma__footer__container">
      <div className="ma__footer__nav">
        <FooterLinks />
      </div>
      <section className="ma__footer__info">
        <div className="ma__footer__logo">
          <img src={stateSeal} alt="Massachusetts State Seal" width={120} height={120} />
        </div>
        <div className="ma__footer__social">
          <SocialLinks />
        </div>
        <div className="ma__footer__copyright">
          <p><b>&copy; 2016 Commonwealth of Massachusetts.</b></p>
          <p>Mass.Gov&#x00AE; is a registered service mark of the Commonwealth of Massachusetts.</p>
        </div>
      </section>
    </div>
  </footer>
);

export default Footer;
