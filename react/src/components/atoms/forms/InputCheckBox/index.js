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
  id: PropTypes.string,
  defaultValue: PropTypes.bool,
  icon: PropTypes.shape(Icon.propTypes),
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default InputCheckBox;
