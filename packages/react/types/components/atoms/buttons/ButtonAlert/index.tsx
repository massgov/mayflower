// @ts-nocheck
/**
 * ButtonAlert module.
 * @module @massds/mayflower-react/ButtonAlert
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import classNames from 'classnames';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
// eslint-disable-next-line import/no-unresolved
import IconChevron from 'MayflowerReactBase/Icon/IconChevron';

export interface ButtonAlertProps {
  /** The text that will display on the button alert. */
  text?: string
  /** Optional class(es) to pass to the button alert */
  classes?: string
  /** An optional onClick function */
  onClick?(...args: unknown[]): unknown
  /** Text for showing alert */
  showText: string
  /** Text for hiding alert */
  hideText: string
  /** Adds is-open class to button if true. */
  isOpen?: boolean
  /** HTML `<button>` 'type' attribute  */
  type?: "submit" | "reset" | "button" | ""
  /** Theme of the button */
  theme?: "" | "c-primary" | "c-highlight" | "c-gray-dark" | "c-black"
}

const ButtonAlert = (props: ButtonAlertProps) => {
  const {
    text, hideText, showText, classes, isOpen, ...rest
  } = props;
  const buttonClasses = classNames({
    'ma__button-alert': true,
    [`${classes}`]: (classes && classes.length > 0),
    'is-open': isOpen
  });
  const buttonProps = {
    classes: [buttonClasses],
    expanded: isOpen,
    text: isOpen ? `${hideText} ${text}` : `${showText} ${text}`,
    usage: 'alert',
    icon: <IconChevron height={10} width={10} />,
    ...rest
  };
  return(
    <ButtonWithIcon {...buttonProps} />
  );
};

ButtonAlert.defaultProps = {
  isOpen: false,
  type: 'button',
  theme: 'c-black'
};

export default ButtonAlert;
