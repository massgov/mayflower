// @ts-nocheck
/**
 * CompHeading module.
 * @module @massds/mayflower-react/CompHeading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/comp-heading
 */

import React from 'react';

export interface CompHeadingProps {
  /** The heading text displayed. */
  title?: string
  /** Hidden context of title element for accessibility. */
  titleContext?: string
  /** The heading level e.g. H1, H2, etc. */
  level?: number
  /** Being deprecated, use level instead. */
  sub?: boolean
  /** The color of the heading underline. */
  color?: string
  /** The heading id. */
  id?: string
  /** Whether you want the heading to be centered or left on the page. */
  centered?: boolean
  /** Whether you want the heading to be a sidebar or not. */
  sidebar?: boolean
  children?: React.ReactNode
}

const CompHeading = (props: CompHeadingProps) => {
  const compHeading = props;
  const Element = `h${compHeading.sub ? 3 : compHeading.level}`;

  let classes = ['ma__comp-heading'];
  if (compHeading.color) {
    classes.push(`ma__comp-heading--${compHeading.color}`);
  }
  if (compHeading.centered) {
    classes.push('ma__comp-heading--centered');
  }
  if (compHeading.sidebar) {
    classes.push('ma__comp-heading--sidebar');
  }
  classes = classes.join(' ');

  return(
    <Element className={classes} tabIndex="-1" id={compHeading.id || null}>
      {compHeading.title}
      {
        // Allows compHeading to render custom children component (this feature is used in rideshare report and it's not in Mayflower PatternLab)
        compHeading.children
      }
      {compHeading.titleContext
      && <span className="visually-hidden">{compHeading.titleContext}</span>}
    </Element>
  );
};

CompHeading.defaultProps = {
  titleContext: '',
  level: 2,
  sub: false,
  color: '',
  id: '',
  centered: false,
  sidebar: false
};

export default CompHeading;
