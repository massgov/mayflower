/**
 * Label module.
 * @module @massds/mayflower-react/Label
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Label = ({
  children,
  inputId,
  hidden = false,
  disabled = false,
  conditionText,
  className,
  showError = false,
  useLegend = false
}) => {
  const inputLabelClasses = classNames(className, {
    ma__label: !useLegend,
    'ma__input-group__title': useLegend,
    'ma__label--hidden': hidden,
    'ma__label--disabled': disabled,
    'ma__label--error': showError
  });

  const Tag = useLegend ? 'legend' : 'label';

  return(
    <Tag htmlFor={inputId} className={inputLabelClasses}>
      {children}
      {conditionText && conditionText.length > 0 && (
        <span className="ma__label--condition">
          {` (${conditionText})`}
        </span>
      )}
    </Tag>
  );
};

Label.propTypes = {
  /** The text rendered as the label */
  children: PropTypes.string,
  /** The ID of the corresponding input field */
  inputId: PropTypes.string.isRequired,
  /** Render the visually hidden style for label  */
  hidden: PropTypes.bool,
  /** Render the disabled style for label  */
  disabled: PropTypes.bool,
  /** The text describing the conditional status of the field */
  conditionText: PropTypes.string,
  /** Additional classNames for label */
  className: PropTypes.string,
  /** Use legend tag instead of label. Use legend to caption a <fieldset> */
  useLegend: PropTypes.bool
};

export default Label;
