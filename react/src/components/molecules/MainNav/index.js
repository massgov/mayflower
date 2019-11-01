import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import Icon from '../../atoms/icons/Icon';
import './style.css';

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navSelected: -1
    };
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        navSelected: e.currentTarget.id
      });
    }
    if (e.key === 'Escape') {
      this.setState({
        navSelected: -1
      });
    }
  };

  onNavigateCallBack = ({ e, href }) => {
    console.log(href)
    // e.preventDefault();
    // e.stopPropagation();
    const { onNavigateCallBack, closeMobleMenu } = this.props;
    if (is.fn(closeMobleMenu)) {
      closeMobleMenu();
    }
    if (is.fn(onNavigateCallBack)) {
      onNavigateCallBack(href);
    } else {
      window.location.assign(href);
    }
  };

  openSubNav = (e) => {
    //console.log(e.currentTarget)
    // e.persist();
    // e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    const bodyClass = document.querySelector('body').classList;
    bodyClass.toggle('show-submenu');
    console.log(e.currentTarget)
    this.setState({
      navSelected: e.currentTarget.id
    });
  };

  closeSubNav = () => {
    // e.persist();
    // e.stopPropagation();
    // e.stopPropagation();
    const bodyClass = document.querySelector('body').classList;
    bodyClass.toggle('show-submenu');
    this.setState({
      navSelected: -1
    });
  };


  render() {
    return(
      <div className="ma__main-nav">
        <ul className="ma__main-nav__items" role="menubar">
          {this.props.mainNav.map((item, index) => {
            const topItemClasses = classNames({
              'ma__main-nav__item': true,
              'is-active': item.active,
              'has-subnav': item.subNav
            });
            const buttonId = `button${index}`;
            const liId = `li${index}`;
            const { navSelected } = this.state;
            const isExpanded = navSelected === buttonId;
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
                key: buttonId,
                onKeyDown: this.onKeyDown,
                onMouseOver: this.openSubNav,
                // onFocus: this.openSubNav,
                // onMouseLeave: this.closeSubNav
              };
              itemBody.push(<button {...buttonProps}>{item.text}</button>);
              const navItemClasses = classNames({
                'ma__main-nav__subitems': true,
                'is-open-react': isExpanded,
                'is-closed-react': !isExpanded
              });
              console.log(navSelected,buttonId)
              itemBody.push((
                /* eslint-disable-next-line react/no-array-index-key */
                <div className={navItemClasses} key={`navItem${index}`} aria-hidden={!isExpanded}>
                  <ul role="menu" aria-label={`Submenu of ${buttonId}`} className="ma__main-nav__container">
                    <li role="menuitem" className="ma__main-nav__subitem">
                      <a
                        href={item.href}
                        className="ma__main-nav__link"
                        tabIndex={!isExpanded ? -1 : null}
                      >
                        {item.text}
                      </a>
                    </li>
                    {item.subNav.map((subItem, subItemIndex) => (
                      /* eslint-disable-next-line react/no-array-index-key */
                      <li className="ma__main-nav__subitem" key={`liProps.${index}.${subItemIndex}`}>
                        <button
                          onClick={(e) => this.onNavigateCallBack({ e, href: subItem.href })}
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
                            onClick={(e) => this.onNavigateCallBack({ e, href: item.href })}
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
              <li
                className={topItemClasses}
                /* eslint-disable-next-line react/no-array-index-key */
                key={`liClasses${index}`}
                id={liId}
                role="menuitem"
                // onClick={this.openSubNav}
              >
                {itemBody}
              </li>);
            })
          }
        </ul>
      </div>
    );
  }
}

MainNav.propTypes = {
  /** closeMobleMenu passed from Header */
  closeMobleMenu: PropTypes.func,
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
