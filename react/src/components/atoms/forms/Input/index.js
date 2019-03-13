import React from 'react';
import classNames from 'classnames';
import is from 'is';

import './style.css';
import { InputContext, FormContext } from './context';

const Input = (props) => {
  if (is.fn(props.shouldRender) && !props.shouldRender()) {
    return null;
  }
  const inputClasses = classNames({
    'ma__input-group': true,
    'ma__input-group--inline': props.inline
  });
  const inputLabelClasses = classNames({
    ma__label: true,
    'ma__label--hidden': (props.labelText && props.hiddenLabel),
    'ma__label--required': (props.labelText && props.required),
    'ma__label--optional': (props.labelText && !props.required),
    'ma__label--disabled': (props.labelText && props.disabled)
  });
  // InputProvider will get the same props.children as Input.
  return(
    <React.Fragment>
      <div className={inputClasses}>
        {props.labelText && <label htmlFor={props.id} className={inputLabelClasses}>{props.labelText}</label>}
        <InputProvider {...props} />
      </div>
    </React.Fragment>
  );
};

// Anything within a provider always re-renders when state changes.
// Using keys will not prevent this because each child in the provider
// is created with React.createElement, which makes a new object every render.
// This class is so that the label does not re-render for every state change.
class InputProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
      linkedContent: this.props.linkedContent,
      overrideLink: (is.fn(this.props.overrideLink)) ? this.props.overrideLink : null,
      getOverrideLink: this.getOverrideLink,
      updateFunc: this.props.updateFunc,
      getLinkedContent: this.getLinkedContent,
      setLinkedContent: this.setLinkedContent,
      getValue: this.getValue,
      setValue: this.setValue,
      updateState: this.updateState,
      showError: false,
      errorMsg: this.props.errorMsg,
      disabled: this.props.disabled,
      inline: this.props.inline,
      setUpdateFunc: this.setUpdateFunc
    };
  }
  componentDidMount() {
    this.checkFormContext(this.context);
  }
  componentDidUpdate() {
    if (is.array(this.state.linkedContent)) {
      // Add any back references to the current Input to the linkedContent array.
      this.state.linkedContent.forEach((id) => {
        const currentLinks = this.context.getLinkedContent(id);
        if (!currentLinks.includes(this.props.id)) {
          const backLink = this.state.linkedContent.filter(v => v !== id);
          backLink.push(this.props.id);
          this.context.setLinkedContent(id, backLink);
        }
      });
    }
    if (is.array(this.state.linkedContent) && is.fn(this.context.updateLinkedContent)) {
      // First, run on update function for this Input.
      if (is.fn(this.context.onUpdate)) {
        this.context.onUpdate(this.props.id);
      }
      // Then sync all Inputs in the linkedContent array with the newly updated value.
      this.context.updateLinkedContent(this.props.id);
    } else if (is.fn(this.context.onUpdate)) {
      // If nothing is linked, just run on update function.
      this.context.onUpdate(this.props.id);
    }
    // Finally, handle updating any InputSync components on the Form that are watching this Input.
    if (is.fn(this.context.syncContent)) {
      this.context.syncContent(this.props.id);
    }
  }
  getValue = () => this.state.value;
  setValue = (value, afterUpdate) => {
    this.setState({ value }, afterUpdate);
  };
  getLinkedContent = () => this.state.linkedContent;
  setLinkedContent = (ids) => {
    if (is.array(ids) && !is.empty(ids)) {
      const { linkedContent = [] } = this.state;
      if (!is.fn(this.state.overrideLink)) {
        const updatedIds = linkedContent.concat(ids);
        this.setState({ linkedContent: updatedIds });
      }
    }
  };
  getUpdateFunc = () => this.state.updateFunc;
  setUpdateFunc = (updateFunc) => {
    this.setState({ updateFunc });
  };
  getOverrideLink = () => this.state.overrideLink;
  updateState = (newState, afterUpdate) => {
    this.setState(newState, afterUpdate);
  };
  checkFormContext = (formContext) => {
    if (formContext.isActive) {
      // By giving the form getters and setters and not the input value,
      // extra re-renders are avoided when context updates.
      if (!Object.prototype.hasOwnProperty.call(formContext.value, this.props.id)) {
        const { value } = formContext;
        value[this.props.id] = {
          getValue: this.getValue,
          setValue: this.setValue,
          getLinkedContent: this.getLinkedContent,
          setLinkedContent: this.setLinkedContent,
          getUpdateFunc: this.getUpdateFunc,
          setUpdateFunc: this.setUpdateFunc,
          getOverrideLink: this.getOverrideLink
        };
        formContext.updateState({ value });
      }
    }
  };
  render() {
    return(
      <InputContext.Provider value={this.state}>
        <div className="ma__input-group-right">
          {this.props.children}
        </div>
      </InputContext.Provider>
    );
  }
}
InputProvider.defaultProps = {
  linkedContent: []
};


InputProvider.contextType = FormContext;

export default Input;

