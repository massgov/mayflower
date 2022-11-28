// @ts-nocheck
/**
 * Breadcrumb module.
 * @module @massds/mayflower-react/Breadcrumb
 * @requires module:@massds/mayflower-assets/scss/02-molecules/breadcrumb
 */
import React from 'react';

export interface BreadcrumbProps {
  /** Custom classes added to the root element. */
  className?: string
  children?: React.ReactNode
}

const Breadcrumb = (props: BreadcrumbProps) => (
  <nav aria-label="breadcrumb" className={props.className}>
    <ol className="ma__breadcrumb">
      {props.children}
    </ol>
  </nav>
);

export default Breadcrumb;
