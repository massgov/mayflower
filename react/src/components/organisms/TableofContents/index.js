import React from 'react';
import { componentArrayPropTypeCheck } from '../../utilities/componentPropTypeCheck';
import './style.css';

const TableofContents = (props) => (
  <nav className="ma__toc--hierarchy" aria-labelledby={props.navId}>
    {props.heading}
    <ul className="ma__toc--hierarchy__container">
      {
        // eslint-disable-next-line react/prop-types
        React.Children.map(props.children, (child) => <li>{child}</li>)
      }
    </ul>
  </nav>
);

TableofContents.propTypes = {
  /** The heading text  */
  heading: (props, propName, componentName) => componentArrayPropTypeCheck(props, propName, componentName, ['ColoredHeading', 'SidebarHeading'])
};

export default TableofContents;
