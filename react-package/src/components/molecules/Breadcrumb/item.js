import React from 'react';
import PropTypes from 'prop-types';

const CurrentItem = ({ currentPage }) => (<a href="/" aria-current="page" onClick={(e) => e.preventDefault()}>{currentPage}</a>);

const BreadcrumbItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, currentPage } = props;
  return(<li className="ma__breadcrumb-item">{currentPage ? <CurrentItem currentPage={currentPage} /> : children}</li>);
};

CurrentItem.propTypes = {
  /** Current page name, rendered as the last breadcrumb item */
  currentPage: PropTypes.string
};

export default BreadcrumbItem;
