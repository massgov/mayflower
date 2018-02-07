import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = paragraph => (
  <p dangerouslySetInnerHTML={{ __html: paragraph.text }} />
);

Paragraph.propTypes = {
  /** The text displayed. */
  text: PropTypes.string
};

export default Paragraph;
