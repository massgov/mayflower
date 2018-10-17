import React from 'react';
import PropTypes from 'prop-types';

const FootNoteLink = (props) => (
  <a
    id={`footnoteref${props.index}`}
    href={`#footnotemsg${props.index}`}
    className="ma__footnote-link"
    aria-describedby={`footnotemsg${props.index}`}
    aria-label="see footnote"
  >
    <sup>[{props.index}]</sup>
  </a>
);

FootNoteLink.propTypes = {
  /** Pair the FootNoteLink molecule with the FootNote. */
  /** The number/index of the footnote item you are referencing. */
  /** If this is the second footnote on the page, `i` would be 2. */
  index: PropTypes.string
};

export default FootNoteLink;
