import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';
import { TabContext } from '../../organisms/TabContainer/context';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.tabIdent = shortid.generate();
  }

  render() {
    return(
      <TabContext.Consumer>
        {({ activeTab, setActiveTab }) => {
          const active = (activeTab === this.tabIdent);
          const tabClasses = classNames({
            'ma__tab-title': true,
            'ma__tab-title--active': active
          });
          return(
            <div className={tabClasses} onClick={() => setActiveTab(this.tabIdent, this.props.children)}>{this.props.title}</div>
          );
        }}
      </TabContext.Consumer>
    );
  }
}

export default Tab;
