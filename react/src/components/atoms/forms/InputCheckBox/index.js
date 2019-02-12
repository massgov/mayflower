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
          const { icon, label } = props;
          const inputProps = {
            id
          };
          inputProps.checked = value ? 'checked' : null;
          const handleClick = () => {
            context.updateState({ value: !value }, () => {
              if (typeof props.onChange === 'function') {
                props.onChange(!value, id);
              }
            });
          };
          const handleKeyDown = (e) => {
            // keycode for space key
            if (e.keyCode === 32) {
              context.updateState({ value: !value }, () => {
                if (typeof props.onChange === 'function') {
                  props.onChange(!value, id);
                }
              });
            }
          };
          console.log(icon)
          return(
            <span
              className="ma__input-checkbox"
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              role="checkbox"
              tabIndex={0}
              aria-checked={value}
            >
              <input type="checkbox" {...inputProps} />
              {icon && <Icon {...icon} />}
              <label htmlFor={id}><span>{ label }</span></label>
            </span>

          );
        }
      }
    </InputContext.Consumer>
  </React.Fragment>
);

const InputCheckBox = (props) => {
  const {
    icon, label, onChange, ...inputProps
  } = props;
  // Input and checkBox share the props.checked, props.id values.
  const checkBoxProps = {
    icon,
    label,
    id: props.id,
    onChange
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
  onChange: PropTypes.func
};

export default InputCheckBox;
