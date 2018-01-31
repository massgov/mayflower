import React from 'react';
import PropTypes from 'prop-types';

const CompHeading = ({ data }) => {
  const { compHeading } = data;
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
      {compHeading.titleContext &&
      <span className="visually-hidden" >{compHeading.titleContext}</span>}
    </Element>
  );
};

CompHeading.propTypes = {
  data: PropTypes.shape({
    compHeading: PropTypes.shape({
      title: PropTypes.string.isRequired,
      titleContext: PropTypes.string,
      level: PropTypes.number,
      sub: PropTypes.bool,
      color: PropTypes.string,
      id: PropTypes.string,
      centered: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      sidebar: PropTypes.bool
    })
  })
};

CompHeading.defaultProps = {
  data: {
    compHeading: {
      titleContext: '',
      level: 2,
      sub: false,
      color: '',
      id: '',
      centered: false,
      sidebar: false
    }
  }
};

export default CompHeading;
