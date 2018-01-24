import React from 'react';

const Button = ({children, className, onClick}) => {
  const buttonClass = className || "ma__button";
  return (
    <button type="button" className={buttonClass} aria-label="" onClick={onClick}>{children}</button>
  );
};

export default Button;