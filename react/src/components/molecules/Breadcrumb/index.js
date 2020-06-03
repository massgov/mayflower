/**
 * Breadcrumb module.
 * @module @massds/mayflower-react/Breadcrumb
 * @requires module:@massds/mayflower-assets/scss/02-molecules/breadcrumb
 */
import React from 'react';
import PropTypes from 'prop-types';

const Breadcrumb = (props) => (
  <nav aria-label="breadcrumb">
    <ol className="ma__breadcrumb">
      {props.children}
    </ol>
  </nav>
);

Breadcrumb.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array
};

export default Breadcrumb;
