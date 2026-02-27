/**
 * Footer module.
 * @module @massds/mayflower-react/Footer
 * @requires module:@massds/mayflower-assets/scss/03-organisms/footer
 */
import React from 'react';
import PropTypes from 'prop-types';
import ButtonFixedFeedback from 'MayflowerReactButtons/ButtonFixedFeedback';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';
import logo from "@massds/mayflower-assets/static/images/logo/stateseal.png";
import {IconBuilding} from "../../base/Icon";

const today = new Date();

const Footer = ({
  footerLinks,
  footerText: {
    copyright = today.getFullYear()
  },
  footerLogo: {
    domain = '/',
    title = 'Mass.gov home page',
    siteName = 'Mass.gov',
    src
  },
  stateOrgsHref = '/',
  floatingAction
}) => (
  <footer data-nosnippet="true" className="ma__footer-new" id="footer">
    <div className="ma__footer-new__container">
      <div className="ma__footer-new__content-top">
        <div className="ma__footer-new__logo">
          <SiteLogo
            url={{
              domain
            }}
            image={{
              src,
              width: 56,
              height: 56
            }}
            siteName={siteName}
            title={title}
          />
        </div>
        <div className="ma__footer-new__state-organizations">
          <a href={stateOrgsHref} className="direct-link">
            <IconBuilding height={18} width={20} />
            <span>State Organizations</span>
          </a>
        </div>
      </div>
      <div className="ma__footer-new__content">
        <nav className="ma__footer-new__navlinks" aria-label="site navigation">
          {
            footerLinks.links.map((link, i) => (
              <div key={`footerLinksNav_${i}`} data-index={i}><a href={link.href}>{link.text}</a></div>
            ))
          }
        </nav>
        <div className="ma__footer-new__copyright">
          <div className="ma__footer-new__copyright--bold">
            &copy;
            {` ${copyright} Commonwealth of Massachusetts.`}
          </div>
          <span>Mass.gov&#x00AE; is a registered service mark of the Commonwealth of Massachusetts. </span>
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
   * `url:` The URL for the site root <br />
   * `title:` The title of the logo link <br />
   * `siteName:` The name of the site
  */
  footerLogo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    domain: PropTypes.string,
    title: PropTypes.string,
    siteName: PropTypes.string
  }),
  /** Adds footer info section. (Defaults to matching Mass.gov) <br />
   * `copyright:` Bolded copyright info starting with © <br />
   * `description:` Descriptive info below copyright <br />
  */
  footerText: PropTypes.shape({
    copyright: PropTypes.string,
    description: PropTypes.string
  }),
  stateOrgsHref: PropTypes.string,
  /** Adds feedback button. */
  floatingAction: PropTypes.bool
};

export default Footer;
