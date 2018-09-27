import React from 'react';
import PropTypes from 'prop-types';

// import child components
import Button from '../../atoms/buttons/Button';
import DateRange from '../../molecules/DateRange';
import SelectBox from '../../atoms/forms/SelectBox';
import InputTextTypeAhead from '../../atoms/forms/InputTextTypeAhead';
import './style.css';

const FilterBox = (props) => {
  const {
    action, pressType, submitButton, clearButton, active, fields
  } = props;
  const handleClear = () => {
    if (typeof props.clearButton.onClearCallback === 'function') {
      props.clearButton.onClearCallback();
    }
  };
  const filterDesktopHidden = props.filterDesktopHidden ? ' ma__filter-box--desktop-hidden' : '';
  const isActive = active ? 'ma__filter-box__form--active' : '';
  return(
    <section className={`ma__filter-box${filterDesktopHidden}`}>
      <div className="ma__filter-box__container">
        <form className={`ma__filter-box__form js-filter-box ${isActive}`} action={action}>
          <div className="main-content--two">
            <div className="ma__filter-box__filters">
              { fields.map((field) => (
                <div className={field.class}>
                  { field.component }
                </div>
              ))}
              {pressType && (
              <div className="ma__filter-box__type">
                {pressType.selectBox && <SelectBox {...pressType.selectBox} />}
                {pressType.typeAhead && <InputTextTypeAhead {...pressType.typeAhead} />}
              </div>
              )}
            </div>
            <div className="ma__filter-box__controls">
              <div className="ma__filter-box__button">
                <Button {...submitButton} />
              </div>
              {clearButton && (
              <React.Fragment>
                <button type="button" aria-label={clearButton.info} className="ma__filter-box__clear js-filter-box-clear" onClick={() => handleClear()}>
                  {clearButton.text}
                </button>
              </React.Fragment>
            )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

FilterBox.propTypes = {
  /** Apply active state  */
  active: PropTypes.bool,
  /** The form action  */
  action: PropTypes.string,
  /** @atoms/forms/SelectBox */
  topic: PropTypes.shape(SelectBox.PropTypes),
  /** @atoms/forms/SelectBox or /** @atoms/forms/InputTextTypeAhead  */
  pressType: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape(SelectBox.propTypes), PropTypes.shape(InputTextTypeAhead.propTypes)])),
  /** @atoms/forms/InputTextTypeAhead */
  organization: PropTypes.shape(InputTextTypeAhead.propTypes),
  /** @molecules/DateRange */
  dateRange: PropTypes.shape(DateRange.PropTypes),
  /** @atoms/forms/Button */
  submitButton: PropTypes.shape(Button.PropTypes).isRequired,
  /** Clear all button at the bottom of the filter */
  clearButton: PropTypes.shape({
    text: PropTypes.string,
    info: PropTypes.string,
    onClearCallback: PropTypes.func
  }),
  /** Controls if we allow filterbox to render only on mobile */
  filterDesktopHidden: PropTypes.bool
};

FilterBox.defaultProps = {
  action: '#'
};

export default FilterBox;
