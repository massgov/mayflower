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
  /* handleClick is a custom callback function that returns the selected tab value.
   * If handleClick is passed in as a function, the tabs will be rendered as buttons, otherwise will be rendered anchor links.
  */
  handleClick: PropTypes.func,
  /* default tab value rendered as selected */
  selectedTab: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    /* href is used as anchor link href for the tab if the handleClick is not passed as a function */
    value: PropTypes.string.isRequired,
    /* text rendered for the tab */
    label: PropTypes.string.isRequired,
    /* href is used as anchor link href for the tab if the handleClick is not passed as a function */
    href: PropTypes.string,
    /* arial-label for the tab button if the handleClick is passed as a function */
    ariaLabel: PropTypes.string
  }))
};

export default Tabs;
