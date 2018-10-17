import React from 'react';
import PropTypes from 'prop-types';

class FootNoteLink extends React.Component {
  handleScroll() {
    const element = document.getElementById(`footnotemsg${this.props.index}`);
    element.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
  render() {
    const { index } = this.props;
    return(
      <a
        id={`footnoteref${index}`}
        href={`#footnotemsg${index}`}
        className="ma__footnote-link"
        aria-describedby={`footnotemsg${index}`}
        aria-label="see footnote"
        onClick={() => this.handleScroll()}
      >
        <sup>[{index}]</sup>
      </a>
    );
  }
}

FootNoteLink.propTypes = {
  /** Pair the FootNoteLink molecule with the FootNote. */
  /** The number/index of the footnote item you are referencing. */
  /** If this is the second footnote on the page, `i` would be 2. */
  index: PropTypes.string
};

export default FootNoteLink;
