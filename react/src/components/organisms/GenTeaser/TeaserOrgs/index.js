/**
 * TeaserOrgs module.
 * @module @massds/mayflower-react/TeaserOrgs
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'MayflowerReactBase/Icon';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';

class TeaserOrgs extends React.Component {
  constructor(props) {
    super(props);
    const { orgs } = props;
    const allOrgs = orgs.split(',');
    this.state = {
      shouldTruncate: (allOrgs.length > 3),
      truncateOrgs: (allOrgs.length > 3),
      showAll: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { orgs } = nextProps;
    const allOrgs = orgs.split(',');
    this.setState({ shouldTruncate: (allOrgs.length > 3), truncateOrgs: (allOrgs.length > 3), showAll: false });
  }
  handleClick() {
    this.setState((prevState) => ({ showAll: !prevState.showAll, truncateOrgs: !prevState.truncateOrgs }));
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState((prevState) => ({ showAll: !prevState.showAll, truncateOrgs: !prevState.truncateOrgs }));
    }
  }
  render() {
    const { orgs } = this.props;
    const teaserOrgs = orgs.split(',');
    if (!this.state.shouldTruncate) {
      return<span className="ma__gen-teaser__org">{teaserOrgs.join(', ')}</span>;
    }
    const shownOrgs = teaserOrgs.slice(0, 3);
    const hiddenOrgs = teaserOrgs.slice(3);
    const toggleProps = {
      classes: ['ma__gen-teaser__org__show-more', `${!this.state.truncateOrgs ? 'show-fewer' : ''}`],
      onClick: (e) => this.handleClick(e),
      onKeyPress: (e) => this.handleKeyPress(e),
      text: (this.state.truncateOrgs) ? ` & ${hiddenOrgs.length} more` : ' Show fewer',
      theme: 'c-primary',
      usage: 'quaternary-simple',
      capitalized: true,
      expanded: this.state.showAll,
      icon: <Icon name="chevron" svgWidth={16} svgHeight="16" />
    };
    const toggle = <ButtonWithIcon {...toggleProps} />;
    const displayedOrgs = (this.state.showAll) ? teaserOrgs.join(', ') : shownOrgs.join(', ');
    return(
      <span className="ma__gen-teaser__org">
        { displayedOrgs }{toggle}
      </span>);
  }
}

TeaserOrgs.propTypes = {
  /** A comma seperate list of organizations. */
  orgs: PropTypes.string.isRequired
};

export default TeaserOrgs;
