import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';

import Input from '../Input';
import Error from '../Input/error';
import Icon from '../../atoms/Icon';
import { InputContext } from '../Input/context';
import './style.css';

const CheckBox = (props) => {
  const context = useContext(InputContext);
  const { value } = context;
  const {
    icon, label, disabled, required, id, defaultValue, onKeyDown, onChange, tabIndex
  } = props;

  useEffect(() => {
    context.updateState({ value: defaultValue });
  }, [defaultValue]);

  const handleClick = (e) => {
    e.persist();
    context.updateState({ value: !value ? props.value : !value }, () => {
      if (is.fn(onChange)) {
        onChange(e, context.getValue(), id);
      }
    });
    if (!!value && required) {
      context.updateState({ showError: true });
    } else {
      context.updateState({ showError: false });
    }
  };
  const checkboxClasses = classNames({
    'ma__input-checkbox': true,
    'ma__input-checkbox--disabled': disabled
  });
  const inputProps = {
    type: 'checkbox',
    id,
    value: props.value,
    checked: value === props.value,
    onClick: handleClick,
    tabIndex,
    disabled
  };

  if (is.fn(onKeyDown)) {
    inputProps.onKeyDown = onKeyDown;
  }

  return(
    <span className={checkboxClasses}>
      <input {...inputProps} />
      {icon && icon.name && icon}
      <label htmlFor={id} tabIndex={-1} ><span>{ label }</span></label>
    </span>

  );
};

CheckBox.propTypes = {
  icon: PropTypes.shape(Icon.propTypes),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  defaultValue: PropTypes.string,
  tabIndex: PropTypes.number
};

const InputCheckBox = (props) => {
  const {
    icon, label, onChange, onKeyDown, value, tabIndex, ...inputProps
  } = props;
  // Input and checkBox share the props.checked, props.id values.
  const checkBoxProps = {
    icon,
    label,
    id: props.id,
    value,
    required: props.required,
    onChange,
    onKeyDown,
    tabIndex,
    disabled: props.disabled,
    defaultValue: props.defaultValue
  };
  return(
    <Input {...inputProps}>
      <CheckBox {...checkBoxProps} />
      <Error id={props.id} />
    </Input>
  );
};

InputCheckBox.propTypes = {
  /** Id of the input that the label is tied to and the value is associated with in the formContext. */
  id: PropTypes.string,
  /** Value of the input that is associated with in the formContext. (required) */
  value: PropTypes.string.isRequired,
  /** Default input value. */
  defaultValue: PropTypes.string,
  /** Tab index for the checkbox input. */
  tabIndex: PropTypes.number,
  /** Label for the checkbox input. */
  label: PropTypes.string,
  /** Icon that renders after the label. */
  icon: PropTypes.shape(Icon.propTypes),
  /** Custom callback function called when input checked value is changed. */
  onChange: PropTypes.func,
  /** Custom callback function called when a keyboard action is triggered. */
  onKeyDown: PropTypes.func,
  /** Whether the input is disabled. */
  disabled: PropTypes.bool,
  /** Whether checked is required. */
  required: PropTypes.bool,
  /** The label text for the input field, can be a string or a component */
  labelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  /** Pass array of classNames to input wrapper div */
  classes: PropTypes.arrayOf(PropTypes.string)
};

export default InputCheckBox;
