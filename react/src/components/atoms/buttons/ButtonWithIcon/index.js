import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ref } from 'airbnb-prop-types';
import Icon from 'MayflowerReactBase/Icon';

const ButtonWithIcon = (props) => {
  const {
    classes, iconSize, icon, expanded, capitalized, usage, theme, setButtonRef, text, size, ...rest
  } = props;
  const buttonClasses = classNames({
    'ma__button-icon': true,
    [`ma__button-icon--${size}`]: size,
    'ma__button-icon--expanded': expanded,
    'ma__button-icon--capitalized': capitalized,
    'ma__icon-small': iconSize === 'small' || icon.props.name === 'chevron',
    'ma__button-search': icon.props.name === 'search',
    'ma__button-search--secondary': icon.props.name === 'search' && usage === 'secondary',
    [`ma__button-icon--${theme}`]: theme,
    [`ma__button-icon--${usage}`]: usage,
    [classes.join(' ')]: classes
  });
  const buttonProps = {
    ...rest,
    className: buttonClasses,
    tabIndex: 0
  };
  const Element = props.href ? 'a' : 'button';
  return(
    <Element {...buttonProps} ref={setButtonRef} aria-expanded={expanded}>
      <span>{props.children ? props.children : props.text}</span>
      {icon && icon}
    </Element>
  );
};

ButtonWithIcon.propTypes = {
  /** id for the button */
  id: PropTypes.string,
  /** button or link content rendered in a span */
  children: PropTypes.element,
  /** When populated with a url, this component renders a <a> vs a <button> */
  href: PropTypes.string,
  // Function to run on click of the button.
  onClick: PropTypes.func,
  // Sets a reference to the button onto the passed node.
  setButtonRef: ref(),
  // Button text.
  text: PropTypes.string,
  /** HTML <button> 'type' attribute  */
  type: PropTypes.oneOf(['submit', 'reset', 'button', '']),
  /** Create a smaller button */
  size: PropTypes.oneOf(['', 'small', 'large']),
  // Button classes.
  classes: PropTypes.arrayOf(PropTypes.string),
  // Icon to display within the button.
  icon: PropTypes.element,
  // Adds expanded class to button if true.
  expanded: PropTypes.bool,
  // Adds capitalized class to button if true.
  capitalized: PropTypes.bool,
  // Defines the size, default size fits the most square icons and "small" setting is specific for the chevron icon.
  iconSize: PropTypes.oneOf(['', 'small']),
  /** The aria-label property is used to provide the label to any assistive
   * technologies. This is useful if the text value is not descriptive of the
   * button's functionality. */
  'aria-label': PropTypes.string,
  /** Themes correspond to site color scheme i.e. sass variables */
  theme: PropTypes.oneOf(['', 'c-primary', 'c-highlight', 'c-gray-dark', 'c-black']),
  /** Button usage */
  usage: PropTypes.oneOf(['', 'secondary', 'tertiary', 'quaternary', 'quaternary-simple', 'alert']),
  /** Whether the button has a popup or not */
  'aria-haspopup': PropTypes.bool
};

ButtonWithIcon.defaultProps = {
  text: 'Search',
  type: 'submit',
  size: '',
  classes: [],
  icon: <Icon name="search" svgHeight={20} svgWidth={20} />,
  capitalized: false,
  iconSize: '',
  'aria-label': '',
  usage: '',
  theme: '',
  'aria-haspopup': false
};

export default ButtonWithIcon;
