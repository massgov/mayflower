import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import CompoundSlider from '../CompoundSlider';

const InputSlider = (props) => {
  const {
    axis, max, min, step, defaultText, ticks, ...inputProps
  } = props;
  const sliderProps = {
    axis, max, min, step, defaultText
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
  /** Default input text value */
  defaultText: PropTypes.string,
  /** Max value for the field. */
  max: PropTypes.number.isRequired,
  /** Min value for the field. */
  min: PropTypes.number.isRequired,
  /** This controls how much sliding the handle increments/decrements the value of the slider. */
  step: PropTypes.number,
  /** An array where each entry is an array of [key,value] pairs. The key (number inclusively between min and max) and value (label to display at the key) are used for displaying tick marks. */
  ticks: PropTypes.array,
  /** The direction for the slider, where x is horizontal and y is vertical. */
  axis: PropTypes.oneOf(['x', 'y']),
  /** Disables the slider if true. */
  disabled: PropTypes.bool,
  /** Whether input is required or not */
  required: PropTypes.bool
};


InputSlider.defaultProps = {
  defaultText: 0,
  disabled: false
};

export default InputSlider;
