import React from 'react';
import PropTypes from 'prop-types';

const Table = (props) => {
  const raw = {
    __html: props.text
  };
  return(
    <p dangerouslySetInnerHTML={raw} />
  );
};

Table.propTypes = {
  head: PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.shape({
      rowSpanOffset: PropTypes.bool,
      cells: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.bool.isRequired,
        colspan: PropTypes.string,
        rowspan: PropTypes.string,
        text: PropTypes.string.isRequired
      }))
    }))
  }),
  bodies: PropTypes.arrayOf(PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.shape({
      rowSpanOffset: PropTypes.bool,
      cells: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.bool.isRequired,
        colspan: PropTypes.string,
        rowspan: PropTypes.string,
        text: PropTypes.string.isRequired
      }))
    }))
  }))
};

Table.defaultProps = {
};

export default Table;
