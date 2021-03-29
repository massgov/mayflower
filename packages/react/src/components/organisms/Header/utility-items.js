import React from 'react';
import propTypes from 'prop-types';
import GoogleTranslateElement from 'MayflowerReactButtons/GoogleTranslateElement';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';
import IconBuilding from 'MayflowerReactBase/Icon/IconBuilding';
import IconLogin from 'MayflowerReactBase/Icon/IconLogin';
import useWindowWidth from 'MayflowerReactComponents/hooks/use-window-width';
import UtilityNavData from './UtilityNav.data';

const PanelItem = ({
  narrow,
  title = '',
  CustomIcon,
  description = '',
  ariaLabel = '',
  links = []
}) => {
  const windowWidth = useWindowWidth();
  const isMobileWindow = windowWidth !== null && windowWidth < 860;
  const loginToggleRef = React.useRef();
  const loginContentRef = React.useRef();
  const loginCloseRef = React.useRef();
  const loginContainerRef = React.useRef();
  React.useEffect(() => {
    const utilButton = loginToggleRef.current;
    const utilCloseButton = loginCloseRef.current;
    const utilContent = loginContentRef.current;
    const utilContainer = utilContent ? loginContainerRef.current : null;
    const closeUtilWideContent = () => {
      // Content state
      utilContent.style.height = '0';
      utilContent.style.opacity = '0';
      utilContent.classList.add('is-closed');
      utilContent.setAttribute('aria-hidden', 'true');
      // Close button state
      utilCloseButton.setAttribute('aria-expanded', 'false');
      // Utility button state
      utilButton.setAttribute('aria-expanded', 'false');
      utilButton.setAttribute('aria-pressed', 'false');
      const closestHamburgerNav = utilButton.closest('.ma__header__hamburger__nav');
      if (closestHamburgerNav) {
        closestHamburgerNav.classList.toggle('util-nav-content-open');
      }
    };
    const closeNarrowUtilContent = () => {
      const thisNavContainer = utilButton.closest('.ma__utility-nav__item');
      utilButton.setAttribute('aria-expanded', 'false');
      utilContent.setAttribute('aria-hidden', 'true');
      thisNavContainer.style.pointerEvents = 'none';
      setTimeout(() => {
        thisNavContainer.removeAttribute('style');
      }, 700);
      utilContent.style.maxHeight = '0';
      utilContainer.style.opacity = '0';
      setTimeout(() => {
        utilContent.classList.add('is-closed');
      }, 500);
    };
    const utilButtonNarrowClick = (e) => {
      const thisButton = e.target.closest('.js-util-nav-toggle');
      const thisNavContainer = e.target.closest('.ma__utility-nav__item');
      const utilNarrowContent = thisButton.nextElementSibling;

      if (utilNarrowContent.classList.contains('is-closed')) {
        // TO OPEN

        closeSubMenu();

        thisButton.setAttribute('aria-expanded', 'true');
        utilNarrowContent.removeAttribute('aria-hidden');
        thisNavContainer.style.pointerEvents = 'none';
        /** Slide down. */
        thisNavContainer.removeAttribute('style');

        /** Show the content. */
        utilNarrowContent.classList.remove('is-closed');
        utilNarrowContent.style.maxHeight = 'auto';

        /** Get the computed height of the content. */
        const contentHeight = `${utilContent.querySelector('.ma__utility-nav__content-body').clientHeight}px`;

        /** Set the height of the submenu as 0px, */
        /** so we can trigger the slide down animation. */
        utilContent.style.maxHeight = '0';
        utilContent.style.Height = '0';

        // These height settings display the bottom border of the parent li at the correct spot.
        utilContent.style.height = contentHeight;
        utilContainer.style.height = contentHeight;

        utilContent.style.maxHeight = contentHeight;
        utilContainer.style.opacity = '1';
      } else {
        closeNarrowUtilContent();
      }
    };
    const utilButtonWideClick = (e) => {
      const thisWideButton = e.target.closest('.js-util-nav-toggle');
      const thisWideContent = thisWideButton.nextElementSibling;

      if (thisWideContent.classList.contains('is-closed')) {
        const closestHamburgerNav = thisWideButton.closest('.ma__header__hamburger__nav');
        if (closestHamburgerNav) {
          closestHamburgerNav.classList.add('util-nav-content-open');
        }

        thisWideContent.classList.remove('is-closed');
        thisWideContent.removeAttribute('aria-hidden');
        thisWideContent.removeAttribute('style');
        thisWideContent.style.height = 'auto';
        thisWideContent.style.opacity = '1';

        // Button State
        thisWideButton.setAttribute('aria-expanded', 'true');
        thisWideButton.setAttribute('aria-pressed', 'true');
      }

      thisWideButton.setAttribute('aria-expanded', 'true');
      thisWideButton.setAttribute('aria-pressed', 'true');
    };
    function closeSubMenu() {
      const openSubMenu = document.querySelector('.submenu-open');

      if (openSubMenu) {
        const openSubMenuButton = openSubMenu.querySelector('.js-main-nav-hamburger__top-link');
        const openSubMenuContent = openSubMenu.querySelector('.js-main-nav-hamburger-content');
        const openSubMenuContainer = openSubMenu.querySelector('.js-main-nav-hamburger__container');

        openSubMenuButton.setAttribute('aria-expanded', 'false');
        openSubMenuContent.style.height = '0';
        openSubMenuContainer.style.opacity = '0';

        openSubMenuContent.classList.add('is-closed');

        openSubMenu.removeAttribute('style');
        openSubMenu.classList.remove('submenu-open');
      }
    }
    if (utilButton && utilCloseButton && utilContent && utilContainer) {
      // Open
      if (!isMobileWindow) {
        utilContent.removeAttribute('style');
        utilContainer.removeAttribute('style');
        utilButton.addEventListener('click', utilButtonWideClick);
        utilCloseButton.addEventListener('click', closeUtilWideContent);
      } else {
        utilContent.style.maxHeight = '0';
        utilContainer.style.opacity = '0';
        utilButton.addEventListener('click', utilButtonNarrowClick);
      }
    }
    return(() => {
      utilButton.removeEventListener('click', utilButtonWideClick);
      utilCloseButton.removeEventListener('click', closeUtilWideContent);
      utilButton.removeEventListener('click', utilButtonNarrowClick);
    });
  }, [isMobileWindow, narrow, loginToggleRef, loginCloseRef, loginContentRef, loginContainerRef]);
  return(
    <React.Fragment>
      <button
        ref={loginToggleRef}
        type="button"
        className="ma__utility-nav__link js-util-nav-toggle"
        aria-haspopup="true"
        aria-label={ariaLabel}
        aria-expanded="false"
      >
        {CustomIcon && <CustomIcon />}
        {title && title.length > 0 && (<span>{title}</span>)}
        <span className="toggle-indicator" aria-hidden="true" />
      </button>
      <div ref={loginContentRef} aria-hidden="true" className="ma__utility-nav__content js-util-nav-content is-closed">
        <div ref={loginContainerRef} className="ma__utility-nav__container">
          <div className="ma__utility-nav__content-title">
            <button ref={loginCloseRef} type="button" className="ma__utility-nav__close js-close-util-nav">
              <span>Close</span>
              <span className="ma__utility-nav__close-icon" aria-hidden="true">+</span>
            </button>
            {CustomIcon && <CustomIcon />}
            {title && title.length > 0 && (<h2>{title}</h2>)}
          </div>
          <div className="ma__utility-nav__content-body">
            <div className="ma__utility-panel">
              {description && description.length > 0 && (
                <div className="ma__utility-panel__description ma__utility-panel__description--full">
                  <div className="ma__rich-text">
                    <p>{description}</p>
                  </div>
                </div>
              )}
              <ul className="ma__utility-panel__items">
                { links.length > 0 && links.map((link, i) => (
                  <li className="ma__utility-panel__item js-clickable" key={`util_panel_item_${i}`}>
                    <DecorativeLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
PanelItem.propTypes = {
  narrow: propTypes.bool,
  title: propTypes.string,
  CustomIcon: propTypes.elementType,
  description: propTypes.string,
  ariaLabel: propTypes.string,
  links: propTypes.arrayOf(propTypes.object)
};

export const LoginItem = ({
  data = UtilityNavData.loginItem
}) => {
  const { panel: { links, description }, text, ariaLabel } = data;
  return(
    <PanelItem
      links={links}
      title={text}
      CustomIcon={IconLogin}
      description={description}
      ariaLabel={ariaLabel}
    />
  );
};
LoginItem.propTypes = {
  data: propTypes.shape({
    panel: propTypes.shape({
      description: propTypes.string,
      links: propTypes.arrayOf(propTypes.object)
    }),
    text: propTypes.string,
    ariaLabel: propTypes.string
  })
};

export const TranslateItem = () => {
  const windowWidth = useWindowWidth();
  return(
    <React.Fragment>
      { windowWidth && windowWidth > 840 && (
        <div className="ma__utility-nav__translate">
          <GoogleTranslateElement id="google-translate-id" />
        </div>
      )}
    </React.Fragment>
  );
};

export const StateItem = ({
  data = UtilityNavData.stateItem
}) => {
  const { link, ariaLabel, text } = data;
  return(
    <a className="ma__utility-nav__link direct-link" href={link} aria-label={ariaLabel}>
      <IconBuilding />
      <span>{text}</span>
    </a>
  );
};

StateItem.propTypes = {
  data: propTypes.shape({
    link: propTypes.string,
    text: propTypes.string,
    ariaLabel: propTypes.string
  })
};
