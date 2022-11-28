// @ts-nocheck
/**
 * Placeholder module.
 * @module @massds/mayflower-react/Placeholder
 */
import React from 'react';

export interface PlaceholderProps {
  /** Placeholder text to be displayed */
  text?: string
}

const Placeholder = (placeholder: PlaceholderProps) => {
  const sectionStyle = {
    color: '#bbb',
    minHeight: '200px',
    border: '4px dashed #ddd',
    fontSize: '2rem',
    lineHeight: '200px',
    textAlign: 'center'
  };
  return(
    <section className="ma__placeholder" style={sectionStyle}>
      {placeholder.text && (
        placeholder.text
      )}
    </section>
  );
};

export default Placeholder;
