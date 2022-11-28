// @ts-nocheck
/**
 * ButtonWithIcon module.
 * @module @massds/mayflower-react/ButtonWithIcon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-unresolved
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
// eslint-disable-next-line import/no-unresolved
import IconChevron from 'MayflowerReactBase/Icon/IconChevron';

export interface ButtonWithIconProps {
  /** id for the button */
  id?: string
  /** button or link content rendered in a span */
  children?: React.ReactElement | React.ReactNode
  /** When populated with a url, this component renders a <a> vs a <button> */
  href?: string
  // Function to run on click of the button.
  onClick?(...args: unknown[]): unknown
  // Sets a reference to the button onto the passed node.
  setButtonRef?: (...args: unknown[]) => unknown | {
    current?: object
  }
  // Button text.
  text?: string
  /** HTML `<button>` 'type' attribute  */
  type?: "submit" | "reset" | "button" | ""
  /** Create a smaller button */
  size?: "" | "small" | "large"
  // Button classes.
  classes?: string[]
  // Icon to display within the button.
  icon?: React.ReactElement
  // Adds expanded class to button if true.
  expanded?: boolean
  // Adds capitalized class to button if true.
  capitalized?: boolean
  // Defines the size, default size fits the most square icons and "small" setting is specific for the chevron icon.
  iconSize?: "" | "small"
  /** The aria-label property is used to provide the label to any assistive
   * technologies. This is useful if the text value is not descriptive of the
   * button's functionality. */
  'aria-label'?: string
  /** Themes correspond to site color scheme i.e. sass variables */
  theme?: "" | "c-primary" | "c-highlight" | "c-gray-dark" | "c-black" | "c-white"
  /** Button usage */
  usage?: "" | "secondary" | "tertiary" | "quaternary" | "quaternary-simple" | "alert"
  /** Whether the button has a popup or not */
  'aria-haspopup'?: boolean
}

const ButtonWithIcon = (props: ButtonWithIconProps) => {
  const {
    classes = [],
    iconSize,
    icon,
    expanded,
    capitalized,
    usage,
    theme,
    setButtonRef,
    text,
    size,
    ...rest
  } = props;
  const buttonClasses = classNames({
    'ma__button-icon': true,
    [`ma__button-icon--${size}`]: size,
    'ma__button-icon--expanded': expanded,
    'ma__button-icon--capitalized': capitalized,
    'ma__icon-small': iconSize === 'small' || icon?.type === IconChevron,
    'ma__button-search': icon?.type === IconSearch,
    'ma__button-search--secondary': icon?.type === IconSearch && usage === 'secondary',
    [`ma__button-icon--${theme}`]: theme,
    [`ma__button-icon--${usage}`]: usage,
    [classes.join(' ')]: classes
  });
  const buttonProps = {
    ...rest,
    className: buttonClasses,
    tabIndex: 0
  };
  const Element = rest.href ? 'a' : 'button';
  return(
    <Element {...buttonProps} ref={setButtonRef} aria-expanded={expanded}>
      <span>{rest.children ? rest.children : text}</span>
      {icon && icon}
    </Element>
  );
};

export default ButtonWithIcon;
