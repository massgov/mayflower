import React from 'react';
import PropTypes from 'prop-types';
import Input from 'MayflowerReactForms/Input';
import CompoundSlider from 'MayflowerReactForms/CompoundSlider';

const InputSlider = (props) => {
  const {
    axis, max, min, step, ticks, onChange, onUpdate, domain, skipped, displayValueFormat, ...inputProps
  } = props;
  const sliderProps = {
    axis, max, min, step, defaultValue: props.defaultValue, onChange, onUpdate, domain, skipped, displayValueFormat
  };
  const { id, disabled } = inputProps;
  sliderProps.id = id;
  sliderProps.ticks = new Map(ticks);
  sliderProps.disabled = disabled;
  return(
    <Input {...inputProps}>
      <CompoundSlider {...sliderProps} />
    </Input>
  );
};

InputSlider.propTypes = {
  /** Whether the label should be hidden or not */
  hiddenLabel: PropTypes.bool,
  /** The label text for the input field */
  labelText: PropTypes.string.isRequired,
  /** The unique ID for the input field */
  id: PropTypes.string.isRequired,
  /** Custom change function */
  onChange: PropTypes.func,
  /** Custom change function */
  onUpdate: PropTypes.func,
  /** Default input text value */
  defaultValue: PropTypes.string,
  /** Max value for the field. */
  max: PropTypes.number.isRequired,
  /** Min value for the field. */
  min: PropTypes.number.isRequired,
  /** This controls how much sliding the handle increments/decrements the value of the slider. */
  step: PropTypes.number,
  /** An array where each entry is an array of [key,value] pairs. The key (number inclusively between min and max) and value (label to display at the key) are used for displaying tick marks. */
  ticks: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  /** The direction for the slider, where x is horizontal and y is vertical. */
  axis: PropTypes.oneOf(['x', 'y']),
  /** Disables the slider if true. */
  disabled: PropTypes.bool,
  /** Whether input is required or not */
  required: PropTypes.bool,
  /** The range of numbers, inclusively, for the slider to fall between. First number is the min and second number is the max. */
  domain: PropTypes.arrayOf(PropTypes.number),
  /** Whether to skip the slider with keyboard interaction and hide the slider on screen readers. */
  skipped: PropTypes.bool,
  /** Display the value of the slider based. If null, don't display. If equals percentage, format the value in percentage. */
  displayValueFormat: PropTypes.oneOf(['percentage', 'value', null])
};


InputSlider.defaultProps = {
  defaultValue: 0,
  disabled: false
};

export default InputSlider;
