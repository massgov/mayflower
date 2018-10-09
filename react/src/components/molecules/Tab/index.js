import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';
import { TabContext } from '../../organisms/TabContainer/context';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.tabIdent = shortid.generate();
    this.defaultSet = false;
  }

  render() {
    return(
      <TabContext.Consumer>
        {(context) => {
          const { activeTab, setActiveTab } = context;
          const active = (activeTab === this.tabIdent);
          const tabClasses = classNames({
            'ma__tab-title': true,
            'ma__tab-title--active': active
          });
          if (!this.defaultSet && this.props.default === true) {
            setActiveTab(this.tabIdent, this.props.children);
            this.defaultSet = true;
          }
          return(
            <div className={tabClasses} onClick={() => setActiveTab(this.tabIdent, this.props.children)}>{this.props.title}</div>
          );
        }}
      </TabContext.Consumer>
    );
  }
}

export default Tab;
