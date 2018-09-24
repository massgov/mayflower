import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import './style.css';

const Tabs = (props) => {
  const handleAllClick = (e) => {
    const selTab = e.target;
    selTab.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

    // invokes custom function if passed in the component
    if (typeof props.handleClick === 'function') {
      const selectedTab = selTab.name;
      props.handleClick(selectedTab);
    }
  };
  return(
    <div className="ma__search--tabs">
      <div className="main-content--two">
        <div className="ma__tabs">
          {props.tabs.map((tab) => {
            const isSelected = props.selectedTab === tab.value ? 'is-selected' : '';
            return(
              <button
                key={`tab_${tab.value}`}
                className={`ma__tabs-item ${isSelected}`}
                name={tab.value}
                onClick={handleAllClick}
                aria-label={tab.value}
              >
                {tab.label}
              </button>
            );
          })}
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
    label: PropTypes.string
  }))
};

export default Tabs;
