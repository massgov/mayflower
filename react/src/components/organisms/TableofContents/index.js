import React from 'react';
import { componentArrayPropTypeCheck } from '../../utilities/componentPropTypeCheck';
import './style.css';

const TableofContents = (props) => (
  <nav className="ma__toc--hierarchy">
    {props.heading}
    <ul className="ma__toc--hierarchy__container">
      {React.Children.map(props.children, (child, index) => <li>{child}</li>)}
    </ul>
  </nav>
);

TableofContents.propTypes = {
  /** The heading text  */
  heading: (props, propName, componentName) => componentArrayPropTypeCheck(props, propName, componentName, ['ColoredHeading', 'SidebarHeading'])
};

export default TableofContents;
