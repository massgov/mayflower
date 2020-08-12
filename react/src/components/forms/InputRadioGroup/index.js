/**
 * InputRadioGroup module.
 * @module @massds/mayflower-react/InputRadioGroup
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-group
 * @requires module:@massds/mayflower-assets/scss/input-radio-group
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-radio
 * @requires module:@massds/mayflower-assets/scss/01-atoms/error-msg
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import InputGroup from 'MayflowerReactForms/InputGroup';

const InputRadioGroup = (props) => {
  const {
    radioButtons,
    inputProps = {},
    groupProps = {}
  } = props;
  const {
    name,
    defaultChecked,
    onChange = null,
    disabled = false,
    required = false
  } = inputProps;
  const {
    showError = false,
    fieldset = true,
    outline = false,
    labelProps = {}
  } = groupProps;
  const {
    className: labelClassName
  } = labelProps;
  const handleChange = (event) => {
    const selected = event.target.value;
    if (is.function(onChange)) {
      onChange({ selected, name, event });
    }
  };
  const legendClasses = classNames(labelClassName, {
    'ma__input-group__title': true,
    'ma__input-group__title--error': showError,
    'ma__input-group__title--disabled': disabled
  });
  const radioClasses = classNames({
    'ma__input-radio': !outline,
    'ma__input-radio--outline': outline
  });
  const inputGroupProps = {
    ...props,
    groupProps: {
      ...groupProps,
      labelProps: {
        ...labelProps,
        className: legendClasses
      },
      fieldset
    }
  };
  return(
    <InputGroup {...inputGroupProps}>
      {radioButtons.map((radioButton, index) => {
        const buttonId = radioButton.id || radioButton.value;
        const labelClasses = classNames({
          'ma__input-radio__label': !outline,
          'ma__input-radio__label--error': showError && !outline,
          'ma__input-radio--outline__label': outline,
          'ma__input-radio--outline__label--error': showError && outline
        });
        const inputClasses = classNames({
          'ma__input-radio__control': !outline,
          'ma__input-radio--outline__control': outline,
          'ma__input-radio--outline__control--error': showError
        });
        const itemClasses = classNames(
          'ma__input-group__item',
          `item-${radioButtons.length}`, {
            [radioButton.class]: radioButton.class
          }
        );
        return(
        /* eslint-disable-next-line react/no-array-index-key */
          <div className={itemClasses} key={`InputRadioGroupDiv-${buttonId}-${index}`}>
            <div className={radioClasses}>
              <input
                className={inputClasses}
                name={name}
                type="radio"
                defaultChecked={radioButton.value === defaultChecked ? 'checked' : null}
                value={radioButton.value}
                id={buttonId}
                required={required}
                onChange={handleChange}
                disabled={disabled}
              />
              <label htmlFor={buttonId} className={labelClasses}>
                <span>{radioButton.label}</span>
              </label>
            </div>
          </div>
        );
      })}
    </InputGroup>
  );
};

InputRadioGroup.propTypes = {
  /** The legend title of the radio button group. */
  labelText: PropTypes.string.isRequired,
  /** The name of the radio button group */
  name: PropTypes.string.isRequired,
  /** Whether radio input is required or not */
  required: PropTypes.bool,
  /** Whether you want the radio input outlined */
  outline: PropTypes.bool,
  /** The default select radio button option on initial render */
  defaultSelected: PropTypes.string,
  /** Whether the radio group is in error state or not. */
  error: PropTypes.bool,
  /** Error Message content. */
  errorMsg: PropTypes.string,
  /** Display Inputs inline */
  inline: PropTypes.bool,
  /** Whether the radio button group is in a disabled state or not */
  disabled: PropTypes.bool,
  /** On change callback function */
  onChange: PropTypes.func,
  /** An array of radio buttons. */
  radioButtons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    /** Allow adding one class to radio button, e.g. "col-medium-1", "col-large-1" */
    class: PropTypes.string
  })).isRequired
};

export default InputRadioGroup;
