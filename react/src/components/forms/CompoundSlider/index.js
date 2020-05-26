import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import numbro from 'numbro';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { InputContext } from '../Input/context';
import { countDecimals } from '../Input/utility';
import './style.scss';

const Handle = (props) => {
  const {
    handle: { id, value, percent }, getHandleProps, axis, min, max, step, displayValueFormat, disabled
  } = props;
  const decimalPlaces = countDecimals(step);
  const roundedValue = (Number.isInteger(step)) ? value : Number(Number.parseFloat(value).toFixed(decimalPlaces));
  const divProps = {
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': roundedValue,
    disabled,
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
      { displayValueFormat && (
        <div className="ma__slider-handle-value">
          { displayValueFormat === 'percentage' ? numbro(value).format({ output: 'percent', mantissa: 0 }) : roundedValue }
        </div>
      )
      }

    </button>
  );
};

Handle.propTypes = {
  handle: {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },
  getHandleProps: PropTypes.func,
  axis: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayValueFormat: PropTypes.string,
  disabled: PropTypes.bool
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

Track.propTypes = {
  source: {
    percent: PropTypes.string
  },
  target: {
    percent: PropTypes.string
  },
  getTrackProps: PropTypes.func,
  axis: PropTypes.string
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

Tick.propTypes = {
  tick: {
    percent: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },
  count: PropTypes.number,
  getTrackProps: PropTypes.func,
  id: PropTypes.string,
  axis: PropTypes.string
};

class CompoundSlider extends Component {
  render() {
    return(
      <InputContext.Consumer>
        {
          (context) => {
            const {
              min, max, step, disabled, domain, onChange, onUpdate
            } = this.props;
            const decimalPlaces = countDecimals(step);
            const handleChange = (values) => {
              const value = (Number.isInteger(step)) ? values[0] : Number(Number.parseFloat(values[0]).toFixed(decimalPlaces));
              context.updateState({ value }, () => {
                if (typeof onChange === 'function') {
                  onChange(value, this.props.id);
                }
              });
            };
            const handleUpdate = (values) => {
              const value = (Number.isInteger(step)) ? values[0] : Number(Number.parseFloat(values[0]).toFixed(decimalPlaces));
              context.updateState({ value }, () => {
                if (typeof onUpdate === 'function') {
                  onUpdate(value, this.props.id);
                }
              });
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
            const defaultValue = domainCheck(Number(context.getValue()));
            const sliderProps = {
              domain,
              step,
              vertical: !(this.props.axis === 'x'),
              onChange: handleChange,
              values: [defaultValue],
              mode: handleMode,
              disabled
            };
            if (onUpdate) {
              sliderProps.onUpdate = handleUpdate;
            }
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
                            disabled={disabled}
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
  /** Custom update function, triggered with the values on drag (caution: high-volume updates when dragging). Only if a function is passed to onUpdate will form context get updated on drag. */
  onUpdate: PropTypes.func,
  /** Custom on change function, triggered when the value of the slider has changed. This will recieve changes at the end of a slide as well as changes from clicks on rails and tracks. */
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
  displayValueFormat: PropTypes.oneOf(['percentage', 'value', null])
};

CompoundSlider.defaultProps = {
  ticks: new Map(),
  domain: [0, 1]
};

export default CompoundSlider;
