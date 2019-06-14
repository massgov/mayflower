import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.css';

const ButtonFixedFeedback = (props) => (
  <div
    className={styles['ma__fixed-feedback-button']}
  >
    <a href={props.href}>{props.text}</a>
  </div>
);

ButtonFixedFeedback.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string
};

ButtonFixedFeedback.defaultProps = {
  href: '#',
  text: 'Feedback'
};

export default ButtonFixedFeedback;
