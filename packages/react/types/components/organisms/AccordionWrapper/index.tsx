// @ts-nocheck
/**
 * AccordionWrapper module.
 * @module @massds/mayflower-react/AccordionWrapper
 * @requires module:@massds/mayflower-assets/scss/03-organisms/accordion-wrapper
 */
import React from 'react';

export interface AccordionWrapperProps {
  /** Only AccordionItem can be passed as a Child to the AccordionWrapper */
  children?: React.ReactElement | React.ReactElement[]
  /** Whether accordion children are emphasized or not. */
  emphasize?: boolean
  /** Whether accordion children are with border or not. */
  border?: boolean
  /** Whether accordion is a primary or secondary accordion. */
  secondary?: boolean
  /** The heading levels of children accordion */
  headerLevel?: number
}

const AccordionWrapper = (props: AccordionWrapperProps) => {
  const children = props.children;
  return (
    (<div className="ma__accordion-wrapper">
      { React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const clone = React.cloneElement(child, {
            secondary: props.secondary,
            emphasize: props.emphasize,
            border: props.border,
            headerLevel: props.headerLevel
          });
          return clone;
        }
        return (
          /* eslint-disable-next-line no-console */
          (console.warn('Warning! You can only pass an AccordionItem child to AccordionWrapper.'))
        );
      })}
    </div>)
  );
};

AccordionWrapper.defaultProps = {
  border: true,
  emphasize: true,
  secondary: false,
  headerLevel: 2
};

export default AccordionWrapper;
