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
            <li role="presentation" className={tabClasses}>
              <button
                role="tab"
                id={this.props.tabIdent}
                onClick={(e) => {
                  this.scrollIntoView(e.target);
                  setActiveTab(this.props.tabIdent, this.props.children);
                }}
                aria-selected={active}
                tabIndex={this.props.tabIndex}
                aria-describedby={this.props.a11yID}

                // THIS EVENT IS ONLY AVAILABLE TO THE ONFOCUS TAB.
                onKeyDown = {(e) => {
                  if (e.keyCode === 37 || e.keyCode === 39) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (typeof this.props.keyPressCallBack === 'function' ) {
                      this.props.keyPressCallBack(e.keyCode, document.activeElement.id,this.props.index)
                    }
                  }
                  if (e.keyCode === 40) {// DOWN
                    e.preventDefault();
                    e.stopPropagation();
                    document.querySelector('.ma__tab-container-body').focus();
                  }
                }}
              >
              {this.props.title}

{/* TEST OUTPUT */}
              <br />{this.props.tabIdent}


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
