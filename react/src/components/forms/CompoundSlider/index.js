/**
 * CompoundSlider module.
 * @module @massds/mayflower-react/CompoundSlider
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Slider, Rail, Handles, Tracks, Ticks
} from 'react-compound-slider';
import { countDecimals } from 'MayflowerReactForms/Input/utility';
import is from 'is';
import InputGroup from 'MayflowerReactForms/InputGroup';
import Handle from 'MayflowerReactSlider/handle';
import Track from 'MayflowerReactSlider/track';
import Tick from 'MayflowerReactSlider/tick';

const InputSlider = (props) => {
  const {
    domain = [0, 1],
    values,
    mantissa = 0,
    axis = 'x',
    displayValueFormat,
    ticks = new Map(),
    inputProps = {},
    groupProps = {}
  } = props;
  const {
    id,
    step,
    disabled = false,
    onChange = null,
    onUpdate = null
  } = inputProps;
  const { inline, wrapperClassName = null } = groupProps;

  const [min, max] = domain;
  const decimalPlaces = countDecimals(step);
  const handleChange = (v) => {
    if (is.function(onChange)) {
      const value = (Number.isInteger(step)) ? v[0] : Number(Number.parseFloat(v[0]).toFixed(decimalPlaces));
      onChange({ value, id });
    }
  };
  const handleUpdate = (v) => {
    if (is.function(onUpdate)) {
      const value = (Number.isInteger(step)) ? v[0] : Number(Number.parseFloat(v[0]).toFixed(decimalPlaces));
      onUpdate({ value, id });
    }
  };
  const domainCheck = (valToCheck) => {
    let minCheck = Number(min);
    let maxCheck = Number(max);
    if (Number.isNaN(valToCheck)) {
      return(Number.isInteger(step)) ? minCheck : Number(Number.parseFloat(minCheck).toFixed(decimalPlaces));
    }
    let returnValue = valToCheck;
    const [domainMin, domainMax] = domain;
    // If the min/max passed falls outside of the domain, set it to the respective domain min/max.
    if (Number.isNaN(minCheck) || Math.abs(minCheck - domainMax) > Math.abs(domainMin - domainMax)) {
      minCheck = domainMin;
    }
    if (Number.isNaN(maxCheck) || Math.abs(maxCheck - domainMin) > Math.abs(domainMin - domainMax)) {
      maxCheck = domainMax;
    }
    // Ensure the value is always between the min or max values, if any.
    if (valToCheck < minCheck) {
      returnValue = minCheck;
    }
    if (valToCheck > maxCheck) {
      returnValue = maxCheck;
    }
    return(Number.isInteger(step)) ? returnValue : Number(Number.parseFloat(returnValue).toFixed(decimalPlaces));
  };
  // Anything returned by mode when set to a function will become the value.
  // This can be used for min/max validation.
  // Next and current values are not numbers, but arrays of objects.
  const handleMode = (current, next) => {
    const [{ val: nextValue }] = next;
    const checkValue = (Number.isInteger(step)) ? nextValue : Number(Number.parseFloat(nextValue).toFixed(decimalPlaces));
    if (checkValue === domainCheck(nextValue)) {
      return next;
    }
    return current;
  };
  const sliderProps = {
    domain,
    step,
    vertical: axis !== 'x',
    onChange: handleChange,
    values,
    mode: handleMode,
    disabled
  };
  if (is.function(onUpdate)) {
    sliderProps.onUpdate = handleUpdate;
  }
  const wrapperClasses = classNames(wrapperClassName, {
    'ma__input-slider': true,
    'ma__input-slider--disabled': disabled,
    'ma__input-slider-x': axis === 'x',
    'ma__input-slider-y': axis === 'y'
  });
  const inputGroupProps = {
    ...props,
    groupProps: {
      ...groupProps,
      wrapperClassName: wrapperClasses,
      outline: inline
    }
  };
  // Ticks ususally don't change often, so save the value and
  // update if ticks change.
  const ticksValues = React.useMemo(() => Array.from(ticks.keys()), [ticks]);
  return(
    <InputGroup {...inputGroupProps}>
      <Slider className="ma__slider" {...sliderProps}>
        <Rail>
          {({ getRailProps }) => (
            <div className="ma__slider-rail" {...getRailProps()} />
          )}
        </Rail>
        <Handles>
          {({ handles, activeHandleID, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={`CompoundSlider.handle.${handle.id}`}
                  handle={handle}
                  getHandleProps={getHandleProps}
                  isActive={handle.id === activeHandleID}
                  domain={domain}
                  axis={axis}
                  mantissa={mantissa}
                  displayValueFormat={displayValueFormat}
                  disabled={disabled}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map((trackProps) => (
                <Track
                  key={`CompoundSlider.track.${trackProps.id}`}
                  source={trackProps.source}
                  target={trackProps.target}
                  getTrackProps={getTrackProps}
                  axis={axis}
                />
              ))}
            </div>
          )}
        </Tracks>
        {ticks.size > 0 && (
          <Ticks values={ticksValues}>
            {(ticksProps) => (
              <div className="slider-ticks">
                {ticksProps.ticks.map((oldTick) => {
                  const tick = {
                    ...oldTick,
                    value: ticks.get(oldTick.value)
                  };
                  const tickProps = {
                    key: `CompoundSlider.tick.${tick.value}`,
                    count: ticks.size,
                    tick,
                    axis,
                    id
                  };
                  return<Tick {...tickProps} />;
                })}
              </div>
            )}
          </Ticks>
        )}
      </Slider>
    </InputGroup>
  );
};


InputSlider.propTypes = {
  inline: PropTypes.bool,
  required: PropTypes.bool,
  labelText: PropTypes.string,
  showError: PropTypes.bool,
  errorMsg: PropTypes.string,
  hiddenLabel: PropTypes.bool,
  /** The unique ID for the input field */
  id: PropTypes.string.isRequired,
  /** Custom update function, triggered with the values on drag (caution: high-volume updates when dragging). Only if a function is passed to onUpdate will form context get updated on drag. */
  onUpdate: PropTypes.func,
  /** Custom on change function, triggered when the value of the slider has changed. This will recieve changes at the end of a slide as well as changes from clicks on rails and tracks. */
  onChange: PropTypes.func,
  /** Optional significant digits to display with. */
  mantissa: PropTypes.number,
  /** Default input text value */
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  /** Max value for the field. */
  max: PropTypes.number.isRequired,
  /** Min value for the field. */
  min: PropTypes.number.isRequired,
  /** This controls how much sliding the handle increments/decrements the value of the slider. */
  step: PropTypes.number,
  /** A Map object where each entry is a key (number inclusively between min and max) and value (label to display at the key) pair for displaying tick marks. */
  ticks: PropTypes.instanceOf(Map),
  /** The direction for the slider, where x is horizontal and y is vertical. */
  axis: PropTypes.oneOf(['x', 'y']),
  /** Disables the slider if true. */
  disabled: PropTypes.bool,
  /** The range of numbers, inclusively, for the slider to fall between. First number is the min and second number is the max. */
  domain: PropTypes.arrayOf(PropTypes.number),
  /** Display the value of the slider based. If null, don't display. If equals percentage, format the value in percentage. */
  displayValueFormat: PropTypes.oneOf(['percentage', 'value', null])
};

export default InputSlider;
