import React from 'react';
import PropTypes from 'prop-types';

const CompHeading = (props) => {
  const Element = `h${props.sub ? 3 : props.level}`;

  let classes = ['ma__comp-heading'];
  if (props.color) {
    classes.push(`ma__comp-heading--${props.color}`);
  }
  if (props.centered) {
    classes.push('ma__comp-heading--centered');
  }
  if (props.sidebar) {
    classes.push('ma__comp-heading--sidebar');
  }
  classes = classes.join(' ');

  return(
    <Element className={classes} tabIndex="-1" id={props.id ? props.id : null}>
      {props.title}
      {props.titleContext && <span className="visually-hidden" >{props.titleContext}</span>}
    </Element>
  );
};

CompHeading.propTypes = {
  title: PropTypes.string.isRequired,
  titleContext: PropTypes.string,
  level: PropTypes.number,
  sub: PropTypes.bool,
  color: PropTypes.string,
  id: PropTypes.string,
  centered: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
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
