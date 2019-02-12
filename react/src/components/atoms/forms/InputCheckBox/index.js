import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import Icon from '../../icons/Icon';
import { InputContext } from '../Input/context';
import './style.css';

const CheckBox = (props) => (
  <React.Fragment>
    <InputContext.Consumer>
      {
        (context) => {
          const { id, value } = context;
          const { icon, label, disabled } = props;
          const handleClick = () => {
            context.updateState({ value: !value }, () => {
              if (typeof props.onChange === 'function') {
                props.onChange(!value, id);
              }
            });
          };
          return(
            <button
              className="ma__input-checkbox"
              onClick={handleClick}
              disabled={disabled}
            >
              <input type="checkbox" id={id} checked={value} readOnly />
              {icon && icon.name && <Icon {...icon} />}
              <label htmlFor={id} tabIndex={-1} ><span>{ label }</span></label>
            </button>

          );
        }
      }
    </InputContext.Consumer>
  </React.Fragment>
);

const InputCheckBox = (props) => {
  const {
    icon, label, onChange, disabled, ...inputProps
  } = props;
  // Input and checkBox share the props.checked, props.id values.
  const checkBoxProps = {
    icon,
    label,
    id: props.id,
    onChange,
    disabled
  };
  return(
    <Input {...inputProps}>
      <CheckBox {...checkBoxProps} />
    </Input>
  );
};

InputCheckBox.propTypes = {
  /** Id of the input that the label is tied to and the value is associated with in the formContext. */
  id: PropTypes.string,
  /** Default checked value. */
  defaultValue: PropTypes.bool,
  /** Label for the checkbox input. */
  label: PropTypes.string,
  /** Icon that renders after the label. */
  icon: PropTypes.shape(Icon.propTypes),
  /** Custom callback function called when input checked value is changed. */
  onChange: PropTypes.func,
  /** Whether the input is disabled. */
  disabled: PropTypes.bool
};

export default InputCheckBox;
