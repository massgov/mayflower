import PropTypes from 'prop-types';
import React from 'react';
import Label from 'MayflowerReactForms/Label';
import ErrorMessage from 'MayflowerReactForms/ErrorMessage';
import classNames from 'classnames';
import HelperText from 'MayflowerReactForms/HelperText';

export const getInputGroupProps = ({
  inputProps = {},
  groupProps = {},
  ...rest
}) => {
  const {
    id,
    disabled = false,
    required = false
  } = inputProps;
  const {
    labelProps = {},
    wrapperClassName = null,
    fieldsetClassName = null,
    labelClassName = null,
    inline = false,
    outline = false,
    showError = false,
    hiddenLabel = false,
    fieldset = false,
    errorMsg = '',
    helperText = null
  } = groupProps;
  const {
    hidden = false,
    useLegend = fieldset,
    labelText,
    className: labelPropClassName = null,
    conditionText = required ? '' : 'optional'
  } = labelProps;
  return({
    inputProps: {
      ...inputProps,
      disabled,
      required
    },
    labelProps: {
      inputId: id,
      disabled,
      hidden,
      labelText,
      className: labelPropClassName,
      conditionText,
      useLegend
    },
    labelText,
    labelClassName,
    wrapperClassName,
    fieldsetClassName,
    id,
    disabled,
    required,
    inline,
    outline,
    showError,
    errorMsg,
    hiddenLabel,
    fieldset,
    helperText
  });
};

const InputGroup = (props) => {
  const { inputProps = {}, groupProps = {} } = props;
  const {
    id,
    disabled = false,
    required = false
  } = inputProps;
  const {
    labelProps = {},
    wrapperClassName = null,
    fieldsetClassName = null,
    inline = false,
    outline = false,
    showError = false,
    fieldset = false,
    errorMsg = '',
    helperText = null
  } = groupProps;
  const {
    inputId = id,
    disabled: labelDisabled = disabled,
    hidden = false,
    labelText = null,
    className: labelClassName = null,
    conditionText = required ? '' : 'optional',
    useLegend = fieldset
  } = labelProps;
  const { children } = props;
  const divClasses = classNames(wrapperClassName, {
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
  const labelComponentProps = {
    inputId,
    disabled: labelDisabled,
    hidden,
    className: labelClasses,
    conditionText,
    useLegend
  };
  const secondaryDivClasses = classNames(itemsClasses, {
    'ma__input-group-right': !fieldset
  });
  const fieldsetProps = {};
  if (fieldset) {
    fieldsetProps.className = fieldsetClassName;
  }
  return(
    <WrapperElement {...fieldsetProps}>
      <div className={divClasses}>
        <div className={secondaryDivClasses}>
          {children}
        </div>
      </div>
    </WrapperElement>
  );
};
InputGroup.HelperText = ({inputId, children, disabled, showError }) => (
  <HelperText
    inputId={inputId}
    message={children}
    disabled={disabled}
    showError={showError}
  />
);

InputGroup.Label = (props) => {
  const {
    inputId,
    disabled,
    hidden,
    className,
    conditionText,
    useLegend,
    showError,
    children
  } = props;
  const labelClasses = classNames(className, {
    'ma__input-group__title': true,
    'ma__input-group__title--error': showError,
    'ma__input-group__title--disabled': disabled
  });
  const labelComponentProps = {
    inputId,
    disabled,
    hidden,
    className: labelClasses,
    conditionText,
    useLegend
  };
  return(
    <Label {...labelComponentProps}>
      {children}
    </Label>
  );
};

InputGroup.ErrorMessage = ({ inputId, children }) => (
  <ErrorMessage inputId={inputId} error={children} />
);

InputGroup.propTypes = {
  children: PropTypes.any,
  groupProps: PropTypes.object,
  inputProps: PropTypes.object
};


export default InputGroup;
