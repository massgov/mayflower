import React, { Component } from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { InputContext } from '../Input/context';

const Handle = ({ handle: { id, value, percent }, getHandleProps, axis, min, max }) => {
  const divProps = {
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value,
    role: 'slider',
    ...getHandleProps(id)
  };
  if (axis === 'x') {
    divProps.style = {
      left: `${percent}%`,
      position: 'absolute',
      marginLeft: -15,
      marginTop: 25,
      zIndex: 2,
      width: 30,
      height: 30,
      border: 0,
      textAlign: 'center',
      cursor: 'pointer',
      borderRadius: '50%',
      backgroundColor: '#2C4870',
      color: '#fff'
    };
  } else if (axis === 'y') {
    divProps.style = {
      top: `${percent}%`,
      position: 'absolute',
      marginLeft: -6,
      marginTop: -12,
      zIndex: 2,
      width: 24,
      height: 24,
      cursor: 'pointer',
      border: 0,
      borderRadius: '50%',
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#2C4870',
      color: '#fff'
    };
  }
  return(
    <div {...divProps}>
      <div style={{fontFamily: 'Roboto', fontSize: 11, marginTop: -35 }}>
        {value}
      </div>
    </div>
  );
};
const Track = ({ source, target, getTrackProps, axis }) => {
  const divProps = {
    ...getTrackProps()
  };
  if (axis === 'x') {
    divProps.style = {
      position: 'absolute',
      height: 10,
      zIndex: 1,
      marginTop: 35,
      backgroundColor: '#546C91',
      borderRadius: 5,
      cursor: 'pointer',
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`
    };
  } else if (axis === 'y') {
    divProps.style = {
      position: 'absolute',
      zIndex: 1,
      backgroundColor: '#546C91',
      borderRadius: 7,
      cursor: 'pointer',
      width: 14,
      marginLeft: -1,
      top: `${source.percent}%`,
      height: `${target.percent - source.percent}%`,
    };
  }
  return(
    <div
      {...divProps}
    />
  );
};
const Tick = ({ tick, count, axis }) => {
  const top = {};
  const bottom = {};
  if (axis === 'x') {
    top.style = {
      position: 'absolute',
      marginTop: 52,
      marginLeft: -0.5,
      width: 1,
      height: 8,
      backgroundColor: 'silver',
      left: `${tick.percent}%`
    };
    bottom.style = {
      position: 'absolute',
      marginTop: 60,
      fontSize: 10,
      textAlign: 'center',
      marginLeft: `${-(100 / count) / 2}%`,
      width: `${100 / count}%`,
      left: `${tick.percent}%`
    };
  } else if (axis === 'y') {
    top.style = {
      position: 'absolute',
      marginTop: -0.5,
      marginLeft: 10,
      height: 1,
      width: 6,
      backgroundColor: 'silver',
      top: `${tick.percent}%`
    };
    bottom.style = {
      position: 'absolute',
      marginTop: -5,
      marginLeft: 20,
      fontSize: 10,
      top: `${tick.percent}%`
    };
  }
  return(
    <div>
      <div {...top} />
      <div {...bottom}><label>{tick.value}</label></div>
    </div>
  );
};


class CompoundSlider extends Component {
  render() {
    return(
      <InputContext.Consumer>
        {
          (context) => {
            const { min, max, step } = this.props;
            const handleDragEnd = (values) => {
              const value = values[0];
              context.updateState({ value });
            };
            const sliderProps = {
              domain: [min, max],
              step,
              vertical: !(this.props.axis === 'x'),
              onSlideEnd: handleDragEnd,
              values: [Number(this.props.defaultText)],
              mode: 2
            };
            let sliderStyle = {};
            let railStyle = {};
            let wrapperStyle = {};
            if (this.props.axis === 'x') {
              sliderStyle = {
                position: 'relative',
                width: '100%',
                height: 80,
              };
              railStyle = {
                position: 'absolute',
                width: '100%',
                height: 10,
                marginTop: 35,
                borderRadius: 5,
                backgroundColor: '#8B9CB6'
              };
              wrapperStyle = {
                height: 120,
                width: '100%'
              };
            } else if (this.props.axis === 'y') {
              sliderStyle = {
                position: 'relative',
                height: '400px',
                marginLeft: '45%'
              };
              railStyle = {
                position: 'absolute',
                width: '14px',
                height: '100%',
                cursor: 'pointer',
                marginLeft: '-1px',
                borderRadius: '7px',
                backgroundColor: '#8B9CB6'
              };
              wrapperStyle = { height: 520, width: '100%' };
            }
            return(
              <div style={wrapperStyle}>
                <Slider rootStyle={sliderStyle} {...sliderProps}>
                  <Rail>
                    {({ getRailProps }) => (
                      <div style={railStyle} {...getRailProps()} />
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
                                axis: this.props.axis
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

CompoundSlider.defaultProps = {
  ticks: []
};

export default CompoundSlider;
