import React from 'react';
import {PropTypes} from 'prop-types';
import './style.css';

const ArrowButton = (props) => {
  const classes = [
    'ma__arrow-button',
    'ma__arrow-button--' + props.direction
  ];

  return (
    <a
      className={classes.join(' ')}
      href={ props.href }
      title={ props.info }>
    </a>
  );
}

ArrowButton.propTypes = {
  /** Link destination */
  href: PropTypes.string.isRequired,
  /** Title value */
  info: PropTypes.string.isRequired,
  /** Direction of arrow, Left or Right */
  direction: PropTypes.oneOf(['left','right'])
}

ArrowButton.defaultProps = {
  href: '#',
  info: '',
  direction: 'left'
};

export default ArrowButton;