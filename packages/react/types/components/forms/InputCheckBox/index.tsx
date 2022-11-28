// @ts-nocheck
/**
 * InputCheckBox module.
 * @module @massds/mayflower-react/InputCheckBox
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-checkbox
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import classNames from 'classnames';
import is from 'is';

import Input from 'MayflowerReactForms/Input';
import Error from 'MayflowerReactForms/Input/error';
import { InputContext } from 'MayflowerReactForms/Input/context';

export interface CheckBoxProps {
  icon?: {
    name?: string
    title?: string
    width?: string | number
    height?: string | number
    className?: string
    fill?: string
  }
  label?: string
  disabled?: boolean
  required?: boolean
  id?: string
  value?: string
  onChange?(...args: unknown[]): unknown
  onKeyDown?(...args: unknown[]): unknown
  defaultValue?: string
  tabIndex?: number
}

const CheckBox = (props: CheckBoxProps) => {
  const context = React.useContext(InputContext);
  const { value } = context;
  const {
    icon, label, disabled, required, id, defaultValue, onKeyDown, onChange, tabIndex
  } = props;

  React.useEffect(() => {
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
      {icon && icon}
      <label htmlFor={id} tabIndex={-1}><span>{ label }</span></label>
    </span>

  );
};

export interface InputCheckBoxProps {
  /** Id of the input that the label is tied to and the value is associated with in the formContext. */
  id?: string
  /** Value of the input that is associated with in the formContext. (required) */
  value: string
  /** Default input value. */
  defaultValue?: string
  /** Tab index for the checkbox input. */
  tabIndex?: number
  /** Label for the checkbox input. */
  label?: string
  /** Icon that renders after the label. */
  icon?: {
    title?: string
    width?: string | number
    height?: string | number
    className?: string
    fill?: string
  }
  /** Custom callback function called when input checked value is changed. */
  onChange?(...args: unknown[]): unknown
  /** Custom callback function called when a keyboard action is triggered. */
  onKeyDown?(...args: unknown[]): unknown
  /** Whether the input is disabled. */
  disabled?: boolean
  /** Whether checked is required. */
  required?: boolean
  /** The label text for the input field, can be a string or a component */
  labelText: string | object
  /** Pass array of classNames to input wrapper div */
  classes?: string[]
}

const InputCheckBox = (props: InputCheckBoxProps) => {
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

export default InputCheckBox;
