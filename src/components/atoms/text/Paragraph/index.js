import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = (paragraph) => (
  <p dangerouslySetInnerHTML={{ __html: paragraph.text }} />
);

Paragraph.propTypes = {
  /** The text displayed. */
  text: PropTypes.string
};

Paragraph.defaultProps = {
  text: 'A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.'
};

export default Paragraph;
