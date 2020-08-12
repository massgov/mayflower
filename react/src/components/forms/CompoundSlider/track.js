import React from 'react';
import PropTypes from 'prop-types';

const Track = (props) => {
  const {
    source,
    target,
    getTrackProps,
    axis = 'x'
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
  source: PropTypes.shape({
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  target: PropTypes.shape({
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  getTrackProps: PropTypes.func,
  axis: PropTypes.string
};

export default Track;
