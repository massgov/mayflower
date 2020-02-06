import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import classNames from 'classnames';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import DecorativeLink from '../../atoms/links/DecorativeLink';
import Icon from '../../atoms/Icon';
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
  handleSelect = (event) => {
    const { target } = event;
    this.setState({ buttonExpand: false });
    if (is.fn(this.props.onItemSelect)) {
      this.props.onItemSelect({ target });
    }
  }
  handleClickOutside = (event) => {
    // Close the panel if the user clicks outside the component.
    const node = this.wrapperRef.current;
    if ((node && !node.contains(event.target))) {
      if (this.state.buttonExpand) {
        this.closeDropdown();
      }
    }
  }
  handleKeyDown = (event) => {
    // If the user pressed escape collapse list.
    if (event.key === 'Escape') {
      this.closeDropdown();
    }
  }
  handleClick = (event) => {
    const { target } = event;
    this.setState((prevState) => ({ buttonExpand: !prevState.buttonExpand }));
    if (is.fn(this.props.onItemSelect)) {
      this.props.onButtonClick({ target });
    }
  }
  render() {
    const { dropdownItems, dropdownButton } = this.props;
    const dropdownButtonProps = {
      ...dropdownButton,
      onClick: (e) => this.handleClick(e),
      onKeyDown: (e) => this.handleKeyDown(e),
      setButtonRef: this.setDropDownButtonRef,
      expanded: this.state.buttonExpand,
      icon: <Icon name="chevron" svgHeight={20} svgWidth={20} />,
      'aria-haspopup': true
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

    return(
      <div ref={this.wrapperRef} className={dropdownClasses}>
        <ButtonWithIcon {...dropdownButtonProps} />
        {this.state.buttonExpand && (
          <div className={dropdownMenuClasses} aria-labelledby={dropdownButtonProps.id}>
            {dropdownItems.map((item, index) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <DecorativeLink {...item} key={`${item.text}-${index}`} className={dropdownItemClasses} onClick={(e) => this.handleSelect(e)} />
            ))}
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
  /** Custom callback on dropdown button click. */
  onButtonClick: PropTypes.func,
  /** An array of dropdown link items */
  dropdownItems: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string
  }))
};

LinkDropdown.defaultProps = {
  dropdownButton: {
    text: 'All Organizations',
    capitalized: true,
    size: 'small',
    theme: 'c-primary',
    usage: 'quaternary-simple',
    id: 'dropdownbutton-simple'
  }
};

export default LinkDropdown;
