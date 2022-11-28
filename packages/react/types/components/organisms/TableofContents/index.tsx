// @ts-nocheck
/**
 * TableofContents module.
 * @module @massds/mayflower-react/TableofContents
 * @requires module:@massds/mayflower-assets/scss/03-organisms/table-of-contents-hierarchy
 */
import React from 'react';

export interface TableofContentsProps {
  /** The heading text  */
  heading?: React.ReactElement
  children?: React.ReactNode
}

const TableofContents = (props: TableofContentsProps) => (
  <nav className="ma__toc--hierarchy">
    {props.heading}
    <ul className="ma__toc--hierarchy__container">
      {
        // eslint-disable-next-line react/prop-types
        React.Children.map(props.children, (child) => <li>{child}</li>)
      }
    </ul>
  </nav>
);

export default TableofContents;
