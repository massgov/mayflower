import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../atoms/icons/Icon';
import './style.css';
class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navSelected: -1
    };
  }

  mouseOver(e) {
    const bodyClass = document.querySelector('body').classList;
    bodyClass.toggle('show-submenu');

    this.setState({
      navSelected: e.currentTarget.id
    });
  }
  mouseOut() {
    const bodyClass = document.querySelector('body').classList;
    bodyClass.toggle('show-submenu');

    this.setState({
      navSelected: -1
    });
  }
  render() {
    return(
      <section className="ma__main-nav">
        <ul className="ma__main-nav__items js-main-nav">
          {this.props.mainNav.map((item, index) => {
            const buttonId = `button${index}`;
            const menuId = `menu${index}`;
            const liId = `li${index}`;
            const topItemClasses = ['ma__main-nav__item'];
            const { navSelected } = this.state;
            const isExpanded = navSelected === liId;
            const isOpen = isExpanded ? 'is-open' : 'is-closed';
            if (item.active) {
              topItemClasses.push('is-active');
            }
            const itemBody = [];
            if (item.subNav) {
              topItemClasses.push('has-subnav js-main-nav-toggle');
              const buttonProps = {
                id: buttonId,
                index,
                className: 'ma__main-nav__top-link',
                tabIndex: index === 0 ? 0 : -1,
                'aria-expanded': `${isExpanded}`,
                'aria-haspopup': 'true',
                'aria-controls': menuId,
                key: buttonId
              };
              itemBody.push(<button {...buttonProps}>{item.text}</button>);
              const navItemClasses = {
                className: `ma__main-nav__subitems js-main-nav-content ${isOpen}`,
                key: `navItem${index}`
              };
              itemBody.push((
                <div {...navItemClasses}>
                  <ul id={menuId} role="menu" aria-labelledby={buttonId} className="ma__main-nav__container">
                    <li role="menuitem" className="ma__main-nav__subitem">
                      <a href={item.href} className="ma__main-nav__link" tabIndex="-1">{item.text}</a>
                    </li>
                    {item.subNav.map((subItem, subItemIndex) => {
                      const liProps = {
                        role: 'menuitem',
                        className: 'ma__main-nav__subitem',
                        key: `liProps.${index}.${subItemIndex}`
                      };
                      return(
                        <li {...liProps}>
                          <a href={subItem.href} className="ma__main-nav__link" tabIndex="-1">{subItem.text}</a>
                        </li>);
                      })
                    }
                    <li role="menuitem" className="ma__main-nav__subitem">
                      <a href={item.href} className="ma__main-nav__link" tabIndex="-1">
                        <Icon name="arrowbent" />
                        <span>{item.text}</span>
                      </a>
                    </li>
                  </ul>
                </div>));
            } else {
              topItemClasses.push('js-main-nav-top-link');
              const buttonProps = {
                id: buttonId,
                className: 'ma__main-nav__top-link',
                'aria-haspopup': 'true',
                'aria-controls': menuId,
                tabIndex: index === 0 ? 0 : -1,
                key: buttonId
              };
              itemBody.push(<button {...buttonProps}>{item.text}</button>);
            }
            const liClasses = {
              className: topItemClasses.join(' '),
              key: `liClasses${index}`,
              id: liId
            };
            return(
              <li {...liClasses} onMouseEnter={(e) => this.mouseOver(e)} onMouseLeave={(e) => this.mouseOut(e)}>
                {itemBody}
              </li>);
            })
          }
        </ul>
      </section>
    );
  }
}

MainNav.propTypes = {
  /** An array of navigation objects to display in the main nav */
  mainNav: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool,
    subNav: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }))
  }))
};

export default MainNav;
