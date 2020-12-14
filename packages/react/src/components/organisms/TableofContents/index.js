/**
 * TableofContents module.
 * @module @massds/mayflower-react/TableofContents
 * @requires module:@massds/mayflower-assets/scss/03-organisms/table-of-contents-hierarchy
 */
import React from 'react';
import PropTypes from 'prop-types';
import airPropTypes from 'airbnb-prop-types';

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
    airPropTypes.componentWithName('ColoredHeading'),
    airPropTypes.componentWithName('SidebarHeading')
  ])
};

export default TableofContents;
