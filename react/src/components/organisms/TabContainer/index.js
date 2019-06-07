import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';
import is from 'is';
import './style.css';
import TabContext from './context';

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
    // Allows Tab to interact directly with the tab body div through context.
    this.tabBodyRef = React.createRef();
    // When false, runs key down code for nested containers.
    this.preventBodyKeyDown = false;
    this.defaultContent = null;
    this.useDefault = true;
    const tabIds = new Map();
    const tabContents = {};
    // This only works for class components because it is not re-generated on every render.
    this.spanId = shortid.generate();
    this.setActiveTab = (tabId, content = null) => {
      const state = {
        activeTab: tabId
      };
      if (content) {
        this.defaultContent = null;
        state.activeContent = content;
      }
      this.setState(state);
      tabRefs[tabId].current.focus();
      if (is.fn(this.props.onTabChange)) {
        this.props.onTabChange(tabRefs[tabId], tabId, content);
      }
    };
    this.focusOnTabBody = () => {
      this.tabBodyRef.current.setAttribute('tabindex', '0');
      this.tabBodyRef.current.focus();
    };
    const tabRefs = {};
    let activeContent = null;
    React.Children.forEach(props.children, (child, index) => {
      const id = shortid.generate();
      tabIds.set(index, id);
      tabContents[id] = child.props.children;
      tabRefs[tabIds.get(index)] = React.createRef();
      if (index === props.defaultTab) {
        activeContent = child.props.children;
      }
    });
    this.state = {
      activeTab: tabIds.get(props.defaultTab),
      activeContent,
      // eslint-disable-next-line react/no-unused-state
      setActiveTab: this.setActiveTab,
      // eslint-disable-next-line react/no-unused-state
      focusOnTabBody: this.focusOnTabBody,
      tabIds,
      tabContents,
      tabRefs,
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
      const newProps = {
        default: index === defaultTab,
        tabIdent: this.state.tabIds.get(index),
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
        this.useDefault = false;
      } else {
        newProps.default = false;
        if (this.state.tabIds.get(index) === this.state.activeTab) {
          newProps.active = true;
        } else {
          newProps.active = false;
        }
      }
      return(child.props.children) ? React.cloneElement(child, newProps, child.props.children) : React.cloneElement(child, newProps);
    });
    return(
      <TabContext.Provider value={this.state}>
        <div
          id={this.state.tabContainerId}
          className={classes}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              // If the active focus is on the body, move focus to the current tab.
              if (document.activeElement === this.tabBodyRef.current) {
                const currentTab = this.state.activeTab;
                this.preventBodyKeyDown = false;
                this.state.tabRefs[currentTab].current.removeAttribute('tabindex');
                this.state.tabRefs[currentTab].current.focus();
              } else if (this.props.nested) {
                // If the tab container is nested and active focus is not on the body,
                // set focus to the parent tab container.
                  const tab = e.currentTarget
                    .parentElement
                    .closest('div.ma__tab-container')
                    .getElementsByClassName('ma__tab-title--active')[0]
                    .getElementsByTagName('button')[0];
                  tab.removeAttribute('tabindex');
                  tab.focus();
                  this.preventBodyKeyDown = true;
                } else {
                  this.preventBodyKeyDown = false;
                }
            }
            if (e.key === 'ArrowDown') {
              // If the tab container is not nested and has no nested tab container children...
              if (!this.props.nested && this.tabBodyRef.current.getElementsByClassName('ma__tab-container--nested').length === 0) {
                // Set focus on the tab container's body.
                this.focusOnTabBody();
              }
              // If the tab container is not nested and has nested tab container children...
              if (!this.preventBodyKeyDown && !this.props.nested && this.tabBodyRef.current.getElementsByClassName('ma__tab-container--nested').length > 0) {
                // Set focus on the first tab of the nested tab container child.
                const nested = this.tabBodyRef.current
                  .getElementsByClassName('ma__tab-container--nested')[0]
                  .getElementsByTagName('ul')[0]
                  .getElementsByClassName('ma__tab-title--active')[0]
                  .getElementsByTagName('button')[0];
                nested.removeAttribute('tabindex');
                this.tabBodyRef.current.removeAttribute('tabindex');
                nested.focus();
                // The next key down arrow should not run on the parent tab container, but on the child it will.
                this.preventBodyKeyDown = true;
              }
              // If the tab container is nested...
              if (this.props.nested) {
                // And has nested tab containers...
                if (this.tabBodyRef.current.getElementsByClassName('ma__tab-container--nested').length > 0) {
                  // Set focus on the first tab of the nested tab container child.
                  const nested = this.tabBodyRef.current
                    .getElementsByClassName('ma__tab-container--nested')[0]
                    .getElementsByTagName('ul')[0]
                    .getElementsByClassName('ma__tab-title--active')[0]
                    .getElementsByTagName('button')[0];
                  nested.removeAttribute('tabindex');
                  this.tabBodyRef.current.removeAttribute('tabindex');
                  nested.focus();
                  // The next key down arrow should not run on the parent tab container, but on the child it will.
                  this.preventBodyKeyDown = true;
                } else {
                  this.focusOnTabBody();
                }
              }
            }
          }}
        >
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

              >
                {this.state.activeContent}
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
  defaultTab: PropTypes.number,
  // A callback function for a tab change, receives the tab's id and children
  onTabChange: PropTypes.func
};

export default TabContainer;
