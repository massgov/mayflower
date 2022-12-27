/**
 * GenTeaserSearchBar module.
 * @module @massds/mayflower-react/GenTeaserSearchBar
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from 'react';
import PropTypes from 'prop-types';
import TeaserSearch from 'MayflowerReactGenTeaser/GenTeaserSearch';

/**
 * Search bar
 */
const GenTeaserSearchBar = (props) => {
  const { search, ...rest } = props;
  return(
    <div className="ma__gen-teaser__search" {...rest}>
      <TeaserSearch
        {...search}
      />
    </div>
  );
};

GenTeaserSearchBar.propTypes = {
  /**
   search:
   target: target url of the search bar
   id: id of the search bar
   queryInput: query input variable to replace in the target url with the user entered term
   placeholder: Placeholder text of the search bar.
   */
  search: PropTypes.shape(TeaserSearch.propTypes).isRequired
};

export default GenTeaserSearchBar;
