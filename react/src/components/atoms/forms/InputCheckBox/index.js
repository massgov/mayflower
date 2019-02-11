import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import Error from '../Input/error';
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
            id,
            checked: value
          }
          const handleClick = () => context.updateState({ value: !value });
          const handleKeyDown = (e) => {
            // keycode for space key
            if (e.keyCode === 32) {
              context.updateState({ value: !value });
            }
          };
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
              { icon }
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
    icon, label, ...inputProps
  } = props;
  // Input and checkBox share the props.checked, props.id values.
  const checkBoxProps = {
    icon,
    label,
    id: props.id
  };
  return(
    <Input {...inputProps}>
      <CheckBox {...checkBoxProps} />
      <Error id={props.id} />
    </Input>
  );
};

InputCheckBox.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string
};

export default InputCheckBox;
