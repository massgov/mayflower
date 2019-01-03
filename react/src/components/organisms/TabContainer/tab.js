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
            <button
              className={tabClasses}
              onClick={(e) => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                setActiveTab(this.tabIdent, this.props.children);
                if (typeof this.props.handleClick === 'function') {
                  this.props.handleClick(e, this.tabIdent, this.props.children);
                }
              }}
            >
              {this.props.title}
            </button>
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
   /** When true, the tab will be open by default when used with TabContainer. */
  default: PropTypes.bool,
   /** The text of the tab. */
  title: PropTypes.string.isRequired,
  /** A callback function ran after the tab has been clicked. */
  handleClick: PropTypes.func
};

export default Tab;
