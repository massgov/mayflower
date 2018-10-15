import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class FootNote extends React.Component {
  handleScroll() {
    const element = document.getElementById(`footnoteref${this.props.index}`);
    element.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
  render() {
    const { children, index } = this.props;
    return(
      <div className="ma__footnote-item">
        <p id={`footnotemsg${index}`} onClick={() => this.handleScroll()}>
          <span classNames="ma__footnote-item-content">{`${index}. ${children}`}</span>
        </p>
      </div>
    )
  }
}

FootNote.propTypes = {
  /** Pair the FootNote molecule with the FootNoteLink. */
  /** The number/index of the footnote item. */
  /** If this is the second footnote on the page, `i` would be 2. */
  index: PropTypes.string
};

export default FootNote;
