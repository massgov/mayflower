import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';
import { TabContext } from './context';

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveTab = (tab, content) => {
      this.setState({
        activeTab: tab,
        activeContent: content
      });
    };
    this.state = {
      activeTab: null,
      activeContent: null,
      setActiveTab: this.setActiveTab,
      nested: this.props.nested
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.nested !== state.nested) {
      return{
        nested: props.nested
      };
    }
    return null;
  }

  render() {
    const classes = classNames({
      'ma__tab-container': true,
      'ma__tab-container--nested': (this.state.nested === true)
    });
    return(
      <TabContext.Provider value={this.state}>
        <div className={classes}>
          <div className="ma__tab-container-head">{this.props.children}</div>
          {this.state.activeTab && <div className="ma__tab-container-body">{this.state.activeContent}</div>}
        </div>
      </TabContext.Provider>
    );
  }
}
TabContainer.defaultProps = {
  nested: false
};

export default TabContainer;
