import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TabContext } from './context';

const Tab = React.forwardRef((props, ref) => {
  const context = useContext(TabContext);
  const { tabIdent, active } = props;
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      const body = document.getElementById(context.tabContainerBodyId);
      body.setAttribute('tabindex', '0');
      e.currentTarget.setAttribute('tabindex', '-1');
      context.focusOnTabBody();
    }
    let nextIdent = null;
    let previousIdent = null;
    context.tabIds.forEach((ident, key) => {
      if (context.activeTab === ident) {
        nextIdent = context.tabIds.get(key + 1);
        previousIdent = context.tabIds.get(key - 1);
      }
    });
    if (e.key === 'ArrowRight') {
      // Handle last tab for non-nested tab containers.
      if (!nextIdent
        && !e.currentTarget.getElementsByClassName('ma__tab-container--nested')[0]
        && e.currentTarget.closest('.ma__tab-container-body')) {
        e.currentTarget.removeAttribute('tabindex');
        const nextTab = e.currentTarget
          .closest('.ma__tab-container-body')
          .parentElement
          .getElementsByClassName('ma__tab-title--active')[0]
          .nextElementSibling
          .getElementsByTagName('button')[0];
        nextTab.setAttribute('tabindex', '-1');
        nextTab.focus();
      } else {
        const body = document.getElementById(context.tabContainerBodyId);
        // If tab has nested content...
        if (body.getElementsByClassName('ma__tab-container--nested')[0]) {
          e.currentTarget.removeAttribute('tabindex');
          const nested = body
            .getElementsByClassName('ma__tab-container--nested')[0]
            .getElementsByClassName('ma__tab-title--active')[0]
            .getElementsByTagName('button')[0];
          nested.setAttribute('tabindex', '-1');
          e.currentTarget.blur();
          nested.focus();
        } else if (context.tabRefs[nextIdent]) {
          e.currentTarget.setAttribute('tabindex', '-1');
          context.tabRefs[nextIdent].current.focus();
        }
      }
    }
    if (e.key === 'ArrowLeft') {
      const body = document.getElementById(context.tabContainerBodyId);
      if (!previousIdent
        && !e.currentTarget.getElementsByClassName('ma__tab-container--nested')[0]
        && e.currentTarget.closest('.ma__tab-container-body')) {
        e.currentTarget.removeAttribute('tabindex');
        const prevTab = e.currentTarget
          .closest('.ma__tab-container-body')
          .parentElement
          .getElementsByClassName('ma__tab-title--active')[0]
          .previousElementSibling
          .getElementsByTagName('button')[0];
        prevTab.setAttribute('tabindex', '-1');
        prevTab.focus();
      } else if (body.getElementsByClassName('ma__tab-container--nested')[0]) {
        e.currentTarget.removeAttribute('tabindex');
        const nested = body
          .getElementsByClassName('ma__tab-container--nested')[0]
          .getElementsByClassName('ma__tab-title--active')[0]
          .getElementsByTagName('button')[0];
        nested.setAttribute('tabindex', '-1');
        e.currentTarget.blur();
        nested.focus();
      } else if (context.tabRefs[previousIdent]) {
        e.currentTarget.setAttribute('tabindex', '-1');
        context.tabRefs[previousIdent].current.focus();
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
        if (typeof props.handleClick === 'function') {
          props.handleClick(e, tabIdent, props.children);
        }
      }
    },
    onKeyDown: handleKeyDown,
    id: tabIdent,
    'aria-selected': active,
    'aria-controls': context.tabContainerBodyId,
    role: 'tab',
    ref,
    onFocus: () => {
      if (activeTab !== tabIdent) {
        setActiveTab(tabIdent, props.children);
      }
    }
  };
  if (!active) {
    buttonProps.tabIndex = -1;
  }
  return(
    <li role="presentation" className={tabClasses}>
      <button {...buttonProps}>{props.title}</button>
    </li>
  );
});

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
