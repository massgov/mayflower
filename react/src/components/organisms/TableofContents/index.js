import React from 'react';
import PropTypes from 'prop-types';
import { componentWithName } from 'airbnb-prop-types';
import './style.scss';

const TableofContents = (props) => (
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

TableofContents.propTypes = {
  /** The heading text  */
  heading: PropTypes.oneOfType([
    componentWithName('ColoredHeading'),
    componentWithName('SidebarHeading')
  ])
};

export default TableofContents;
