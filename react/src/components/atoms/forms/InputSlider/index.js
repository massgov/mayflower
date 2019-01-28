import React from 'react';
import Input from '../Input';
import Error from '../Input/error';
import CompoundSlider from '../CompoundSlider';
import './style.css';

const InputSlider = (props) => {
  const {
    axis, max, min, step, width, height, defaultText, ticks,...inputProps
  } = props;
  const sliderProps = {
    axis, max, min, step, width, height, defaultText
  };
  const { id } = inputProps;
  sliderProps.id = id;
  sliderProps.ticks = new Map(ticks);
  return(
    <Input {...inputProps}>
      <CompoundSlider {...sliderProps} />
      <Error id={id} />
    </Input>
  );
};

InputSlider.defaultProps = {
  defaultText: 0,
  width: 300,
  height: 300
};

export default InputSlider;
