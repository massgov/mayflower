import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = (paragraph) => (
  /* eslint-disable-next-line react/no-danger */
  <p className={paragraph.className} dangerouslySetInnerHTML={{ __html: paragraph.text || paragraph.children }} />
);

Paragraph.propTypes = {
  /** The text displayed. */
  text: PropTypes.string,
  /** A custom class. */
  className: PropTypes.string
};

export default Paragraph;
