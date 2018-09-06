import React from 'react';
import PropTypes from 'prop-types';

const Grid = (grid) => {
  return(
    <div className="ma__grid ma__grid--show">
      <div className="ma__grid-row">
        <div className="ma__grid-col-1">col-1</div>
        <div className="ma__grid-col-2">col-2</div>
        <div className="ma__grid-col-3">col-3</div>
        <div className="ma__grid-col-6">col-6</div>
      </div>
      <div className="ma__grid-row">
        <div className="ma__grid-col-4 ma__grid-col-md-2">col-4</div>
        <div className="ma__grid-col-4 ma__grid-col-md-2">col-4</div>
        <div className="ma__grid-col-4 ma__grid-col-md-2">col-4</div>
      </div>
    </div>
  );
};

Grid.propTypes = {
  /** Grid text to be displayed */
  text: PropTypes.string
};

export default Grid;
