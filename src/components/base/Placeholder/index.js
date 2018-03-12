import React from 'react';
import PropTypes from 'prop-types';

const Placeholder = (placeholder) => {
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

Placeholder.propTypes = {
  /** Placeholder text to be displayed */
  text: PropTypes.string
};

export default Placeholder;
