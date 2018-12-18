import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TabContext } from './context';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.defaultSet = false;
  }

  scrollIntoView = (target) => {
    target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }

  handleKeyDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (typeof this.props.keyPressCallBack === 'function' ) {
        this.props.keyPressCallBack(e.keyCode, this.props.tabIdent,this.props.index);
      }
    }
    if (e.keyCode === 40 || e.keyCode === 13) {// DOWN || ENTER
      document.querySelector('.ma__tab-container-body').focus();
    }
    // Move focus from the nested tab group to the tab content container.
    if (e.shiftKey && e.keyCode === 9) {// SHIFT + TAB
      const parentWrapper = document.getElementById(this.props.tabIdent).closest('.ma__tab-container-body');
      parentWrapper && parentWrapper.focus();
    }
  };

  render() {
    return(
      <TabContext.Consumer>
        {(context) => {
          const { activeTab, setActiveTab } = context;
          const active = (activeTab === this.props.tabIdent);
          const tabClasses = classNames({
            'ma__tab-title': true,
            'ma__tab-title--active': active
          });

          if (!this.defaultSet && this.props.default === true) {
            // eslint-disable-next-line react/prop-types
            setActiveTab(this.props.tabIdent, this.props.children);
            this.defaultSet = true;
          }
          return(
            <button
              className={tabClasses}
              onClick={(e) => {
                this.scrollIntoView(e.target);
                setActiveTab(this.tabIdent, this.props.children)
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
  // When true, the tab will be open by default when used with TabContainer.
  default: PropTypes.bool,
  // The text of the tab.
  title: PropTypes.string.isRequired,
  /** id of container description */
  a11yID: PropTypes.string
};

export default Tab;
