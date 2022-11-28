// @ts-nocheck
/**
 * ButtonSort module.
 * @module @massds/mayflower-react/ButtonSort
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-sort
 */
import React from 'react';

export interface ButtonSortProps {
  /** The label text of the sort button */
  text: string
  /** An array of sort button objects */
  direction?: "" | "asc" | "dsc"
}

const ButtonSort = (buttonSort: ButtonSortProps) => {
  const buttonSortClass = buttonSort.direction ? ` ma__button-sort--${buttonSort.direction}` : '';
  const classNames = `ma__button-sort js-button-sort${buttonSortClass}`;

  return(
    <button type="button" className={classNames}>{buttonSort.text}</button>
  );
};

export default ButtonSort;
