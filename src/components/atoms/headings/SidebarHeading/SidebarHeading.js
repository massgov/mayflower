import React from 'react';
import PropTypes from 'prop-types';

const SidebarHeading = ({ data }) => {
  const { sidebarHeading } = data;
  const SidebarHeadingDynamicLevel = `h${sidebarHeading.level || 2}`;
  return(
    <SidebarHeadingDynamicLevel className="ma__sidebar-heading">
      { sidebarHeading.title }
    </SidebarHeadingDynamicLevel>
  );
};

SidebarHeading.propTypes = {
  data: PropTypes.shape({
    level: PropTypes.number,
    title: PropTypes.string
  })
};

SidebarHeading.defaultProps = {
  data: {}
};

export default SidebarHeading;
