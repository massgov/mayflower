import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.copyContextToProps(props);
    this.state = {
      selected: this.props.options[0].text
    };
    this.selectTag = '';
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.selected });
    this.selectTag.selectedIndex = nextProps.options.findIndex((option) => option.text === nextProps.selected);
  }
  copyContextToProps(newProps) {
    // Keeps track of contexts added for conditionals that could be used later.
    if (!this.contexts) {
      this.contexts = [];
    }
    // While this is copying the context to props, you don't have to do this.
    if (newProps.resultsHeading) {
      this.props = Object.assign({}, newProps.resultsHeading.selectBox);
      this.contexts.push('resultsHeading');
    }
  }
  /**
   * Default event handler which renders selected item in the patter div.
   *
   * @param event The DOM onChange event
   *
   * Invokes custom callback passed as prop onChangeCallback, passing back the
   * object with select information.
   */
  handleOnChange(event) {
    const selectedIndex = event.nativeEvent.target.selectedIndex;
    const selected = event.target[selectedIndex].text;
    const selectedValue = event.target[selectedIndex].value;
    this.setState({ selected });

    // invokes custom function if passed in the component
    if (typeof this.props.onChangeCallback === 'function') {
      this.props.onChangeCallback({ selectedIndex, selected, selectedValue });
    }
  }

  render() {
    let classNames = '';
    if (this.props.className) {
      classNames = this.props.className;
    } else {
      classNames = !this.props.required ? 'ma__select-box js-dropdown ma__select-box--optional' : 'ma__select-box js-dropdown';
    }
    const selectClassNames = this.props.required ? 'ma__select-box__select js-dropdown-select js-required' : 'ma__select-box__select js-dropdown-select';
    const { selected } = this.state;
    const { stackLabel } = this.props;
    const labelClassNames = stackLabel ? 'ma__select-box__label' : 'ma__label--inline ma__label--small';
    const selectBoxInline = stackLabel ? '' : 'ma__select-box__field--inline';
    const resultsHeadingContext = (this.contexts.indexOf('resultsHeading') > -1);
    const renderedComponent = (
      <section className={classNames}>
        <label htmlFor={this.props.id} className={labelClassNames}>{this.props.label}</label>
        <div className={`ma__select-box__field ${selectBoxInline}`}>
          <select
            name={this.props.id}
            id={this.props.id}
            className={selectClassNames}
            onChange={this.handleOnChange}
            ref={(select) => { this.selectTag = select; }}
          >
            {this.props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <div className="ma__select-box__link">
            <span className="js-dropdown-link">{selected}</span>
            <span className="ma__select-box__icon" />
          </div>
        </div>
      </section>
    );
    // This lets the actual component control the contextual output.
    if (resultsHeadingContext) {
      return(
        <div className="ma__results-heading__sort ma__results-heading__sort-selecBox">
          {renderedComponent}
        </div>
      );
    }
    return renderedComponent;
  }
}

SelectBox.propTypes = {
  /** The label text above the select box */
  label: PropTypes.string.isRequired,
  /** Whether to stack label or inline label */
  stackLabel: PropTypes.bool,
  /** Whether the form field is required or not */
  required: PropTypes.bool,
  /** The id of the selectbox element */
  id: PropTypes.string.isRequired,
  /** An array of options for the selectbox */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string
    ])
  })),
  /** Change handler callback provided by the parent */
  onChangeCallback: PropTypes.func,
  /** Wrapper class for section tag */
  className: PropTypes.string,
  /** The default value for the select box */
  selected: PropTypes.string
};

SelectBox.defaultProps = {
  required: false
};

export default SelectBox;
