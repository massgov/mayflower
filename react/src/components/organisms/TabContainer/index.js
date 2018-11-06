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
    const tabFocusGroupOptions = {
      members: document.querySelectorAll('.ma__tab-container .ma__tab-title button'),
      keybindings: {
        next: [{keyCode: 39}],// right arrow
        prev: [{keyCode: 37}]// left arrow
      },
      wrap: true
    };
    this.focusGroup = createFocusGroup(tabFocusGroupOptions).activate();

    // const nestedTabFocusGroupOptions = {
    //   members: document.querySelectorAll('.ma__tab-container-body .ma__tab-title button'),
    //   keybindings: {
    //     next: [{keyCode: 39}],// right arrow
    //     prev: [{keyCode: 37}]// left arrow
    //   },
    //   wrap: true
    // };
    // this.child.focusGroup = createFocusGroup(nestedTabFocusGroupOptions).activate();
  }

  handleButtonKeyDown(e) {
  //   Things need to happen with the event:
  //     1. check the current tab is active and has focus.
  //     2. check which key is down:
  //       a. LEFT ARROW: add focus to next LEFT button if the button exists (= if the current tab is not the last one.)
  //       b. RIGHT ARROW: add focus to next RIGHT button if the button exists (= if the current tab is not the first one.)
  //       c. DOWN ARROW: add focus to the paired tab panel
  //       d. other keys: null

  //     HOW TO FIND TABS NEXT TO THE CURRENT ONE:
  //       CURRENT(= ACTIVE) TAB: this.childrenWithProps[ACTIVE_TAB].key
  //       PREVIOUS TAB: key value - 0.1
  //       NEXT TAB:     key value + 0.1



    // if (active && this.button.focused) {
    //   if (e.keyCode == 37) { // LEFT
    //     e.preventDefault();
    //     e.stopPropagation();

    //     if (button is not FIRST) {
    //       PREVIOUS_TAB.setActiveTab(this.tabIdent, this.props.children);
    //       PREVIOUS_TAB(children[active - 1]).focus();
    //     }
    //   } else if (e.keyCode == 39) { // RIGHT
    //     e.preventDefault();
    //     e.stopPropagation();

    //     if (button is not LAST) {
    //       NEXT_TAB.setActiveTab(this.tabIdent, this.props.children);
    //       NEXT_TAB(children[active + 1]).focus();
    //     }
    //   } else if (e.key == 40) { // DOWN
    //     e.preventDefault();
    //     e.stopPropagation();

    //     // SET FOCUS ON TAB PANEL
    //     // CURRENT TAB STAYS ACTIVE
    //     this.getElementByClassName('ma__tab-container-body').focus();
    //     this.getElementByClassName('ma__tab-container-body').setAttribute(tabindex, 0);
    //   }
    // }
  }

  handleTabContainerKeyDown(e) {
  //   Things need to happen with the event:
  //     1. check which key is down:
  //       a. UP ARROW: move the focus to the active tab
  //       b. other keys: null

  //   if (e.keyCode == 38) { // UP
  //     e.preventDefault();
  //     e.stopPropagation();

  //     // Move focus to active tab.
  //     this.state.activeTab.focus();
  //   }
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
        return React.cloneElement(child, { default: true, a11yID: this.props.a11yID });
      }
      return child;
    });



// console.log(this.childrenWithProps);
// console.log(this.childrenWithProps);
console.log('active tab: ' + this.activeTab);
console.log('current focus: ' + document.activeElement.id);

// console.log('Length: ' + this.childrenWithProps.length);
// console.log(this.state.activeTab);




    return(
      <TabContext.Provider value={this.state} onKeyDown={this.handleButtonKeyDown}>
        <div className={classes}>
          <span id={this.props.a11yID} className="ma__visually-hidden">Use left and right arrows to navigate between tabs, up and down arrows to navigate between active tab and its content.</span>
          <ul className="ma__tab-container-head" role="tablist"
              >{this.childrenWithProps}
          </ul>



// ADD onKeyDown to move the focus back to its paired tab. --> onKeyDown

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
