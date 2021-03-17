/**
 * FooterSlim module.
 * @module @massds/mayflower-react/FooterSlim
 * @requires module:@massds/mayflower-assets/scss/03-organisms/footer-slim
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// eslint-disable-next-line import/no-unresolved
import IconMarker from 'MayflowerReactBase/Icon/IconMarker';
// eslint-disable-next-line import/no-unresolved
import IconPhone from 'MayflowerReactBase/Icon/IconPhone';
// eslint-disable-next-line import/no-unresolved
import IconLaptop from 'MayflowerReactBase/Icon/IconLaptop';


const today = new Date();
const year = today.getFullYear();

const FooterSlim = ({
  title, description, siteLogo,
  stackedLogo=false,
  links=null,
  contact=null,
  copyright=`${year} Commonwealth of Massachusetts.`
}) => {
  const logoWrapperClasses = classNames({
    'ma__footer-slim__container__logos': true,
    'ma__footer-slim__container__logos--stacked': stackedLogo
  });

  const innerWrapperClasses = classNames({
    'ma__footer-slim__container__inner': true,
    'ma__footer-slim__container__inner--stacked': stackedLogo
  });
  return(
    <footer className="ma__footer-slim" id="footer">
      <div className="ma__footer-slim__container ma__container">
        <div className={logoWrapperClasses}>
          {siteLogo}
        </div>
        <div className={innerWrapperClasses}>
          <div className="ma__footer-slim__info">
            <div className="ma__footer-slim__title">{title}</div>
            <p>{description}</p>
            <p className="ma__footer-slim__copyright">
              &copy;
              {' '}
              {copyright}
            </p>
          </div>
          <div className="ma__footer-slim__details">
            {links && (
              <div className="ma__footer-slim__links">
                {links.map((link, linkIndex) => (
                  /* eslint-disable-next-line react/no-array-index-key */
                  <a href={link.href} key={`footslimlinks-${linkIndex}`}>{link.title}</a>
                ))}
              </div>
            )}
            {contact && (
              <address className="ma__footer-slim__contact">
                {contact.address && (
                  <div className="ma__footer-slim__contact__item">
                    <IconMarker width={20} height={20} />
                    <span>{contact.address}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="ma__footer-slim__contact__item">
                    <IconPhone width={20} height={20} />
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </div>
                )}
                {contact.online && contact.online.href && contact.online.title && (
                  <div className="ma__footer-slim__contact__item">
                    <IconLaptop width={20} height={20} />
                    <a href={contact.online.href}>{contact.online.title}</a>
                  </div>
                )}
              </address>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

FooterSlim.propTypes = {
  /** The main title to be displayed in the footer */
  title: PropTypes.string.isRequired,
  /** A short description */
  description: PropTypes.string.isRequired,
  /** Additional links for key information */
  links: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string
  })),
  /** Contact details for the responsible authority */
  contact: PropTypes.shape({
    address: PropTypes.string,
    phone: PropTypes.string,
    online: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string
    })
  }),
  /** One or multiple logos rendered at the footer */
  siteLogo: PropTypes.node.isRequired,
  /** Whether logo(s) should be stacked on top of footer title */
  stackedLogo: PropTypes.bool
};

export default FooterSlim;
