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
  // nextValue is the current InputProvider this.state.value for the InputProvider.
  updateSelf = (nextId, nextValue) => {
    // This controls what happens for a single call to overrideDefaultSyncCondition.
    // overrideDefaultSyncCondition overrides the default behavior in the else below.
    if (is.fn(this.props.overrideDefaultSyncCondition)) {
      const { value } = this.state;
      if (this.props.overrideDefaultSyncCondition(nextId, nextValue)) {
        value[nextId] = nextValue;
        this.setState({ value });
      }
    } else {
      const { value } = this.state;
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
