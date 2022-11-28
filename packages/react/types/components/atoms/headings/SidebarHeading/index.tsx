// @ts-nocheck
/**
 * SidebarHeading module.
 * @module @massds/mayflower-react/SidebarHeading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/sidebar-heading
 */
import React from 'react';

export interface SidebarHeadingProps {
  /** The heading level e.g. H1, H2, etc. */
  level?: number | string
  /**  The title text shown by the heading */
  title?: string
}

const SidebarHeading = (props: SidebarHeadingProps) => {
  const sidebarHeading = props;
  const Element = `h${sidebarHeading.level || 2}`;

  return(
    <Element className="ma__sidebar-heading">
      { sidebarHeading.title }
    </Element>
  );
};

SidebarHeading.defaultProps = {
  level: 2,
  title: ''
};

export default SidebarHeading;
