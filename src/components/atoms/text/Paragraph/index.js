import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = (paragraph) => {
  return(
    <p dangerouslySetInnerHTML={{__html: paragraph.text}}/>
  );
};

Paragraph.propTypes = {
  /** The paragraph text. */
  text: PropTypes.string
};

export default Paragraph;
