/**
 * TabContainer module.
 * @module @massds/mayflower-react/TabContainer
 * @requires module:@massds/mayflower-assets/scss/03-organisms/tab-container
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';
import is from 'is';
import TabContext from './context';

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
    // Allows Tab to interact directly with the tab body div through context.
    this.tabBodyRef = React.createRef();
    // When false, runs key down code for nested containers.
    this.preventBodyKeyDown = false;
    const tabIds = new Map();
    // This only works for class components because it is not re-generated on every render.
    this.spanId = shortid.generate();
    this.focusOnTabBody = () => {
      this.tabBodyRef.current.setAttribute('tabindex', '0');
      this.tabBodyRef.current.focus();
    };
    const tabRefs = {};
    let activeTab = null;
    React.Children.forEach(props.children, (child, index) => {
      const id = shortid.generate();
      tabIds.set(index, id);
      tabRefs[tabIds.get(index)] = React.createRef();
      if (index === props.defaultTab) {
        activeTab = id;
      }
    });
    this.state = {
      activeTab,
      // eslint-disable-next-line react/no-unused-state
      setActiveTab: this.setActiveTab,
      // eslint-disable-next-line react/no-unused-state
      focusOnTabBody: this.focusOnTabBody,
      tabIds,
      tabRefs,
      tabContainerId: shortid.generate(),
      tabContainerBodyId: shortid.generate(),
      // eslint-disable-next-line react/no-unused-state
      tabBodyRef: this.tabBodyRef
    };
  }
  setActiveTab = (tabId) => {
    const state = {
      activeTab: tabId
    };
    this.setState(state, () => {
      if (is.fn(this.props.onTabChange)) {
        this.props.onTabChange(this.state.tabRefs[tabId], tabId);
      }
    });
    if (this.state.tabRefs[tabId].current.focus) {
      this.state.tabRefs[tabId].current.focus();
    }
  };
  render() {
    const classes = classNames({
      'ma__tab-container': true,
      'ma__tab-container--nested': this.props.nested
    });
    const ulClasses = classNames({
      'ma__tab-container-head': true,
      'ma__tab-container-head--nested': this.props.nested,
      'ma__tab-container-head--parent': !this.props.nested
    });
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, (child, index) => {
      const newProps = {
        active: this.state.activeTab === this.state.tabIds.get(index),
        tabIdent: this.state.tabIds.get(index),
        tabRef: this.state.tabRefs[this.state.tabIds.get(index)]
      };
      return React.cloneElement(child, newProps, child.props.children);
    });
    return(
      <TabContext.Provider value={this.state}>
        <div className={classes}>
          <ul className={ulClasses} id={this.state.tabContainerId} role="tablist">
            <span id={this.spanId} className="ma__visually-hidden">Use left and right arrows to navigate between tabs, up and down arrows to navigate between active tab and its content.</span>
            {childrenWithProps}
          </ul>
          <div
            aria-labelledby={this.state.activeTab}
            className="ma__tab-container-body"
            tabIndex={0}
            ref={this.tabBodyRef}
            role="tabpanel"
            id={this.state.tabContainerBodyId}
          />
        </div>
      </TabContext.Provider>
    );
  }
}

TabContainer.defaultProps = {
  nested: false,
  defaultTab: 0
};

TabContainer.propTypes = {
  /** When true, the styles of the container changes to drop borders around each tab. */
  nested: PropTypes.bool,
  /** The numerical index of which tab should default to be open, starting at 0. */
  defaultTab: PropTypes.number,
  /** A callback function for a tab change, receives the tab's id and children */
  onTabChange: PropTypes.func,
  /** Children passed to tab container.  */
  children: PropTypes.node
};

export default TabContainer;
