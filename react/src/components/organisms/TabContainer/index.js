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
console.log('=================');
console.log('1. setActiveTab is called.');
      const state = {
        activeTab: tab
      };
console.log('2. set state for activeTab. - done');
      if (content) {
console.log('3. check for active tab\'s body content.');
        state.activeContent = content;
      }
console.log('4. override the state.');
      this.setState(state);
console.log('5. end of setActiveTab');
console.log('current activeTab: ' + this.state.activeTab);
console.log('===================');

    };
    this.state = {
      activeTab: null,
      activeContent: null,
      // eslint-disable-next-line react/no-unused-state
      setActiveTab: this.setActiveTab
    };

    this.keyPressCallBack = this.keyPressCallBack.bind(this);
  }

  componentWillMount(){

console.log('activeTab at Mount: ' + this.state.activeTab);
    // Parent FocusGroup set up
    const parentTabs = document.querySelectorAll('ul.ma__tab-container-head--parent li button');
    const parentTabGroup = createFocusGroup({
      members: parentTabs,
      keybindings: {
        next: [{keyCode: 39}],// right arrow
        prev: [{keyCode: 37}]// left arrow
      },
      wrap: false
    });
    parentTabGroup.activate();

    // Nested FocusGroup set up
    const nestedTabs = document.querySelectorAll('ul.ma__tab-container-head--nested li button');
    const nestedTabGroup = createFocusGroup({
      members: nestedTabs,
      keybindings: {
        next: [{keyCode: 39}],// right arrow
        prev: [{keyCode: 37}]// left arrow
      },
      wrap: false
    });
    nestedTabGroup.activate();

// TEST OUTPUT
    console.log(parentTabGroup._members);
    console.log(nestedTabGroup._members);
  }

  handleTabContainerKeyDown(e) {
    if (e.keyCode == 38) { // UP
      e.preventDefault();
      e.stopPropagation();
      document.getElementById(`${this.state.activeTab}`).focus();
    }
  }

  keyPressCallBack(keycode, focus, index) {
// TEST OUTPUT
console.log('------------------');
console.log('received index: ' + index);
console.log('received focus: ' + focus);
console.log(this.props.children.length);

    let focIndex = "";
    if(keycode === 39) {
      if (index < this.props.children.length - 1 ) {// Check for the last index.
        focIndex = index + 1;
      } else {
        focIndex = index;
      }

    }
    if (keycode === 37) {
      if (index === 0) {
        focIndex = index;
console.log('left arrow + first tab: ' + focIndex);
      } else {
        focIndex = index - 1;
      }
    }

     // const focIndex = keycode === 39 ? index + 1 : index - 1;

console.log('focIndex: ' + focIndex);

    const grandChildren = this.props.children[focIndex];
    this.setActiveTab(focus,grandChildren.props.children)
  }

  render() {

console.log('activeTab at render: ' + this.state.activeTab);

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
    const active = defaultTab;
    // const tabCount = children.length;
    this.childrenWithProps = React.Children.map(children, (child, index) => {
      if (index === active) {
        return React.cloneElement(child, { default: true, a11yID: this.props.a11yID, tabIndex: 0, keyPressCallBack: this.keyPressCallBack, index: index });
      }
      return React.cloneElement(child, { tabIndex: -1, keyPressCallBack: this.keyPressCallBack, index: index });
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
  a11yID: PropTypes.string
};

export default TabContainer;
