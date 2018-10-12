import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../atoms/icons/Icon';
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
      showLeftScroll: false,
      showRightScroll: false,
      // eslint-disable-next-line react/no-unused-state
      setActiveTab: this.setActiveTab
    };
  }

  handleRightScrollClick = (e) => {
    this.moveTabsScroll(this.tabsRef.clientWidth);
  };

  handleLeftScrollClick = (e) => {
    this.moveTabsScroll(-this.tabsRef.clientWidth);
  };

  scroll = value => {
    //animate('scrollLeft', this.tabsRef, value);
    //target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  };

  moveTabsScroll = delta => {
    const multiplier = -1;
    const nextScrollLeft = this.tabsRef.scrollLeft + delta * multiplier;
    // Fix for Edge
    const invert = -1;
    this.scroll(invert * nextScrollLeft);
  };

  render() {
    const classes = classNames({
      'ma__tab-container': true,
      'ma__tab-container--nested': (this.props.nested === true)
    });
    // eslint-disable-next-line react/prop-types
    const { children, defaultTab } = this.props;
    const active = !defaultTab ? 0 : defaultTab;
    this.childrenWithProps = React.Children.map(children, (child, index) => {
      if (index === active) {
        return React.cloneElement(child, { default: true });
      }
      return child;
    });
    return(
      <TabContext.Provider value={this.state}>
        <div className={classes}>
          <div className="ma__tab-container-head">
            <button
              direction={'left'}
              onClick={this.handleLeftScrollClick}
              //visible={this.state.showRightScroll}
              className="ma__tab-scroll ma__tab-scroll--left"
            >
              <Icon name="chevron" svgHeight={20} svgWidth={20}/>
            </button>
            {this.childrenWithProps}
            <button
              direction={'right'}
              onClick={this.handleRightScrollClick}
              //visible={this.state.showRightScroll}
              className="ma__tab-scroll ma__tab-scroll--right"
              ref={ref => { this.tabsRef = ref; }}
            >
              <Icon name="chevron" svgHeight={20} svgWidth={20} />
            </button>
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
