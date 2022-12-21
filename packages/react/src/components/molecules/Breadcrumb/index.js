/**
 * Breadcrumb module.
 * @module @massds/mayflower-react/Breadcrumb
 * @requires module:@massds/mayflower-assets/scss/02-molecules/breadcrumb
 */
import React from 'react';
import PropTypes from 'prop-types';

const Breadcrumb = (props) => (
  <nav aria-label="breadcrumb" className={props.className}>
    <ol className="ma__breadcrumb">
      {props.children}
    </ol>
  </nav>
);

Breadcrumb.propTypes = {
  /** Custom classes added to the root element. */
  className: PropTypes.string,
  children: PropTypes.node
};

export default Breadcrumb;
