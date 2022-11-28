// @ts-nocheck
import React from 'react';

export interface IconLinkProps {
  icon?: React.ReactElement
  link?: React.ReactElement
  wrapperClasses?: string[]
}

const IconLink = (props: IconLinkProps) => (
  <span className={props.wrapperClasses.join(' ')}>
    {props.icon && (
    <>
      {props.icon}
      <span>&nbsp;&nbsp;</span>
    </>
    )}
    {props.link}
  </span>
);

IconLink.defaultProps = {
  wrapperClasses: []
};

export default IconLink;
