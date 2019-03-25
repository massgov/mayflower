import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import { FormContext } from '../Input/context';

class InputLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      linkContent: this.linkContent,
      children: this.props.children,
      formIds: this.props.formIds
    };
  }
  componentDidMount() {
    this.checkFormContext();
  }
  checkFormContext = () => {
    if (this.context && this.context.isActive) {
      if (is.array(this.state.formIds) && !is.empty(this.state.formIds)) {
        this.state.formIds.forEach((id) => {
          this.linkToForm(id);
        });
      }
    }
  };
  linkToForm = (id) => {
    if (!Object.prototype.hasOwnProperty.call(this.context.value[id], 'linkContent')) {
      const { value } = this.context;
      value[id].linkContent = [];
      value[id].linkContent.push(this.linkContent);
      this.context.updateFormState({ value });
    } else {
      const { value } = this.context;
      value[id].linkContent.push(this.linkContent);
      this.context.updateFormState({ value });
    }
  };
  // The Form component uses this exact function when the linked formIds update.
  // nextId is the form id that's being processed.
  // nextValue is the current value for the form element.
  linkContent = (nextId, nextValue) => {
    const { value } = this.state;
    this.state.formIds.forEach((id) => {
      value[id] = nextValue;
      this.setState({ value });
    });
  };
  render() {
    // Children must be a render prop (function)! This is how the content is allowed to update.
    // You must use state here, as props.children is the original default value of children.
    return(
      this.state.children()
    );
  }
}
InputLink.propTypes = {
  formIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.any
};
InputLink.contextType = FormContext;
export default InputLink;
