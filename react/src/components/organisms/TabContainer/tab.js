import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';
import { TabContext } from './context';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.tabIdent = shortid.generate();
    this.defaultSet = false;
  }

  scrollIntoView = (target) => {
    target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
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
            // eslint-disable-next-line react/prop-types
            setActiveTab(this.tabIdent, this.props.children);
            this.defaultSet = true;
          }
          return(
            <li role="presentation">
              <button
                role="tab"
                className={tabClasses}
                id={this.tabIdent}
                onClick={(e) => {
                  this.scrollIntoView(e.target);
                  setActiveTab(this.tabIdent, this.props.children)
                }}
                aria-selected={active}
                tabIndex={!active ? -1 : 0}
                aria-describedby={this.props.a11yID}
              >
              {this.props.title}
              </button>
            </li>
          );
        }}
      </TabContext.Consumer>
    );
  }
}

Tab.defaultProps = {
  default: false
};

Tab.propTypes = {
  // When true, the tab will be open by default when used with TabContainer.
  default: PropTypes.bool,
  // The text of the tab.
  title: PropTypes.string.isRequired,
  /** id of container description */
  a11yID: PropTypes.string
};

export default Tab;
