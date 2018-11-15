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




    this.keyPressCallBack = this.keyPressCallBack.bind(this);
  }

  componentDidMount(){
    const parentTabs = document.querySelectorAll('ul.ma__tab-container-head--parent li button');
    createFocusGroup({
      members: parentTabs,
      keybindings: {
        next: [{keyCode: 39}],// right arrow
        prev: [{keyCode: 37}]// left arrow
      },
      wrap: false
    }).activate();

    // const nestedTabs = document.querySelectorAll('ul.ma__tab-container-head--nested li button');
    // createFocusGroup({
    //   members: nestedTabs,
    //   keybindings: {
    //     next: [{keyCode: 39}],// right arrow
    //     prev: [{keyCode: 37}]// left arrow
    //   },
    //   wrap: false
    // }).activate();
    // this.focusGroup = createFocusGroup(parentTabFocusGroupOptions).activate();

// TEST OUTPUT
    console.log('focus group:');
    console.log(createFocusGroup.members);
  }

  handleTabContainerKeyDown(e) {
    if (e.keyCode == 38) { // UP
      e.preventDefault();
      e.stopPropagation();
      document.getElementById(`${this.state.activeTab}`).focus();
    }
  }

  keyPressCallBack(keycode, focus, index) {

console.log('received index: ' + index);
console.log('received focus: ' + focus);

    if(index === 0) {
      console.log('first tab');
    }

    let focIndex = "";
    if(keycode === 39) {
      if (index === 0 && this.state.activeTab === null) {
        focIndex = index;
        console.log('right arrow + first tab: ' + focIndex);
      } else {
        focIndex = index + 1;
      }
      console.log('right arrow: ' + focIndex);
    }
    if (keycode === 37) {
      if (index === 0) {
        focIndex = index;
        console.log('left arrow + first tab: ' + focIndex);
      } else {
        focIndex = index - 1;
        console.log('left arrow: ' + focIndex);
      }
    }
    // document.getElementById(`${this.state.activeTab}`).focus();


     // const focIndex = keycode === 39 ? index + 1 : index - 1;

console.log('current index: ' + this.index);
console.log('-------');
  // console.log(document.querySelectorAll('ul.ma__tab-container-head--parent li > button'))

    const grandChildren = this.props.children[focIndex];
    this.setActiveTab(focus,grandChildren.props.children)
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
    const active = defaultTab;
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
