// @ts-nocheck
/**
 * InputSlider module.
 * @module @massds/mayflower-react/InputSlider
 * @requires module:@massds/mayflower-assets/scss/01-atoms/01-atoms/helper-text
 */
import React from 'react';
import Input from 'MayflowerReactForms/Input';
import CompoundSlider from 'MayflowerReactForms/CompoundSlider';

export interface InputSliderProps {
  /** Whether the label should be hidden or not */
  hiddenLabel?: boolean
  /** The label text for the input field */
  labelText: string
  /** The unique ID for the input field */
  id: string
  /** Custom change function */
  onChange?(...args: unknown[]): unknown
  /** Custom change function */
  onUpdate?(...args: unknown[]): unknown
  /** Default input text value */
  defaultValue?: string
  /** Max value for the field. */
  max: number
  /** Min value for the field. */
  min: number
  /** This controls how much sliding the handle increments/decrements the value of the slider. */
  step?: number
  /** An array where each entry is an array of [key,value] pairs. The key (number inclusively between min and max) and value (label to display at the key) are used for displaying tick marks. */
  ticks?: string | number[]
  /** The direction for the slider, where x is horizontal and y is vertical. */
  axis?: "x" | "y"
  /** Disables the slider if true. */
  disabled?: boolean
  /** Whether input is required or not */
  required?: boolean
  /** The range of numbers, inclusively, for the slider to fall between. First number is the min and second number is the max. */
  domain?: number[]
  /** Whether to skip the slider with keyboard interaction and hide the slider on screen readers. */
  skipped?: boolean
  /** Display the value of the slider based. If null, don't display. If equals percentage, format the value in percentage. */
  displayValueFormat?: "percentage" | "value" | unknown
}

const InputSlider = (props: InputSliderProps) => {
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

InputSlider.defaultProps = {
  defaultValue: 0,
  disabled: false
};

export default InputSlider;
