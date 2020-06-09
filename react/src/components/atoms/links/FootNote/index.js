/**
 * FootNote module.
 * @module @massds/mayflower-react/FootNote
 * @requires module:@massds/mayflower-assets/scss/01-atoms/footnote
 */
import React from 'react';
import PropTypes from 'prop-types';

class FootNote extends React.Component {
  handleScroll() {
    const element = document.getElementsByClassName(`footnoteref${this.props.index}`)[0];
    element.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  render() {
    const { children, index } = this.props;
    return(
      <div className="ma__footnote-item">
        <button
          id={`footnotemsg${index}`}
          onClick={() => this.handleScroll()}
        >
          {/* eslint-disable-next-line react/no-danger */}
          <span className="ma__footnote-item-content" dangerouslySetInnerHTML={{ __html: `${index}. ${children}` }} />
        </button>
      </div>
    );
  }
}

FootNote.propTypes = {
  /** Pair the FootNote molecule with the FootNoteLink. */
  /** The number/index of the footnote item. */
  /** If this is the second footnote on the page, `i` would be 2. */
  index: PropTypes.string,
  children: PropTypes.node
};

export default FootNote;
