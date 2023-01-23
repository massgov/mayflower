/**
 * GenTeaserDate module.
 * @module @massds/mayflower-react/GenTeaserDate
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Date
 */
const GenTeaserDate = (props) => {
  const { date, children, ...rest } = props;
  return(
    <span className="ma__gen-teaser__date" {...rest}>
      {children || date}
    </span>
  );
};

GenTeaserDate.propTypes = {
  /** Either a formatted date or a formatted date with a label */
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** React children to render */
  children: PropTypes.node
};

export default GenTeaserDate;
