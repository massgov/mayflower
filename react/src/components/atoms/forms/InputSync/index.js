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
      syncContent: this.syncContent,
      children: this.props.children,
      formIds: this.props.formIds
    };
  }
  componentDidMount() {
    this.checkFormContext();
  }
  checkFormContext = () => {
    if (this.context && this.context.isActive) {
      if (is.array(this.state.formIds) && !is.array.empty(this.state.formIds)) {
        this.state.formIds.forEach((id) => {
          this.linkToForm(id);
        });
      }
    }
  };
  linkToForm = (id) => {
    if (!Object.prototype.hasOwnProperty.call(this.context.value[id], 'syncContent')) {
      const { value } = this.context;
      value[id].syncContent = [];
      value[id].syncContent.push(this.syncContent);
      this.context.updateState({ value });
    } else {
      const { value } = this.context;
      value[id].syncContent.push(this.syncContent);
      this.context.updateState({ value });
    }
  };
  // The Form component uses this exact function when the linked formIds update.
  // nextId is the form id that's being processed.
  // nextValue is the current value for the form element.
  syncContent = (nextId, nextValue) => {
    // syncCondition is ran for each id passed in props.formIds from the Form component.
    // This controls what happens for a single call to syncCondition.
    // syncCondition overrides the default behavior in the else below.
    if (is.fn(this.props.syncCondition)) {
      const { value } = this.state;
      if (this.props.syncCondition(nextId, nextValue)) {
        value[nextId] = nextValue;
        this.setState({ value });
      }
    } else {
      const { value } = this.state;
      this.state.formIds.forEach((id) => {
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
  formIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.any
};
InputSync.contextType = FormContext;
export default InputSync;
