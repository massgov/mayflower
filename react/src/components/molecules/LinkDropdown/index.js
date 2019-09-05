import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import classNames from 'classnames';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import DecorativeLink from '../../atoms/links/DecorativeLink';
import Icon from '../../atoms/icons/Icon';
import './style.css';

class LinkDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonExpand: false
    };
    this.wrapperRef = React.createRef();
    this.setDropDownButtonRef = this.setDropDownButtonRef.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    this.buttonClicked = false;
    document.addEventListener('mousedown', this.handleClickOutside);
    this.dropDownButtonRef.addEventListener('mousedown', this.handleRefMouseDown);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    this.dropDownButtonRef.removeEventListener('mousedown', this.handleRefMouseDown);
  }
  setDropDownButtonRef(node) {
    this.dropDownButtonRef = node;
  }
  closeDropdown() {
    this.setState({ buttonExpand: false });
  }
  handleClick() {
    this.setState((prevState) => ({ buttonExpand: !prevState.buttonExpand }));
  }
  handleSelect(event) {
    const { target } = event;
    this.setState({ buttonExpand: false });
    if (is.fn(this.props.onItemSelect)) {
      this.props.onItemSelect({target});
    }
  }
  handleClickOutside(event) {
    // Close the panel if the user clicks outside the component.
    const node = this.wrapperRef.current;
    if ((node && !node.contains(event.target))) {
      if (this.state.buttonExpand) {
        this.setState({ buttonExpand: false });
      }
    }
  }
  render() {
    const dropdownButton = {
      ...this.props.dropdownButton,
      onClick: this.handleClick,
      setButtonRef: this.setDropDownButtonRef,
      expanded: this.state.buttonExpand,
      icon: <Icon name="chevron" svgHeight={20} svgWidth={20} />
    };
    const dropdownClasses = classNames({
      'ma__link-dropdown': true,
      'ma__link-dropdown--expanded': this.state.buttonExpand
    });
    const dropdownMenuClasses = classNames({
      'ma__link-dropdown-menu': true,
      'ma__link-dropdown-menu--expanded': this.state.buttonExpand
    });
    const dropdownItemClasses = classNames({
      'ma__link-dropdown-item': true,
      'ma__link-dropdown-item--expanded': this.state.buttonExpand
    });
    const { dropdownItem, dropdown, dropdownMenu } = this.props;
    return(
      <div {...dropdown} ref={this.wrapperRef} className={dropdownClasses}>
        <ButtonWithIcon {...dropdownButton} />
        {this.state.buttonExpand && (
          <div {...dropdownMenu} className={dropdownMenuClasses} aria-labbelledby={this.props.dropdownButton.id}>
            {this.props.dropdownItems.map((item) => <DecorativeLink {...item} className={dropdownItemClasses} onClick={this.handleSelect} />)}
          </div>
        )}
      </div>
    );
  }
}

LinkDropdown.propTypes = {
  /** The props to set up the dropdown button */
  dropdownButton: PropTypes.shape(ButtonWithIcon.propTypes),
  /** Custom callback on dropdown item selection. */
  onItemSelect: PropTypes.func,
  /** An array of dropdown link items */
  dropdownItems: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string
  }))
};

LinkDropdown.defaultProps = {
  dropdownButton: {
    icon: <Icon name="chevron" svgHeight={20} svgWidth={20} />,
    text: 'All Organizations',
    capitalized: true,
    size: 'small',
    iconColor: '',
    theme: 'c-primary',
    usage: 'quaternary-simple',
    id: 'dropdownbutton-simple',
    'aria-haspopup': true
  }
};

export default LinkDropdown;
