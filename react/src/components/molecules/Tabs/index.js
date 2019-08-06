import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import './style.css';

const Tabs = (tabs) => {
  const handleAllClick = (e) => {
    const selTab = e.target;
    if(selTab && selTab.scrollIntoView) {
      selTab.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
    // invokes custom function if passed in the component
    if (typeof tabs.handleClick === 'function') {
      const selectedTab = selTab.name;
      tabs.handleClick(selectedTab);
    }
  };
  return(
    <div className="ma__search--tabs">
      <div className="main-content--two">
        <div className="ma__tabs">
          {
            tabs.tabs.map((tab) => {
              const isSelected = tabs.selectedTab === tab.value ? 'is-selected' : '';
              return(
                <button
                  key={`tab_${tab.value}`}
                  className={`ma__tabs-item ${isSelected}`}
                  name={tab.value}
                  onClick={(e) => handleAllClick(e)}
                  aria-label={tab.ariaLabel || tab.value}
                >
                  {tab.label}
                </button>
                );
              })
            }
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  handleClick: PropTypes.func,
  selectedTab: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    ariaLabel: PropTypes.string
  }))
};

export default Tabs;
