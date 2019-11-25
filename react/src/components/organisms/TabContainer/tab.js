import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import TabContext from './context';
import TabBody from './tab-body';

class Tab extends React.Component {
  render() {
    const { tabIdent, active } = this.props;
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
      id: tabIdent,
      'aria-selected': active,
      'aria-controls': this.context.tabContainerBodyId,
      role: 'tab',
      ref: this.props.tabRef,
      tabIndex: active ? 0 : -1
    };
    return(
      <React.Fragment>
        <li role="presentation" className={tabClasses}>
          <button {...buttonProps}>{this.props.title}</button>
        </li>
        {global.window && (
          <TabBody active={activeTab === tabIdent} tabContainerBodyId={this.context.tabContainerBodyId}>
            {this.props.children}
          </TabBody>
        )}
      </React.Fragment>
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
  tabRef: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(Element)])
};

export default Tab;
