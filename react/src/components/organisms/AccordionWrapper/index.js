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
        console.log(`Warning! You cannot pass a ${child.type.name} child to AccordionWrapper`)
        );
      })}
    </div>
  );
};

AccordionWrapper.propTypes = {
  /** Accordion items passed to the wrapper */
  children: PropTypes.node.isRequired
};

export default AccordionWrapper;
