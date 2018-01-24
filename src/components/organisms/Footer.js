import React from 'react'
import FooterLinks from '../molecules/FooterLinks'
import SocialLinks from '../molecules/SocialLinks'
import stateSeal from '../../../node_modules/@massds/mayflower/images/stateseal.png'

/**
 * Scaffolds out Mayflower footer pattern: @organisms/by-template/footer
 * @see https://mayflower.digital.mass.gov/?p=organisms-footer&view=c
 * @includes @molecules/footer-links, @molecules/social-links
 */
const Footer = () => {
  return(
  <footer class="ma__footer js-footer" id="footer">
    <div class="ma__footer__container">
      <div class="ma__footer__nav">
        <FooterLinks />
      </div>
      <section class="ma__footer__info">
        <div class="ma__footer__logo">
          <img src={stateSeal} alt="Massachusetts State Seal" width={120} height={120} />
        </div>
        <div class="ma__footer__social">
          <SocialLinks />
        </div>
        <div class="ma__footer__copyright">
          <p><b>&copy; 2016 Commonwealth of Massachusetts.</b></p>
          <p>Mass.Gov&#x00AE; is a registered service mark of the Commonwealth of Massachusetts.</p>
        </div>
      </section>
    </div>
  </footer>
  )
};

export default Footer
