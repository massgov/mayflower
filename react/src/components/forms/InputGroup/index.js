import React from 'react';
import Label from 'MayflowerReactForms/Label';
import ErrorMessage from 'MayflowerReactForms/ErrorMessage';
import classNames from 'classnames';

const InputGroup = (props) => {
  const {
    className,
    labelText,
    labelClassName,
    children,
    id,
    disabled = false,
    required = false,
    inline = false,
    outline,
    showError = false,
    errorMsg,
    hiddenLabel = false,
    fieldset = false
  } = props;
  const conditionText = required ? '' : 'optional';
  const divClasses = classNames(className, {
    'ma__input-group': true,
    'ma__input-group--inline': !fieldset && inline
  });
  const itemsClasses = classNames({
    'ma__input-group__items': true,
    'ma__input-group__items--inline': inline,
    'ma__input-group__items--outline': outline
  });
  const labelClasses = classNames(labelClassName, {
    'ma__input-group__title': true,
    'ma__input-group__title--error': showError,
    'ma__input-group__title--disabled': disabled
  });
  const WrapperElement = fieldset ? 'fieldset' : React.Fragment;
  const labelProps = {
    className: labelClasses,
    disabled,
    hidden: hiddenLabel,
    conditionText,
    useLegend: fieldset
  };
  const secondaryDivClasses = classNames(itemsClasses, {
    'ma__input-group-right': !fieldset
  });
  return(
    <WrapperElement>
      <div className={divClasses}>
        {labelText && (
          <Label {...labelProps}>
            {labelText}
          </Label>
        )}
        <div className={secondaryDivClasses}>
          {children}
          {showError && <ErrorMessage inputId={id} error={errorMsg} />}
        </div>
      </div>
    </WrapperElement>
  );
};


export default InputGroup;
