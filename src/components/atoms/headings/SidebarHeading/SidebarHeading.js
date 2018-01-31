import React from 'react';
import PropTypes from 'prop-types';

const SidebarHeading = (props) => {
  const SidebarHeadingDynamicLevel = `h${props.level || 2}`;
  return(
    <SidebarHeadingDynamicLevel className="ma__sidebar-heading">
      { props.title }
    </SidebarHeadingDynamicLevel>
  );
};

SidebarHeading.propTypes = {
  level: PropTypes.number,
  title: PropTypes.string
};

SidebarHeading.defaultProps = {
  level: 2,
  title: ''
};

export default SidebarHeading;
