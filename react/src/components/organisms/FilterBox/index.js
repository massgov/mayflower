import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import child components
import Button from '../../atoms/buttons/Button';
import { validateFilters } from '../../utilities/componentPropTypeCheck';
import './style.css';

const FilterBox = (props) => {
  const {
    action, submitButton, clearButton, active, fields
  } = props;
  const handleClear = () => {
    if (typeof props.clearButton.onClearCallback === 'function') {
      props.clearButton.onClearCallback();
    }
  };
  const filterBoxClasses = classNames({
    'ma__filter-box': true,
    'ma__filter-box--desktop-hidden': props.filterDesktopHidden
  });
  const filterBoxFormClasses = classNames({
    'ma__filter-box__form js-filter-box': true,
    'ma__filter-box__form--active': active
  });
  return(
    <section className={filterBoxClasses} id={props.id}>
      <div className="ma__filter-box__container">
        <form className={filterBoxFormClasses} action={action}>
          <div className="main-content--two">
            <div className="ma__filter-box__filters">
              { fields.map((field, i) => (
                <div className={field.class} key={`filterbox-field-${i}`}>
                  { field.component }
                </div>
              ))}
            </div>
            {
              (submitButton || clearButton) && (
                <div className="ma__filter-box__controls">
                  {submitButton && (
                    <div className="ma__filter-box__button">
                      <Button {...submitButton} />
                    </div>
                  )}
                  {clearButton && (
                  <React.Fragment>
                    <button type="button" aria-label={clearButton.info} className="ma__filter-box__clear js-filter-box-clear" onClick={() => handleClear()}>
                      {clearButton.text}
                    </button>
                  </React.Fragment>
                )}
                </div>
              )
            }
          </div>
        </form>
      </div>
    </section>
  );
};

FilterBox.propTypes = {
  /** The id of the FilterBox component. */
  id: PropTypes.string,
  /** Apply active state  */
  active: PropTypes.bool,
  /** The form action  */
  action: PropTypes.string,
  /** @atoms/forms/Button */
  submitButton: PropTypes.shape(Button.PropTypes),
  /** Clear all button at the bottom of the filter */
  clearButton: PropTypes.shape({
    text: PropTypes.string,
    info: PropTypes.string,
    onClearCallback: PropTypes.func
  }),
  /** Controls if we allow filterbox to render only on mobile */
  filterDesktopHidden: PropTypes.bool,
  /** An array of filter fields */
  fields: (props, propName, componentName) => (
    validateFilters(props, propName, componentName, [
      'SelectBox',
      'InputTextTypeAhead',
      'DateRange'
    ])
  )
};

FilterBox.defaultProps = {
  id: 'filter-box',
  active: false,
  clearButton: {
    text: 'Clear all filters',
    info: 'Clear all applied filters'
  },
  submitButton: {
    text: 'Submit',
    type: 'submit',
    size: '',
    theme: '',
    usage: ''
  },
  action: '#'
};

export default FilterBox;
