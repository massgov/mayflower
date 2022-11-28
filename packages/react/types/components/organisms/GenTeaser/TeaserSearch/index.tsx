// @ts-nocheck
/**
 * TeaserSearch module.
 * @module @massds/mayflower-react/TeaserSearch
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import HeaderSearch from 'MayflowerReactMolecules/HeaderSearch';

export interface TeaserSearchProps {
  /** The target url of the search bar */
  target: string
  /** The id of the search bar */
  id: string
  /** The query input variable to replace in the target url with the user entered term */
  queryInput: string
  /** Placeholder text of the search bar. */
  placeholder: string
}

class TeaserSearch extends React.Component<TeaserSearchProps> {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  onClick = (e) => {
    e.preventDefault();
    const { target, queryInput } = this.props;
    const query = this.inputRef.current.value;
    if (query.length > 0) {
      const searchURL = queryInput ? target.replace(`{${queryInput}}`, query) : target;
      this.redirect(searchURL);
    }
  }

  redirect = (searchURL) => {
    if (window.location !== window.parent.location) {
      window.parent.location.assign(searchURL);
    } else {
      window.location.assign(searchURL);
    }
  }

  render() {
    const {
      placeholder, id, queryInput, ...rest
    } = this.props;
    return(
      <HeaderSearch
        buttonSearch={{
          'aria-label': '',
          onClick: (e) => this.onClick(e),
          text: 'Search',
          usage: ''
        }}
        defaultText=""
        id={id}
        label="Search terms"
        onSubmit={(e) => this.onSubmit(e)}
        inputRef={this.inputRef}
        placeholder={placeholder}
        {...rest}
      />
    );
  }
}

export default TeaserSearch;
