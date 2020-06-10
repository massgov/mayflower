import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import TabContext from './context';
import TabBody from './tab-body';

class Tab extends React.Component {
  handleKeyDown = (e) => {
    let nextIdent = null;
    let prevIdent = null;
    this.context.tabIds.forEach((ident, key) => {
      if (this.context.activeTab === ident) {
        nextIdent = key === (this.context.tabIds.size - 1) ? this.context.tabIds.get(0) : this.context.tabIds.get(key + 1);
        prevIdent = key === 0 ? this.context.tabIds.get(this.context.tabIds.size - 1) : this.context.tabIds.get(key - 1);
      }
    });
    if (e.key === 'ArrowRight') {
      const body = document.getElementById(this.context.tabContainerBodyId);
      if (this.context.tabRefs[nextIdent]) {
        this.context.setActiveTab(nextIdent);
      } else if (!body.getElementsByClassName('ma__tab-container--nested')[0] && e.currentTarget.closest('div.ma__tab-container').parentElement.closest('div.ma__tab-container')
            && e.currentTarget.closest('div.ma__tab-container').parentElement.closest('div.ma__tab-container').getElementsByClassName('ma__tab-title--active')[0].nextElementSibling) {
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
    if (e.key === 'ArrowLeft') {
      const body = document.getElementById(this.context.tabContainerBodyId);
      if (this.context.tabRefs[prevIdent]) {
        this.context.setActiveTab(prevIdent);
      } else if (!body.getElementsByClassName('ma__tab-container--nested')[0]) {
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
  };

  render() {
    const { tabIdent, active, tabRef } = this.props;
    const { setActiveTab, activeTab } = this.context;
    const tabClasses = classNames({
      'ma__tab-title': true,
      'ma__tab-title--active': active
    });
    const buttonProps = {
      onClick: (e) => {
        e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        e.persist();
        if (activeTab !== tabIdent) {
          setActiveTab(tabIdent);
        }
        if (is.fn(this.props.handleClick)) {
          this.props.handleClick(e, tabIdent, this.props.children);
        }
      },
      onKeyDown: this.handleKeyDown,
      id: tabIdent,
      'aria-selected': active,
      'aria-controls': this.context.tabContainerBodyId,
      role: 'tab',
      ref: tabRef,
      tabIndex: active ? 0 : -1
    };
    return(
      <>
        <li role="presentation" className={tabClasses}>
          <button type="button" {...buttonProps}>{this.props.title}</button>
        </li>
        {global.window && (
          <TabBody active={activeTab === tabIdent} tabContainerBodyId={this.context.tabContainerBodyId}>
            {this.props.children}
          </TabBody>
        )}
      </>
    );
  }
}
Tab.contextType = TabContext;

Tab.defaultProps = {
  active: false
};

Tab.propTypes = {
  /** The text of the tab. */
  title: PropTypes.string.isRequired,
  /** A callback function ran after the tab has been clicked. */
  handleClick: PropTypes.func,
  /** Sets if the tab is the currently active tab or not. */
  active: PropTypes.bool,
  /** The unique identifier set by TabContainer. */
  tabIdent: PropTypes.string,
  /** Children passed to tab container (tab content) */
  children: PropTypes.node,
  /** The tabs ref */
  tabRef: PropTypes.oneOfType([PropTypes.object, PropTypes.any])
};

export default Tab;
