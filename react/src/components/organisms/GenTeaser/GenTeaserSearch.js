import React from 'react';
import PropTypes from 'prop-types';
import HeaderSearch from '../../molecules/HeaderSearch';

class GenTeaserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  onChange = (term) => {
    this.setState({
      query: term
    });
  }

  onClick = (e) => {
    e.preventDefault();
    const { target, queryInput } = this.props;
    const { query } = this.state;
    if (query.length > 0) {
      const searchURL = queryInput ? target.replace(`{${queryInput}}`, this.state.query) : target;
      this.redirect(searchURL);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { target, queryInput } = this.props;
    const { query } = this.state;
    if (query.length > 0) {
      const searchURL = queryInput ? target.replace(`{${queryInput}}`, this.state.query) : target;
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
    const { placeholder, id, ...rest } = this.props;
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
        onChange={(term) => this.onChange(term)}
        onSubmit={(e) => this.onSubmit(e)}
        placeholder={placeholder}
        {...rest}
      />
    );
  }
}

GenTeaserSearch.propTypes = {
  /** The target url of the search bar */
  target: PropTypes.string.isRequired,
  /** The id of the search bar */
  id: PropTypes.string.isRequired,
  /** The query input variable to replace in the target url with the user entered term */
  queryInput: PropTypes.string.isRequired,
  /** Placeholder text of the search bar. */
  placeholder: PropTypes.string.isRequired
};

export default GenTeaserSearch;
