/**
 * Tabs module.
 * @module @massds/mayflower-react/Tabs
 * @requires module:@massds/mayflower-assets/scss/02-molecules/tabs
 */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved

const Tabs = ({ handleClick, tabs, selectedTab }) => {
  const isClickFunction = typeof handleClick === 'function';
  const handleAllClick = (e) => {
    const selTab = e.target;
    if (selTab && selTab.scrollIntoView) {
      selTab.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
    // invokes custom function if passed in the component
    if (isClickFunction) {
      handleClick(selTab.name);
    }
  };
  return(
    <div className="ma__search--tabs">
      <div className="main-content--two">
        <div className="ma__tabs">
          {
            tabs.map((tab) => {
              const {
                value, label, ariaLabel, href
              } = tab;
              const isSelected = selectedTab === value ? 'is-selected' : '';
              if (isClickFunction) {
                return(
                  <button
                    type="button"
                    key={`tab_${value}`}
                    className={`ma__tabs-item ${isSelected}`}
                    name={value}
                    onClick={(e) => handleAllClick(e)}
                    aria-label={ariaLabel || value}
                  >
                    {label}
                  </button>
                );
              }
              return(
                <a
                  key={`tab_${value}`}
                  href={href}
                  className={`ma__tabs-item ${isSelected}`}
                >
                  {label}
                </a>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  /** `handleClick` is a custom callback function that returns the selected tab value.
   If `handleClick` is passed in as a function, the tabs will be rendered as buttons, otherwise will be rendered anchor links.
  */
  handleClick: PropTypes.func,
  /** Default tab value rendered as selected. */
  selectedTab: PropTypes.string,
  /**
   {
   <br />
   `href:` is used as anchor link href for the tab if the handleClick is not passed as a function.
  <br />
  `text:` rendered for the tab
  <br />
  `arialLabel:` for the tab button if `handleClick` is passed as a function
  <br />
   }
  */
  tabs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    ariaLabel: PropTypes.string
  }))
};

export default Tabs;
