import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const AccordionWrapper = (props) => {
  const children = props.children;
  return(
    <div className="ma__accordion-wrapper">
      { React.Children.map(children, (child) => {
        if (child.type.name === 'AccordionItem') {
          return child;
        }
        return(
          /* eslint-disable no-console */
          console.log(`Warning! You cannot pass a ${child.type.name} child to AccordionWrapper`)
          /* eslint-disable no-console */
        );
      })}
    </div>
  );
};

AccordionWrapper.propTypes = {
  /** Only AccordionItem can be passed as a Child to the AccordionWrapper */
  children: PropTypes.node.isRequired
};

export default AccordionWrapper;
