// @ts-nocheck
/**
 * FootNote module.
 * @module @massds/mayflower-react/FootNote
 * @requires module:@massds/mayflower-assets/scss/01-atoms/footnote
 */
import React from 'react';

export interface FootNoteProps {
  /** Pair the FootNote molecule with the FootNoteLink.
  The number/index of the footnote item.
  If this is the second footnote on the page, `i` would be 2. */
  index?: string
  children?: React.ReactNode
}

class FootNote extends React.Component<FootNoteProps> {
  handleScroll() {
    const element = document.getElementsByClassName(`footnoteref${this.props.index}`)[0];
    element.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  render() {
    const { children, index } = this.props;
    return(
      <div className="ma__footnote-item">
        <button
          type="button"
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

export default FootNote;
