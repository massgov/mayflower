import React from 'react';
import data from './SidebarHeading.json'

const SidebarHeading = () => {
  const {sidebarHeading} = data;
  const SidebarHeadingDynamicLevel = 'h' + (sidebarHeading.level || 2);
  return (
    <SidebarHeadingDynamicLevel className="ma__sidebar-heading">{sidebarHeading.title}</SidebarHeadingDynamicLevel>
  );
};

export default SidebarHeading;