import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { InputContext } from '../Input/context';
import './style.css';

const Handle = (props) => {
  const {
    handle: { id, value, percent }, getHandleProps, axis, min, max
  } = props;
  const divProps = {
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value,
    role: 'slider',
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
    <div className="ma__slider-handle" {...divProps}>
      <div className="ma__slider-handle-value">
        {value}
      </div>
    </div>
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
              min, max, step, disabled
            } = this.props;
            const handleDragEnd = (values) => {
              const value = values[0];
              context.updateState({ value });
              if (typeof this.props.onChange === 'function') {
                this.props.onChange(value);
              }
            };
            const sliderProps = {
              domain: [min, max],
              step,
              vertical: !(this.props.axis === 'x'),
              onSlideEnd: handleDragEnd,
              values: [Number(this.props.defaultText)],
              mode: 2,
              disabled
            };
            const wrapperClasses = classNames({
              'ma__input-slider': true,
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
  defaultText: PropTypes.string,
  /** Max value for the field. */
  max: PropTypes.number.isRequired,
  /** Min value for the field. */
  min: PropTypes.number.isRequired,
  /** This controls how much sliding the handle increments/decrements the value of the slider. */
  step: PropTypes.number,
  /** A Map object where each entry is a key (number inclusively between min and max) and value (label to display at the key) pair for displaying tick marks. */
  ticks: PropTypes.object,
  /** The direction for the slider, where x is horizontal and y is vertical. */
  axis: PropTypes.oneOf(['x', 'y']),
  /** Disables the slider if true. */
  disabled: PropTypes.bool
};

CompoundSlider.defaultProps = {
  ticks: new Map()
};

export default CompoundSlider;
