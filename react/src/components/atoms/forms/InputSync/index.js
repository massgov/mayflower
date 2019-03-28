import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import deepEqual from 'fast-deep-equal';
import { FormContext } from '../Input/context';

class InputSync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      updateSelf: this.updateSelf,
      children: this.props.children,
      inputProviderIds: this.props.inputProviderIds
    };
  }
  componentDidMount() {
    this.checkFormContext();
  }
  // Checks to see if there is any related FormContext set for this component.
  // If the form is set and it is active, then add its updater function to FormContext's inputProviderStore for each id within inputProviderIds.
  checkFormContext = () => {
    if (this.context && this.context.isActive) {
      if (is.array(this.state.inputProviderIds) && !is.array.empty(this.state.inputProviderIds)) {
        this.state.inputProviderIds.forEach((id) => {
          this.addSelfToInputProviderStore(id);
        });
      }
    }
  };
  addSelfToInputProviderStore = (id) => {
    if (!Object.prototype.hasOwnProperty.call(this.context.inputProviderStore[id], 'inputSyncUpdateFunctionStore')) {
      const { inputProviderStore } = this.context;
      inputProviderStore[id].inputSyncUpdateFunctionStore = [];
      inputProviderStore[id].inputSyncUpdateFunctionStore.push(this.state.updateSelf);
      this.context.updateFormState({ inputProviderStore });
    } else {
      const { inputProviderStore } = this.context;
      inputProviderStore[id].inputSyncUpdateFunctionStore.push(this.state.updateSelf);
      this.context.updateFormState({ inputProviderStore });
    }
  };
  // nextId is the InputProvider id that's being processed.
  // nextValue is the current InputProvider's this.state.value.
  updateSelf = (nextId, nextValue) => {
    // overrideDefaultSyncCondition overrides the default behavior in the else below.
    if (is.fn(this.props.overrideDefaultSyncCondition)) {
      const { value } = this.state;
      if (this.props.overrideDefaultSyncCondition(nextId, nextValue)) {
        value[nextId] = nextValue;
        this.setState({ value });
      }
    } else {
      const { value } = this.state;
      // this.state.value stores the value of each InputProvider that is being watched.
      // For each InputProvider being watched, check to see if the nextValue being set to its is different than the previous value it already was. If so, re-render this current InputSync component by storing the new value.
      // This same thing can be accomplished if a unique identifier that is 100% based on InputProvider's value is created instead, for memory saving.
      this.state.inputProviderIds.forEach((id) => {
        if (!Object.prototype.hasOwnProperty.call(value, id)) {
          value[id] = nextValue;
        } else if (!deepEqual(value[id], nextValue)) {
          value[id] = nextValue;
          this.setState({ value });
        }
      });
    }
  };
  render() {
    // Children must be a render prop (function)! This is how the content is allowed to update.
    // You must use state here, as props.children is the original default value of children.
    return(
      this.state.children()
    );
  }
}
InputSync.propTypes = {
  inputProviderIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.any
};
InputSync.contextType = FormContext;
export default InputSync;
