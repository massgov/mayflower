import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const AccordionWrapper = (props) => {
  const children = props.children;
  return(
    <div className="ma__accordion-wrapper">
      { React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type.name === 'AccordionItem') {
          const clone = React.cloneElement(child, {
            secondary: props.secondary,
            emphasize: props.emphasize,
            border: props.border,
            headerLevel: props.headerLevel
          });
          return clone;
        }
        return(
          /* eslint-disable no-console */
          console.log(`Warning! You cannot pass a ${child.type.name} child to AccordionWrapper`)
        );
      })}
    </div>
  );
};

AccordionWrapper.propTypes = {
  /** Only AccordionItem can be passed as a Child to the AccordionWrapper */
  children: PropTypes.node.isRequired,
  /** Whether accordion children are emphasized or not. */
  emphasize: PropTypes.bool,
  /** Whether accordion children are with border or not. */
  border: PropTypes.bool,
  /** Whether accordion is a primary or secondary accordion. */
  secondary: PropTypes.bool,
  /** The heading levels of children accordion */
  headerLevel: PropTypes.number
};

AccordionWrapper.defaultProps = {
  border: true,
  emphasize: true,
  secondary: false,
  headerLevel: 2
};

export default AccordionWrapper;
