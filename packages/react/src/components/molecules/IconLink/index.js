import React from 'react';
import PropTypes from 'prop-types';
import airPropTypes from 'airbnb-prop-types';

const IconLink = (props) => (
  <span className={props.wrapperClasses.join(' ')}>
    {props.icon && (
    <>
      {props.icon}
      {' '}
&nbsp;
    </>
    )}
    {props.link}
  </span>
);

IconLink.propTypes = {
  icon: airPropTypes.componentWithName('Icon'),
  link: airPropTypes.componentWithName('Link'),
  wrapperClasses: PropTypes.arrayOf(PropTypes.string)
};

IconLink.defaultProps = {
  wrapperClasses: []
};

export default IconLink;
