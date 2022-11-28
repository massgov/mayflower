// @ts-nocheck
/**
 * BreadcrumbItem module.
 * @module @massds/mayflower-react/BreadcrumbItem
 */
import React from 'react';

const CurrentItem = ({ currentPage }) => (<a href="/" aria-current="page" onClick={(e) => e.preventDefault()}>{currentPage}</a>);

export interface BreadcrumbItemProps {
  /** Current page name, rendered as the last breadcrumb item */
  currentPage?: string
  children?: React.ReactNode
}

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  // eslint-disable-next-line react/prop-types
  const { children, currentPage } = props;
  return(<li className="ma__breadcrumb-item">{currentPage ? <CurrentItem currentPage={currentPage} /> : children}</li>);
};

export default BreadcrumbItem;
