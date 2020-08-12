import React from 'react';
import PropTypes from 'prop-types';
import numbro from 'numbro';

const Handle = (props) => {
  const {
    handle: { id, value, percent },
    getHandleProps,
    axis,
    domain: [min, max],
    mantissa = 0,
    displayValueFormat,
    disabled
  } = props;

  console.log(props);
  const num = numbro(value);
  const showPercent = displayValueFormat && displayValueFormat === 'percentage';
  const formattedValue = showPercent ? num.format({ output: 'percent', mantissa }) : num.format({ mantissa });
  const buttonProps = {
    className: 'ma__slider-handle',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': formattedValue,
    disabled,
    role: 'slider',
    onClick: (e) => {
      e.preventDefault();
    },
    ...getHandleProps(id)
  };
  if (axis === 'x') {
    buttonProps.style = {
      left: `${percent}%`
    };
  } else if (axis === 'y') {
    buttonProps.style = {
      top: `${percent}%`
    };
  }
  return(
    <button type="button" {...buttonProps}>
      { displayValueFormat && (
        <div className="ma__slider-handle-value">
          { formattedValue }
        </div>
      )}
    </button>
  );
};

Handle.propTypes = {
  domain: PropTypes.arrayOf(PropTypes.number),
  mantissa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handle: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  getHandleProps: PropTypes.func,
  axis: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayValueFormat: PropTypes.string,
  disabled: PropTypes.bool
};

export default Handle;
