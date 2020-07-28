import React from 'react';
import Label from 'MayflowerReactForms/Label';
import ErrorMessage from 'MayflowerReactForms/ErrorMessage';
import classNames from 'classnames';

const InputGroup = (props) => {
  const {
    className,
    labelText,
    children,
    id,
    disabled,
    required,
    inline,
    showError = false,
    errorMsg,
    hiddenLabel = false
  } = props;
  const conditionText = required ? '' : 'optional';
  const divClasses = classNames(className, {
    'ma__input-group': true,
    'ma__input-group--inline': inline
  });
  return(
    <div className={divClasses}>
      {labelText && (
        <Label inputId={id} disabled={disabled} hidden={hiddenLabel} conditionText={conditionText}>
          {labelText}
        </Label>
      )}
      <div className="ma__input-group-right">
        {children}
        {showError && <ErrorMessage inputId={id} error={errorMsg} />}
      </div>
    </div>
  );
};

export default InputGroup;
