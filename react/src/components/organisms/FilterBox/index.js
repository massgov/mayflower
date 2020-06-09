/**
 * FilterBox module.
 * @module @massds/mayflower-react/FilterBox
 * @requires module:@massds/mayflower-assets/scss/01-atoms/forms
 * @requires module:@massds/mayflower-assets/scss/01-atoms/buttons
 */
import React from 'react';
import PropTypes from 'prop-types';
import componentWithName from 'airbnb-prop-types/src/componentWithName';
import classNames from 'classnames';

// import child components
import Button from 'MayflowerReactButtons/Button';

const FilterBox = (props) => {
  const {
    action, submitButton, clearButton, active, fields, filterLabel, filterNote
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
        <form
          className={filterBoxFormClasses}
          action={action}
          aria-describedby={filterNote ? `${props.id}-note` : null}
          aria-label={filterLabel || null}
        >
          {
            filterNote && (
              <div id={`${props.id}-note`} aria-hidden="true" className="ma-visually-hidden">
                {filterNote}
              </div>
            )
          }
          <div className="main-content--two">
            <div className="ma__filter-box__filters">
              { fields.map((field, i) => (
                /* eslint-disable-next-line react/no-array-index-key */
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
                    <>
                      <button type="button" aria-label={clearButton.info} className="ma__filter-box__clear js-filter-box-clear" onClick={() => handleClear()}>
                        {clearButton.text}
                      </button>
                    </>
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
  /** The aria-label for the filter form element  */
  filterLabel: PropTypes.string,
  /** An additional note for the SR users describing the functionality of the filter  */
  filterNote: PropTypes.string,
  /** @forms/Button */
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
  fields: PropTypes.arrayOf(PropTypes.shape({
    class: PropTypes.string,
    component: PropTypes.oneOfType([
      componentWithName('SelectBox'),
      componentWithName('InputTextTypeAhead'),
      componentWithName('InputTextFuzzy'),
      componentWithName('DateRange')
    ])
  }))
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
