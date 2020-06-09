/**
 * MainNav module.
 * @module @massds/mayflower-react/MainNav
 * @requires module:@massds/mayflower-assets/scss/02-molecules/main-nav
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import Icon from 'MayflowerReactBase/Icon';

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesktop: this.checkDesktopMode()
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateDesktopMode);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateDesktopMode);
    }
  }

  onKeyDown = (e) => {
    const { updateHeaderState } = this.props;
    if (e.key === 'Enter') {
      updateHeaderState({
        navSelected: -1
      });
    }
    if (e.key === 'Escape') {
      updateHeaderState({
        navSelected: -1
      });
    }
  };

  onNavigate = ({ e, href }) => {
    e.stopPropagation();
    const { onNavigateCallBack, closeMobileMenu, updateHeaderState } = this.props;
    if (is.fn(closeMobileMenu)) {
      closeMobileMenu();
    }
    if (is.fn(onNavigateCallBack)) {
      onNavigateCallBack(href);
    } else if (typeof window !== 'undefined') {
      window.location.assign(href);
    }
    updateHeaderState({
      navSelected: -1
    });
  };

  checkDesktopMode = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 840) {
        return true;
      }
    }
    return false;
  };

  updateDesktopMode = () => {
    this.setState({
      isDesktop: this.checkDesktopMode()
    });
  }

  openSubNav = (e) => {
    const { updateHeaderState } = this.props;
    const bodyClass = document.querySelector('body').classList;
    bodyClass.toggle('show-submenu');
    updateHeaderState({
      navSelected: e.currentTarget.id
    });
  };

  closeSubNav = () => {
    const { updateHeaderState } = this.props;
    const bodyClass = document.querySelector('body').classList;
    bodyClass.toggle('show-submenu');
    updateHeaderState({
      navSelected: -1
    });
  };


  openSubNavHover = (e) => {
    const { isDesktop } = this.state;
    if (isDesktop) {
      this.openSubNav(e);
    }
  };

  closeSubNavHover = () => {
    const { isDesktop } = this.state;
    if (isDesktop) {
      this.closeSubNav();
    }
  };

  render() {
    const { mainNav, navSelected } = this.props;
    return(
      <div className="ma__main-nav">
        <ul className="ma__main-nav__items" role="menubar">
          {mainNav.map((item, index) => {
            const topItemClasses = classNames({
              'ma__main-nav__item': true,
              'is-active': item.active,
              'has-subnav': item.subNav
            });
            const buttonId = `button${index}`;
            const liId = `li${index}`;
            const isExpanded = navSelected === liId;
            const itemBody = [];
            if (item.subNav) {
              const buttonProps = {
                id: buttonId,
                index,
                className: 'ma__main-nav__top-link',
                'aria-expanded': `${isExpanded}`,
                'aria-haspopup': 'true',
                role: 'menuitem',
                'aria-label': (isExpanded) ? `Hide submenu for ${item.text}` : `Show submenu for ${item.text}`,
                key: buttonId
              };
              itemBody.push(<button {...buttonProps}>{item.text}</button>);
              const navItemClasses = classNames({
                'ma__main-nav__subitems': true,
                'is-open-react': isExpanded,
                'is-closed-react': !isExpanded
              });
              itemBody.push((
                /* eslint-disable-next-line react/no-array-index-key */
                <div className={navItemClasses} key={`navItem${index}`} aria-hidden={!isExpanded}>
                  <ul role="menu" aria-label={`Submenu of ${buttonId}`} className="ma__main-nav__container">
                    <li role="menuitem" className="ma__main-nav__subitem">
                      <button
                        onClick={(e) => this.onNavigate({ e, href: item.href })}
                        className="ma__main-nav__link"
                        tabIndex={!isExpanded ? -1 : null}
                      >
                        {item.text}
                      </button>
                    </li>
                    {item.subNav.map((subItem, subItemIndex) => (
                      /* eslint-disable-next-line react/no-array-index-key */
                      <li className="ma__main-nav__subitem" key={`liProps.${index}.${subItemIndex}`}>
                        <button
                          onClick={(e) => this.onNavigate({ e, href: subItem.href })}
                          className="ma__main-nav__link"
                        >
                          {subItem.text}
                        </button>
                      </li>
                    ))}
                    {
                      item.href && (
                        <li role="menuitem" className="ma__main-nav__subitem ma__main-nav__subitem--main">
                          <button
                            onClick={(e) => this.onNavigate({ e, href: item.href })}
                            className="ma__main-nav__link"
                          >
                            <Icon name="arrowbent" aria-hidden />
                            <span>{item.text}</span>
                          </button>
                        </li>
                      )
                    }
                  </ul>
                </div>));
            } else {
              const buttonProps = {
                id: buttonId,
                className: 'ma__main-nav__top-link',
                'aria-haspopup': 'true',
                key: buttonId,
                role: 'menuitem',
                'aria-label': (isExpanded) ? `Hide submenu for ${item.text}` : `Show submenu for ${item.text}`
              };
              itemBody.push(<button {...buttonProps}>{item.text}</button>);
            }
            return(
              /* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */
              <li
                className={topItemClasses}
                /* eslint-disable-next-line react/no-array-index-key */
                key={`liClasses${index}`}
                id={liId}
                role="menuitem"
                onKeyDown={this.onKeyDown}
                onMouseOver={this.openSubNavHover}
                onMouseLeave={this.closeSubNavHover}
                onClick={this.openSubNav}
              >
                {itemBody}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

MainNav.propTypes = {
  /** navSelected state tracked in Header, passed from Header */
  navSelected: PropTypes.oneOfType([
    // Id of the nav li selected
    PropTypes.string,
    // none of nav li is selected
    PropTypes.oneOf([-1])
  ]),
  /** set navSelected state in Header, passed from Header */
  updateHeaderState: PropTypes.func,
  /** closeMobileMenu passed from Header */
  closeMobileMenu: PropTypes.func,
  /** Callback that is triggered on subnav item click */
  onNavigateCallBack: PropTypes.func,
  /** An array of navigation objects to display in the main nav */
  mainNav: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool,
    subNav: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }))
  }))
};

export default MainNav;
