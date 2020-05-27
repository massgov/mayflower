import React from 'react';
import PropTypes from 'prop-types';

const CompHeading = (props) => {
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
      {compHeading.titleContext &&
      <span className="visually-hidden" >{compHeading.titleContext}</span>}
    </Element>
  );
};

CompHeading.propTypes = {
  /** The heading text displayed. */
  title: PropTypes.string.isRequired,
  /** Hidden context of title element for accessibility. */
  titleContext: PropTypes.string,
  /** The heading level e.g. H1, H2, etc. */
  level: PropTypes.number,
  /** Being deprecated, use level instead. */
  sub: PropTypes.bool,
  /** The color of the heading underline. */
  color: PropTypes.string,
  /** The heading id. */
  id: PropTypes.string,
  /** Whether you want the heading to be centered or left on the page. */
  centered: PropTypes.bool,
  /** Whether you want the heading to be a sidebar or not. */
  sidebar: PropTypes.bool
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
