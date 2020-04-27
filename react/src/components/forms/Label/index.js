import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

const Label = ({children, inputId, renderState, conditionText, className}) => {
  const inputLabelClasses = classNames(className, {
    ma__label: true,
    [`ma__label--${renderState}`]: renderState
  });
  
  return(
    <label htmlFor={inputId} className={inputLabelClasses}>
      {children}
      {conditionText && (
        <span className="ma__label-condition">
          {` (${conditionText})`}
        </span>
      )}
    </label>
  )
};

Label.propTypes = {
  /** The text rendered as the label */
  children: PropTypes.string,
  /** The ID of the corresponding input field */
  inputId: PropTypes.string.isRequired,
  /** The rendering state of the label, allowing one of the options below  */
  renderState: PropTypes.oneOf['hidden', 'disabled'],
  /** The text describing the conditional status of the field */
  conditionText: PropTypes.string,
  /** Additional classNames for label */
  className: PropTypes.string
};

export default Label;
