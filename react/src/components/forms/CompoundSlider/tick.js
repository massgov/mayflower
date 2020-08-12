import React from 'react';
import PropTypes from 'prop-types';

const Tick = (props) => {
  const {
    tick,
    count,
    axis = 'x',
    id
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
    <>
      <div className="ma__slider-tick ma__slider-tick--top" {...top} />
      <div className="ma__slider-tick ma__slider-tick--bottom" {...bottom}><label htmlFor={id}>{tick.value}</label></div>
    </>
  );
};

Tick.propTypes = {
  tick: PropTypes.shape({
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  count: PropTypes.number,
  getTrackProps: PropTypes.func,
  id: PropTypes.string,
  axis: PropTypes.string
};

export default Tick;
