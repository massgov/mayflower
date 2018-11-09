import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createFocusGroup from 'focus-group';
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

    // FocusGroup set up
    // TO DO: setup for the nested tabs
    const tabFocusGroupOptions = {
      members: document.querySelectorAll('.ma__tab-container .ma__tab-title button'),
      keybindings: {
        next: [{keyCode: 39}],// right arrow
        prev: [{keyCode: 37}]// left arrow
      },
      wrap: true
    };
    this.focusGroup = createFocusGroup(tabFocusGroupOptions).activate();
    this.keyPressCallBack = this.keyPressCallBack.bind(this);
  }

  // handleButtonKeyDown(e) {}

  handleTabContainerKeyDown() {
  //   Things need to happen with the event:
  //     1. check which key is down:
  //       a. UP ARROW: move the focus to the active tab
  //       b. other keys: null

  //   if (e.keyCode == 38) { // UP
  //     e.preventDefault();
  //     e.stopPropagation();
  //     // Move focus to active tab.
  //   }
  }

  keyPressCallBack(keycode, focus, index) {
    const focIndex = keycode === 39 ? index + 1 : index - 1;
    const grandChildren = this.props.children[focIndex];
    this.setActiveTab(focus,grandChildren.props.children)
  }

  render() {
    const classes = classNames({
      'ma__tab-container': true,
      'ma__tab-container--nested': this.props.nested
    });
    // eslint-disable-next-line react/prop-types
    const { children, defaultTab } = this.props;
    const active = defaultTab;
    this.childrenWithProps = React.Children.map(children, (child, index) => {
      if (index === active) {
        return React.cloneElement(child, { default: true, a11yID: this.props.a11yID, keyPressCallBack: this.keyPressCallBack, index: index });
      }
      return React.cloneElement(child, { keyPressCallBack: this.keyPressCallBack, index: index });
    });


    return(
      <TabContext.Provider value={this.state}>
        <div className={classes}>
          <span id={this.props.a11yID} className="ma__visually-hidden">Use left and right arrows to navigate between tabs, up and down arrows to navigate between active tab and its content.</span>
          <ul className="ma__tab-container-head" role="tablist"
              >{this.childrenWithProps}
          </ul>



// ADD onKeyDown to move the focus back to its paired tab. --> onKeyDown={this.handleTabContainerKeyDown}

          {this.state.activeTab && <div className="ma__tab-container-body"
                                    aria-labelledby={this.state.activeTab}
                                    id={`tabpanel-${this.state.activeTab}`}
                                    tabIndex="-1"
                                    role="tabpanel"


                                    onKeyDown={this.handleTabContainerKeyDown}


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
  a11yID: PropTypes.string
};

export default TabContainer;
