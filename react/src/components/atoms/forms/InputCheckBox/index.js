import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../Input';
import Error from '../Input/error';
import Icon from '../../icons/Icon';
import { InputContext } from '../Input/context';
import './style.css';

const CheckBox = (props) => (
  <React.Fragment>
    <InputContext.Consumer>
      {
        (context) => {
          const { value } = context;
          const {
            icon, label, disabled, required, id
          } = props;
          const handleClick = (e) => {
            e.persist();
            context.updateState({ value: !value ? props.value : !value }, () => {
              if (typeof props.onChange === 'function') {
                props.onChange(e, context.getValue(), id);
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
            value,
            checked: !!value,
            onClick: handleClick,
            disabled
          };
          return(
            <span className={checkboxClasses}>
              <input {...inputProps} />
              {icon}
              <label htmlFor={id} tabIndex={-1} ><span>{ label }</span></label>
            </span>

          );
        }
      }
    </InputContext.Consumer>
  </React.Fragment>
);

CheckBox.propTypes = {
  icon: PropTypes.shape(Icon.propTypes),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const InputCheckBox = (props) => {
  const {
    icon, label, onChange, value, ...inputProps
  } = props;
  // Input and checkBox share the props.checked, props.id values.
  const checkBoxProps = {
    icon,
    label,
    id: props.id,
    value,
    required: props.required,
    onChange,
    disabled: props.disabled
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
  /** Value of the input that is associated with in the formContext. */
  value: PropTypes.string,
  /** Default checked value. */
  defaultValue: PropTypes.bool,
  /** Label for the checkbox input. */
  label: PropTypes.string,
  /** Icon that renders after the label. */
  icon: PropTypes.shape(Icon.propTypes),
  /** Custom callback function called when input checked value is changed. */
  onChange: PropTypes.func,
  /** Whether the input is disabled. */
  disabled: PropTypes.bool,
  /** Whether checked is required. */
  required: PropTypes.bool,
  /** The label text for the input field, can be a string or a component */
  labelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
};

export default InputCheckBox;
