import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { InputContext } from '../Input/context';
import './style.css';

const Handle = (props) => {
  const {
    handle: { id, value, percent }, getHandleProps, axis, min, max, step, displayValueFormat
  } = props;
  const countDecimals = (x) => {
    if (Math.floor(x) === x) return 0;
    return String(x).split('.')[1].length || 0;
  };
  const decimalPlaces = countDecimals(step);
  const roundedValue = (Number.isInteger(step)) ? value : Number.parseFloat(value).toFixed(decimalPlaces);
  const divProps = {
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': roundedValue,
    role: 'slider',
    onClick: (e) => {
      e.preventDefault();
    },
    ...getHandleProps(id)
  };
  if (axis === 'x') {
    divProps.style = {
      left: `${percent}%`
    };
  } else if (axis === 'y') {
    divProps.style = {
      top: `${percent}%`
    };
  }
  return(
    <button className="ma__slider-handle" {...divProps}>
      { props.displayValueFormat && (
        <div className="ma__slider-handle-value">
          { props.displayValueFormat === 'percentage' ? `${roundedValue * 100}%` : roundedValue }
        </div>
      )
      }

    </button>
  );
};

const Track = (props) => {
  const {
    source, target, getTrackProps, axis
  } = props;
  const divProps = {
    ...getTrackProps()
  };
  if (axis === 'x') {
    divProps.style = {
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`
    };
  } else if (axis === 'y') {
    divProps.style = {
      top: `${source.percent}%`,
      height: `${target.percent - source.percent}%`
    };
  }
  return(
    <div className="ma__slider-track" {...divProps} />
  );
};
const Tick = (props) => {
  const {
    tick, count, axis, id
  } = props;
  const top = {};
  const bottom = {};
  if (axis === 'x') {
    top.style = {
      left: `${tick.percent}%`
    };
    bottom.style = {
      marginLeft: `${-(100 / count) / 2}%`,
      width: `${100 / count}%`,
      left: `${tick.percent}%`
    };
  } else if (axis === 'y') {
    top.style = {
      top: `${tick.percent}%`
    };
    bottom.style = {
      top: `${tick.percent}%`
    };
  }
  return(
    <React.Fragment>
      <div className="ma__slider-tick ma__slider-tick--top" {...top} />
      <div className="ma__slider-tick ma__slider-tick--bottom" {...bottom}><label htmlFor={id}>{tick.value}</label></div>
    </React.Fragment>
  );
};


class CompoundSlider extends Component {
  render() {
    return(
      <InputContext.Consumer>
        {
          (context) => {
            const {
              min, max, step, disabled, domain
            } = this.props;
            const countDecimals = (x) => {
              if (Math.floor(x) === x) return 0;
              return String(x).split('.')[1].length || 0;
            };
            const decimalPlaces = countDecimals(step);
            const handleDragEnd = (values) => {
              const value = (Number.isInteger(step)) ? values[0] : Number.parseFloat(values[0]).toFixed(decimalPlaces);
              context.updateState({ value });
              if (typeof this.props.onChange === 'function') {
                this.props.onChange(value);
              }
            };
            const domainCheck = (valToCheck) => {
              let minCheck = Number(min);
              let maxCheck = Number(max);
              if (Number.isNaN(valToCheck)) {
                return(Number.isInteger(step)) ? minCheck : Number.parseFloat(minCheck).toFixed(decimalPlaces);
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
              return(Number.isInteger(step)) ? returnValue : Number.parseFloat(returnValue).toFixed(decimalPlaces);
            };
            // Anything returned by mode when set to a function will become the value.
            // This can be used for min/max validation.
            // Next and current values are not numbers, but arrays of objects.
            const handleMode = (current, next) => {
              const [{ val: nextValue }] = next;
              const checkValue = (Number.isInteger(step)) ? nextValue : Number.parseFloat(nextValue).toFixed(decimalPlaces);
              if (checkValue === domainCheck(nextValue)) {
                return next;
              }
              return current;
            };
            const defaultValue = domainCheck(Number(this.props.defaultValue));
            const sliderProps = {
              domain,
              step,
              vertical: !(this.props.axis === 'x'),
              onSlideEnd: handleDragEnd,
              values: [defaultValue],
              mode: handleMode,
              disabled
            };
            const wrapperClasses = classNames({
              'ma__input-slider': true,
              'ma__input-slider--disabled': disabled,
              'ma__input-slider-x': this.props.axis === 'x',
              'ma__input-slider-y': this.props.axis === 'y'
            });
            return(
              <div id={this.props.id} className={wrapperClasses}>
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
                            key={handle.id}
                            handle={handle}
                            getHandleProps={getHandleProps}
                            isActive={handle.id === activeHandleID}
                            axis={this.props.axis}
                            min={min}
                            max={max}
                            step={step}
                            displayValueFormat={this.props.displayValueFormat}
                          />
                        ))}
                      </div>
                    )}
                  </Handles>
                  <Tracks right={false}>
                    {({ tracks, getTrackProps }) => (
                      <div className="slider-tracks">
                        {tracks.map(({ id, source, target }) => (
                          <Track
                            key={id}
                            source={source}
                            target={target}
                            getTrackProps={getTrackProps}
                            axis={this.props.axis}
                          />
                        ))}
                      </div>
                    )}
                  </Tracks>
                  <Ticks values={Array.from(this.props.ticks.keys())}>
                    {({ ticks }) => {
                      const ticksLength = ticks.length;
                      // Placing this check here because Slider can't handle null children but Ticks can.
                      if (ticksLength > 0) {
                        return(
                          <div className="slider-ticks">
                            {ticks.map((oldTick) => {
                              const tick = {
                                ...oldTick,
                                value: this.props.ticks.get(oldTick.value)
                              };
                              const tickProps = {
                                key: `CompoundSlider.tick.${tick.value}`,
                                count: ticksLength,
                                tick,
                                axis: this.props.axis,
                                id: this.props.id
                              };
                              return<Tick {...tickProps} />;
                            })}
                          </div>
                        );
                      }
                      return null;
                    }
                    }
                  </Ticks>
                </Slider>
              </div>
            );
          }
        }
      </InputContext.Consumer>
    );
  }
}

CompoundSlider.propTypes = {
  /** The unique ID for the input field */
  id: PropTypes.string.isRequired,
  /** Custom change function */
  onChange: PropTypes.func,
  /** Default input text value */
  defaultValue: PropTypes.string,
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
  displayValueFormat: PropTypes.oneOf(['percentage', '', null])
};

CompoundSlider.defaultProps = {
  ticks: new Map(),
  domain: [0, 1]
};

export default CompoundSlider;
