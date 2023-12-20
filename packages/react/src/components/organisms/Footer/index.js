/**
 * Footer module.
 * @module @massds/mayflower-react/Footer
 * @requires module:@massds/mayflower-assets/scss/03-organisms/footer-new
 * @requires module:@massds/mayflower-assets/scss/01-atoms/buttons
 */
import React from 'react';
import PropTypes from 'prop-types';
import ButtonFixedFeedback from 'MayflowerReactAtoms/buttons/ButtonFixedFeedback';

const today = new Date();

const Footer = ({
  footerLinks,
  footerText: {
    copyright = today.getFullYear(),
    privacyPolicy = {
      text: 'Mass.gov Privacy Policy',
      url: 'https://www.mass.gov/privacypolicy'
    }
  },
  footerLogo: {
    domain = '/',
    title = 'Mass.gov home page',
    src
  },
  floatingAction
}) => (
  <footer data-nosnippet="true" className="ma__footer-new" id="footer">
    <div className="ma__footer-new__container">
      <div className="ma__footer-new__logo">
        <a href={domain} title={title}>
          <img src={src} alt="Massachusetts State Seal" width="100" height="100" />
        </a>
      </div>
      <div className="ma__footer-new__content">
        <nav className="ma__footer-new__navlinks" aria-label="site navigation">
          {
            footerLinks.links.map((link, i) => (
              <div key={`footerLinksNav_${i}`} index={i}><a href={link.href}>{link.text}</a></div>
            ))
          }
        </nav>
        <div className="ma__footer-new__copyright">
          <div className="ma__footer-new__copyright--bold">&copy; {copyright} Commonwealth of Massachusetts.</div>
          <span>Mass.gov&#x00AE; is a registered service mark of the Commonwealth of Massachusetts. </span>
          <a href={privacyPolicy.url}>{privacyPolicy.text}</a>
        </div>
      </div>
    </div>
    { floatingAction && <ButtonFixedFeedback /> }
  </footer>
);

Footer.propTypes = {
  /** Footer links */
  footerLinks: PropTypes.shape({
    links: PropTypes.array
  }).isRequired,
  /** Whether to display or visually hiding footer nav headings */
  // showNavHeading: PropTypes.bool,
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
  }),
  /** Adds feedback button. */
  floatingAction: PropTypes.bool
};

export default Footer;
