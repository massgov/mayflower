/**
 * SidebarHeading module.
 * @module @massds/mayflower-react/SidebarHeading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/sidebar-heading
 */
import React from 'react';
import PropTypes from 'prop-types';

const SidebarHeading = (props) => {
  const sidebarHeading = props;
  const Element = `h${sidebarHeading.level || 2}`;

  return(
    <Element className="ma__sidebar-heading">
      { sidebarHeading.title }
    </Element>
  );
};

SidebarHeading.propTypes = {
  /** The heading level e.g. H1, H2, etc. */
  level: PropTypes.number,
  /**  The title text shown by the heading */
  title: PropTypes.string
};

SidebarHeading.defaultProps = {
  level: 2,
  title: ''
};

export default SidebarHeading;
