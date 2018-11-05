import React from 'react';

const BreadcrumbItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return(<li className="ma__breadcrumb-item">{children}</li>);
};

export default BreadcrumbItem;
