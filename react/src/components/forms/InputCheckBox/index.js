/**
 * InputCheckBox module.
 * @module @massds/mayflower-react/InputCheckBox
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-checkbox
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputGroup from 'MayflowerReactForms/InputGroup';
import Label from 'MayflowerReactForms/Label';

const InputCheckBox = React.forwardRef((props, ref) => {
  const {
    label = '',
    inputProps = {},
    groupProps = {}
  } = props;
  const { outline, showError } = groupProps;
  const {
    id,
    value,
    className: inputClassName = null
  } = inputProps;
  const inputRef = React.useRef(ref);

  const radioClasses = classNames({
    'ma__input-checkbox': !outline,
    'ma__input-checkbox--outline': outline
  });
  const inputClasses = classNames(inputClassName, {
    'has-error': showError,
    'ma__input-checkbox__control': !outline,
    'ma__input-checkbox--outline__control': outline,
    'ma__input-checkbox--outline__control--error': showError
  });
  const labelClasses = classNames({
    'ma__input-checkbox__label': !outline,
    'ma__input-checkbox__label--error': showError && !outline,
    'ma__input-checkbox--outline__label': outline,
    'ma__input-checkbox--outline__label--error': showError && outline
  });
  const inputElementProps = {
    ...inputProps,
    id: id || value,
    className: inputClasses.length > 0 ? inputClasses : null,
    ref: inputRef,
    type: 'checkbox'
  };
  return(
    <InputGroup {...props}>
      <div className={radioClasses}>
        <input {...inputElementProps} />
        <Label inputId={id || value} className={labelClasses}>
          {label}
        </Label>
      </div>
    </InputGroup>
  );
});

InputCheckBox.propTypes = {
  inputProps: PropTypes.shape({
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    required: PropTypes.bool
  }),
  label: PropTypes.string.isRequired
};


InputCheckBox.displayName = 'InputCheckBox';
export default InputCheckBox;
