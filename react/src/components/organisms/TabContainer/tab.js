import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import { TabContext } from './context';

const Tab = React.forwardRef((props, ref) => (
  <TabContext.Consumer>
    {
      (context) => {
        const { tabIdent, active } = props;
        const handleKeyDown = (e) => {
          let nextIdent,
prevIdent = null;
          context.tabIds.forEach((ident, key) => {
            if (context.activeTab === ident) {
              nextIdent = key === (context.tabIds.size - 1) ? context.tabIds.get(0) : context.tabIds.get(key + 1);
              prevIdent = key === 0 ? context.tabIds.get(context.tabIds.size - 1) : context.tabIds.get(key - 1);
            }
          });
          if (e.key === 'ArrowRight') {
            const body = document.getElementById(context.tabContainerBodyId);
            if (context.tabRefs[nextIdent]) {
              setActiveTab(nextIdent, context.tabContents[nextIdent]);
            } else {
              // If no TabContainer children.
              if (!body.getElementsByClassName('ma__tab-container--nested')[0]) {
                // If the TabContainer has a parent TabContainer, and that container has a next selectable sibling.
                if (e.currentTarget.closest('div.ma__tab-container').parentElement.closest('div.ma__tab-container')
                  && e.currentTarget.closest('div.ma__tab-container').parentElement.closest('div.ma__tab-container').getElementsByClassName('ma__tab-title--active')[0].nextElementSibling) {
                  const nextTab = e.currentTarget
                    .closest('div.ma__tab-container')
                    .parentElement
                    .closest('div.ma__tab-container')
                    .getElementsByClassName('ma__tab-title--active')[0]
                    .nextElementSibling
                    .getElementsByTagName('button')[0];
                  nextTab.removeAttribute('tabindex');
                  nextTab.focus();
                }
              }
            }
          }
          if (e.key === 'ArrowLeft') {
            const body = document.getElementById(context.tabContainerBodyId);
            if (context.tabRefs[prevIdent]) {
              setActiveTab(prevIdent, context.tabContents[prevIdent]);
            } else {
              // If no TabContainer children.
              if (!body.getElementsByClassName('ma__tab-container--nested')[0]) {
                // If the TabContainer has a parent TabContainer, and that container has a previous selectable sibling.
                if (e.currentTarget.closest('div.ma__tab-container').parentElement.closest('div.ma__tab-container')
                  && e.currentTarget.closest('div.ma__tab-container').parentElement.closest('div.ma__tab-container').getElementsByClassName('ma__tab-title--active')[0].previousElementSibling) {
                  const prevTab = e.currentTarget
                    .closest('div.ma__tab-container')
                    .parentElement
                    .closest('div.ma__tab-container')
                    .getElementsByClassName('ma__tab-title--active')[0]
                    .previousElementSibling
                    .getElementsByTagName('button')[0];
                  prevTab.removeAttribute('tabindex');
                  prevTab.focus();
                }
              }
            }
          }
        };
        const { setActiveTab, activeTab } = context;
        const tabClasses = classNames({
          'ma__tab-title': true,
          'ma__tab-title--active': props.default || active
        });
        const buttonProps = {
          onClick: (e) => {
            e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            if (activeTab !== tabIdent) {
              setActiveTab(tabIdent, props.children);
            }
            if (is.fn(props.handleClick)) {
              props.handleClick(e, tabIdent, props.children);
            }
          },
          onKeyDown: handleKeyDown,
          id: tabIdent,
          'aria-selected': active,
          'aria-controls': context.tabContainerBodyId,
          role: 'tab',
          ref,
          tabIndex: active ? 0 : -1
        };
        return(
          <li role="presentation" className={tabClasses}>
            <button {...buttonProps}>{props.title}</button>
          </li>
        );
      }
    }
  </TabContext.Consumer>
));

Tab.defaultProps = {
  default: false,
  active: false
};

Tab.propTypes = {
  /** When true, the tab will be open by default when used with TabContainer. */
  default: PropTypes.bool,
  /** The text of the tab. */
  title: PropTypes.string.isRequired,
  /** A callback function ran after the tab has been clicked. */
  handleClick: PropTypes.func,
  /** Sets if the tab is the currently active tab or not. */
  active: PropTypes.bool,
  /** The unique identifier set by TabContainer. */
  tabIdent: PropTypes.string
};

export default Tab;
