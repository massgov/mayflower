import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../Input';
import { InputContext } from '../Input/context';
import './style.css';

const Number = (props) => (
  <React.Fragment>
    <InputContext.Consumer>
      {
        (context) => {
          const inputClasses = classNames({
            'ma__input-currency__control': true,
            'js-is-required': props.required
          });
          let errorMsg = '';
          const handleChange = (e) => {
            const { value } = e.target;
            const update = {
              value
            };
            context.updateState(update);
            if (typeof props.onChange === 'function') {
              props.onChange(e);
            }
          };
          const handleAdjust = (direction) => {
            let newValue;
            if (direction === 'up') {
              newValue = +context.value + props.step;
            } else if (direction === 'down') {
              newValue = +context.value - props.step;
            }
            context.updateState({ value: newValue });
          }
          const inputAttr = {
            className: inputClasses,
            name: props.name,
            id: props.id,
            type: 'number',
            placeholder: props.placeholder,
            maxLength: Number(props.maxlength),
            style: props.width ? { width: `${props.width}px` } : null,
            onChange: handleChange,
            required: props.required,
            value: context.value
          };
          return(
            <div className="ma__input-currency">
              <input {...inputAttr} />
              <button
                type="button"
                aria-label="increase value"
                className="ma__input-currency__control-plus"
                onClick={() => handleAdjust('up')}
              />
              <button
                type="button"
                aria-label="decrease value"
                className="ma__input-currency__control-minus"
                onClick={() => handleAdjust('down')}
              />
            </div>
          );
        }
      }
    </InputContext.Consumer>
  </React.Fragment>
);

const InputNumber = (props) => {
  const {
    max, min, step, name, onChange, placeholder, width, maxlength, ...inputProps
  } = props;
  // Input and Currency share the props.required and props.id values.
  const currencyProps = {
    max,
    min,
    step,
    name,
    placeholder,
    width,
    maxlength,
    required: props.required,
    id: props.id,
    onChange
  };
  return<Input {...inputProps}><Number {...currencyProps} /></Input>;
};

InputNumber.propTypes = {
  /** Whether the label should be hidden or not */
  hiddenLabel: PropTypes.bool,
  /** The label text for the input field */
  labelText: PropTypes.string.isRequired,
  /** Whether the field is required or not */
  required: PropTypes.bool,
  /** The unique ID for the input field */
  id: PropTypes.string.isRequired,
  /** The name for the input field */
  name: PropTypes.string.isRequired,
  /** The max acceptable input length */
  maxlength: PropTypes.number,
  /** The pattern to filter input against, e.g. "[0-9]" for numbers only */
  pattern: PropTypes.string,
  /** The number of characters wide to make the input field */
  width: PropTypes.number,
  /** The placeholder text for the input field */
  placeholder: PropTypes.string,
  /** The message to be displayed in the event of an error. */
  errorMsg: PropTypes.string,
  /** Custom change function */
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
  /** Max value for the field. */
  max: PropTypes.number,
  /** Min value for the field. */
  min: PropTypes.number,
  /** Using the up/down arrow keys will increment/decrement the input value by this number. */
  step: PropTypes.number
};

InputNumber.defaultProps = {
  hiddenLabel: false,
  required: false,
  onChange: null,
  step: 0.01
};

export default InputNumber;
