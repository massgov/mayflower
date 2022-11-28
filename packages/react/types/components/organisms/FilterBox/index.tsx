// @ts-nocheck
/**
 * FilterBox module.
 * @module @massds/mayflower-react/FilterBox
 * @requires module:@massds/mayflower-assets/scss/01-atoms/forms
 * @requires module:@massds/mayflower-assets/scss/01-atoms/buttons
 */
import React from 'react';
import classNames from 'classnames';

// import child components
import Button, { ButtonProps } from 'MayflowerReactButtons/Button';

export interface FilterBoxProps {
  /** The id of the FilterBox component. */
  id?: string
  /** Apply active state  */
  active?: boolean
  /** The form action  */
  action?: string
  /** The aria-label for the filter form element  */
  filterLabel?: string
  /** An additional note for the SR users describing the functionality of the filter  */
  filterNote?: string
  /** @forms/Button */
  submitButton?: ButtonProps
  /** Clear all button at the bottom of the filter */
  clearButton?: {
    text?: string
    info?: string
    onClearCallback?(...args: unknown[]): unknown
  }
  /** Controls if we allow filterbox to render only on mobile */
  filterDesktopHidden?: boolean
  /** An array of filter fields */
  fields?: {
    class?: string
    component?: React.ReactElement
  }[]
}

const FilterBox = (props: FilterBoxProps) => {
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
  return (
    (<section className={filterBoxClasses} id={props.id}>
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
                (<div className={field.class} key={`filterbox-field-${i}`}>
                  { field.component }
                </div>)
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
    </section>)
  );
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
