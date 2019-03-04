import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';
import './style.css';
import { TabContext } from './context';

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
    // Allows Tab to interact directly with the tab body div through context.
    this.tabBodyRef = React.createRef();
    this.defaultContent = null;
    this.useDefault = true;
    const tabIds = new Map();
    // This only works for class components because it is not re-generated on every render.
    this.spanId = shortid.generate();
    this.setActiveTab = (tab, content = null) => {
      const state = {
        activeTab: tab
      };
      if (content) {
        this.defaultContent = null;
        state.activeContent = content;
      }
      this.setState(state);
    };
    this.focusOnTabBody = () => {
      this.tabBodyRef.current.focus();
    };
    this.focusTab = (tabId) => {
      if (this.tabRefs[tabId] && this.tabRefs[tabId].current) {
        this.tabRefs[tabId].current.focus();
      }
    };
    React.Children.forEach(props.children, (child, index) => tabIds.set(index, shortid.generate()));
    this.state = {
      activeTab: null,
      activeContent: null,
      // eslint-disable-next-line react/no-unused-state
      setActiveTab: this.setActiveTab,
      // eslint-disable-next-line react/no-unused-state
      focusOnTabBody: this.focusOnTabBody,
      // eslint-disable-next-line react/no-unused-state
      focusTab: this.focusTab,
      tabIds,
      tabRefs: {},
      tabContainerId: shortid.generate(),
      tabContainerBodyId: shortid.generate()
    };
  }

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
    const { children, defaultTab } = this.props;
    const active = defaultTab;
    this.childrenWithProps = React.Children.map(children, (child, index) => {
      if (!this.state.tabRefs[this.state.tabIds.get(index)]) {
        this.state.tabRefs[this.state.tabIds.get(index)] = React.createRef();
      }
      // Add child's tab index.
      const newProps = {
        default: index === defaultTab,
        tabIdent: this.state.tabIds.get(index),
        active: index === defaultTab,
        ref: this.state.tabRefs[this.state.tabIds.get(index)]
      };
      if (this.useDefault) {
        if (active === index) {
          newProps.default = true;
          newProps.active = true;
        } else {
          newProps.default = false;
          newProps.active = false;
        }
        this.defaultContent = child.props.children;
        this.useDefault = false;
      } else {
        newProps.default = false;
        if (this.state.tabIds.get(index) === this.state.activeTab) {
          newProps.active = true;
        } else {
          newProps.active = false;
        }
      }
      return React.cloneElement(child, newProps);
    });
    return(
      <TabContext.Provider value={this.state}>
        <div id={this.state.tabContainerId} className={classes}>
          <span id={this.spanId} className="ma__visually-hidden">Use left and right arrows to navigate between tabs, up and down arrows to navigate between active tab and its content.</span>
          <ul className={ulClasses} role="tablist">
            {this.childrenWithProps}
          </ul>
          {
            (
              <div
                aria-labelledby={this.state.activeTab}
                className="ma__tab-container-body"
                tabIndex={0}
                ref={this.tabBodyRef}
                role="tabpanel"
                id={this.state.tabContainerBodyId}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp') {
                    const currentTab = (this.defaultContent) ? this.state.tabIds.get(defaultTab) : this.state.activeTab;
                    this.state.tabRefs[currentTab].current.focus();
                  }
                  if (e.key === 'ArrowDown') {
                    if (e.currentTarget.getElementsByClassName('ma__tab-container--nested')[0]) {
                      this.state.tabRefs[this.state.activeTab].current.setAttribute('tabindex', '-1');
                      const nested = e.currentTarget
                        .getElementsByClassName('ma__tab-container--nested')[0]
                        .getElementsByTagName('ul')[0]
                        .getElementsByClassName('ma__tab-title--active')[0]
                        .getElementsByTagName('button')[0];
                      nested.setAttribute('tabindex', '0');
                      e.currentTarget.blur();
                      nested.focus();
                    } else {
                      this.state.focusOnTabBody();
                    }
                  }
                  let nextIdent;
                  let previousIdent;
                  this.state.tabIds.forEach((ident, key) => {
                    if (this.state.activeTab === ident) {
                      nextIdent = this.state.tabIds.get(key + 1);
                      previousIdent = this.state.tabIds.get(key - 1);
                    }
                  });
                }}
              >
                {this.defaultContent || this.state.activeContent}
              </div>
            )
          }
        </div>
      </TabContext.Provider>
    );
  }
}
TabContainer.contextType = TabContext;

TabContainer.defaultProps = {
  nested: false,
  defaultTab: 0
};

TabContainer.propTypes = {
  // When true, the styles of the container changes to drop borders around each tab.
  nested: PropTypes.bool,
  // The numerical index of which tab should default to be open, starting at 0.
  defaultTab: PropTypes.number
};

export default TabContainer;
