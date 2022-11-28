// @ts-nocheck
/**
 * Label module.
 * @module @massds/mayflower-react/Label
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 */
import React from 'react';
import classNames from 'classnames';

export interface LabelProps {
  /** The text rendered as the label */
  children?: string
  /** The ID of the corresponding input field */
  inputId: string
  /** Render the visually hidden style for label  */
  hidden?: boolean
  /** Render the disabled style for label  */
  disabled?: boolean
  /** The text describing the conditional status of the field */
  conditionText?: string
  /** Additional classNames for label */
  className?: string
  /** Use legend tag instead of label. Use legend to caption a <fieldset> */
  useLegend?: boolean
}

const Label = ({
  children,
  inputId,
  hidden,
  disabled,
  conditionText,
  className,
  useLegend
}: LabelProps) => {
  const inputLabelClasses = classNames(className, {
    ma__label: true,
    'ma__label--hidden': hidden,
    'ma__label--disabled': disabled
  });

  const Tag = useLegend ? 'legend' : 'label';

  return(
    <Tag htmlFor={inputId} className={inputLabelClasses}>
      {children}
      {conditionText && conditionText.length > 0 && (
        <span className="ma__label-condition">
          {` (${conditionText})`}
        </span>
      )}
    </Tag>
  );
};

export default Label;
