// @ts-nocheck
/**
 * ButtonTag module.
 * @module @massds/mayflower-react/ButtonTag
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-tag
 */
import React from 'react';

export interface ButtonTagProps {
  /** The label text of the sort button */
  type: string
  /** The label text of the sort button */
  value: string
  /** The label text of the sort button */
  text: string
  /** An array of sort button objects */
  handleClick(...args: unknown[]): unknown
}

const ButtonTag = ({
  type,
  value,
  text,
  handleClick
}: ButtonTagProps) => (
  <button
    type="button"
    className="ma__button-tag js-results-heading-tag"
    data-ma-filter-type={type}
    data-ma-filter-value={value}
    onClick={handleClick}
  >
    {text}
  </button>
);

export default ButtonTag;
