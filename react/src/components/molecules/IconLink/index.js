import React from 'react';
import PropTypes from 'prop-types';
import componentPropTypeCheck from '../../utilities/componentPropTypeCheck';

const IconLink = (props) => (
  <span className={props.wrapperClasses.join(' ')}>
    {props.icon && props.icon.props.name && <React.Fragment>{props.icon} &nbsp;</React.Fragment>}
    {props.link}
  </span>
);

IconLink.propTypes = {
  icon: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'Icon'),
  link: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'Link'),
  wrapperClasses: PropTypes.arrayOf(PropTypes.string)
};

IconLink.defaultProps = {
  wrapperClasses: []
};

export default IconLink;
