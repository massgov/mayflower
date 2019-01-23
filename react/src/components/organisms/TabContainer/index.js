import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';
import './style.css';
import { TabContext } from './context';

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveTab = (tab, content = null) => {
      const state = {
        activeTab: tab
      };
      if (content) {
        state.activeContent = content;
      }
      this.setState(state);
    };

    this.state = {
      activeTab: null,
      activeContent: null,
      // eslint-disable-next-line react/no-unused-state
      setActiveTab: this.setActiveTab
    };

    // Set up IDs for tabs.
    const { children } = props;
    this.arrayId = React.Children.map(children, (child, index) => {return shortid.generate()});

    this.keyPressCallBack = this.keyPressCallBack.bind(this);
  }

  // Move the focus from the tab content to its associated tab.
  handleTabContainerKeyDown(e) {
    if (e.keyCode == 38) { // UP
      e.preventDefault();
      e.stopPropagation();
      document.getElementById(`${this.state.activeTab}`).focus();
    }
  }

  keyPressCallBack(keycode, focus, index) {
    // Update index for the navigated (= next) tab.
    const focIndex = keycode === 39 ? (index < this.props.children.length - 1 ? index + 1 : index) : (index === 0 ? index : index - 1);

    // Set the focus to the navigated (= next) tab.
    const nextTabId = this.arrayId[focIndex];
    document.getElementById(nextTabId).focus();

    const grandChildren = this.props.children[focIndex];

    this.setActiveTab(nextTabId,grandChildren.props.children);
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
    })
    // eslint-disable-next-line react/prop-types
    const { children, defaultTab } = this.props;
    const active = defaultTab;// Default props value
    this.childrenWithProps = React.Children.map(children, (child, index) => {
      if (index === active) {// Child index value
        return React.cloneElement(child, {
          default: true,
          a11yID: this.props.a11yID,
          tabIndex: 0,
          keyPressCallBack: this.keyPressCallBack,
          index: index,
          tabIdent: this.arrayId[index]
        });
      }
      return React.cloneElement(child, {
        tabIndex: -1,
        keyPressCallBack: this.keyPressCallBack,
        index: index,
        tabIdent: this.arrayId[index]
      });
    });

    return(
      <TabContext.Provider value={this.state}>
        <div className={classes}>
          <span id={this.props.a11yID} className="ma__visually-hidden">Use left and right arrows to navigate between tabs, up and down arrows to navigate between active tab and its content.</span>
          <ul className={ulClasses} role="tablist"
              >{this.childrenWithProps}
          </ul>

          {this.state.activeTab && <div className="ma__tab-container-body"
                                    aria-labelledby={this.state.activeTab}
                                    id={`tabpanel-${this.state.activeTab}`}
                                    tabIndex="-1"
                                    role="tabpanel"

                                    onKeyDown={(e) => this.handleTabContainerKeyDown(e)}
                                    >
                                      {this.state.activeContent}
                                  </div>}
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
  // When true, the styles of the container changes to drop borders around each tab.
  nested: PropTypes.bool,
  // The numerical index of which tab should default to be open, starting at 0.
  defaultTab: PropTypes.number,
  /** id of the description span for a11y. should be unique to the page */
  a11yID: PropTypes.string,
  // Unique identifier for tab button to make each tab unique in the page.
  tabIdent: PropTypes.string
};

export default TabContainer;
