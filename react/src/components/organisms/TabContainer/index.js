import React from 'react';
import PropTypes from 'prop-types';
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
        return React.cloneElement(child, { default: true });
      }
      return child;
    });
    return(
      <TabContext.Provider value={this.state}>
        <div className={classes}>
          <div className="ma__tab-container-head">{this.childrenWithProps}
          </div>
          {this.state.activeTab && <div className="ma__tab-container-body">{this.state.activeContent}</div>}
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
  defaultTab: PropTypes.number
};

export default TabContainer;
