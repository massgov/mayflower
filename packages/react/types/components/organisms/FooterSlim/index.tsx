// @ts-nocheck
/**
 * FooterSlim module.
 * @module @massds/mayflower-react/FooterSlim
 * @requires module:@massds/mayflower-assets/scss/03-organisms/footer-slim
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/email
 * @requires module:@massds/mayflower-assets/scss/01-atoms/phone-number
 * @requires module:@massds/mayflower-assets/scss/01-atoms/address
 */
import React from 'react';
import classNames from 'classnames';

const today = new Date();
const year = today.getFullYear();

export interface FooterSlimProps {
  /** The main title to be displayed in the footer */
  title: string
  /** Bolded copyright info starting with © (Defaults to matching Mass.gov) */
  copyright?: string
  /** A short description */
  description: string
  /** Additional links for key information */
  links?: {
    href?: string
    title?: string
  }[]
  /** Contact details for the responsible authority */
  contact?: {
    icon?: React.ReactElement
    component?: React.ReactNode
  }[]
  /** One or multiple logos rendered at the footer */
  siteLogo: React.ReactNode
  /** Whether logo(s) should be stacked on top of footer title */
  stackedLogo?: boolean
}

const FooterSlim = (props: FooterSlimProps) => {
  const {
    title, description, siteLogo,
    stackedLogo = false,
    links = null,
    contact = null,
    copyright = `${year} Commonwealth of Massachusetts.`
  } = props;

  const logoWrapperClasses = classNames({
    'ma__footer-slim__container__logos': true,
    'ma__footer-slim__container__logos--stacked': stackedLogo
  });

  const innerWrapperClasses = classNames({
    'ma__footer-slim__container__inner': true,
    'ma__footer-slim__container__inner--stacked': stackedLogo
  });

  return (
    (<footer className="ma__footer-slim" id="footer">
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
                  (<a href={link.href} key={`footslimlinks-${linkIndex}`}>{link.title}</a>)
                ))}
              </div>
            )}
            {contact && (
              <address className="ma__footer-slim__contact">
                {
                  contact.map((field, i) => (
                    /* eslint-disable-next-line react/no-array-index-key */
                    (<div className="ma__footer-slim__contact__item" key={`filterbox-field-${i}`}>
                      { field.icon && React.cloneElement(field.icon, { width: 20, height: 20 })}
                      { field.component }
                    </div>)
                  ))
                }
              </address>
            )}
          </div>
        </div>
      </div>
    </footer>)
  );
};

export default FooterSlim;
