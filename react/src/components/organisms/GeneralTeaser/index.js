import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../../index';
import './style.css';

class TeaserOrg extends Component {
  constructor(props) {
    super(props);
    const allOrgs = props.orgs.split(',');
    this.state = {
      shouldTruncate: (allOrgs.length > 3),
      truncateOrgs: (allOrgs.length > 3),
      showAll: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    if (process.env.NODE_ENV === 'development') {
      /* eslint-disable-next-line no-console */
      console.warn('This component is deprecated and will be archived in v10. Use the GenTeaser Organism instead.');
    }
  }
  componentWillReceiveProps(nextProps) {
    const allOrgs = nextProps.orgs.split(',');
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
      return<span className="ma__general-teaser__org">{teaserOrgs.join(', ')}</span>;
    }
    const shownOrgs = teaserOrgs.slice(0, 3);
    const hiddenOrgs = teaserOrgs.slice(3);
    const toggleText = (this.state.truncateOrgs) ? ` & ${hiddenOrgs.length} more` : ' Show fewer';
    const toggleProps = {
      role: 'button',
      tabIndex: 0,
      style: { color: '#14558f', cursor: 'pointer' },
      className: 'ma__general-teaser__org__show-more',
      onClick: (e) => this.handleClick(e),
      onKeyPress: (e) => this.handleKeyPress(e)
    };
    if (!this.state.truncateOrgs) {
      toggleProps.className += ' show-fewer';
    }
    const toggle = <span {...toggleProps}>{toggleText} <Icon name="chevron" svgWidth="16" svgHeight="16" /></span>;
    const displayedOrgs = (this.state.showAll) ? teaserOrgs.join(', ') : shownOrgs.join(', ');
    return(
      <span className="ma__general-teaser__org">
        { displayedOrgs }{toggle}
      </span>);
  }
}
TeaserOrg.propTypes = {
  orgs: PropTypes.string
};

const GeneralTeaser = (generalTeaser) => {
  const imageClass = generalTeaser.image ? 'ma__general-teaser ma__general-teaser--image' : 'ma__general-teaser';
  const Element = `h${generalTeaser.level || 2}`;
  const secondaryInfoClass = (!generalTeaser.primaryInfo && generalTeaser.secondaryInfo) ? 'ma__general-teaser__secondary' : 'ma__general-teaser__secondary--border';
  return(
    <section className={imageClass}>
      { generalTeaser.image && generalTeaser.image.src && (
        <a
          className="ma__general-teaser__image"
          href={generalTeaser.title.href}
          title={generalTeaser.title.text}
        >
          <span
            aria-label={generalTeaser.image.alt}
            role="img"
            style={{ backgroundImage: `url(${generalTeaser.image.src})` }}
          />
        </a>
      )}
      <div className="ma__general-teaser__details">
        { generalTeaser.eyebrow && (
          <div className="ma__general-teaser__eyebrow">
            <span>{generalTeaser.eyebrow}</span>
          </div>
        )}
        <Element className="ma__general-teaser__title">
          {generalTeaser.title}
        </Element>
        { (generalTeaser.date || generalTeaser.org) && (
          <div className="ma__general-teaser__details">
            { generalTeaser.date && (
              <span className="ma__general-teaser__date">{generalTeaser.date}</span>
            )}
            { generalTeaser.org && <TeaserOrg orgs={generalTeaser.org} /> }
          </div>
        )}
        { generalTeaser.description && (
          <div className="ma__general-teaser__description">
            {generalTeaser.description}
          </div>
        )}
        { generalTeaser.subLinks && (
          <div className="ma__general-teaser__sublink">
            { generalTeaser.subLinks.map((sublink) => sublink)}
          </div>
        )}
        { (generalTeaser.secondaryInfo || generalTeaser.primaryInfo) && (
          <div className="ma__general-teaser__moreinfo">
            { generalTeaser.primaryInfo && (
              <div className="ma__general-teaser__pimaryinfo">
                {generalTeaser.primaryInfo}
              </div>
            )}
            { generalTeaser.secondaryInfo && (
              <div className={secondaryInfoClass}>
                { generalTeaser.secondaryInfo.map((info, infoKey) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={infoKey} className="ma__general-teaser__secondaryinfo">
                    {info}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

GeneralTeaser.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string
  }),
  eyebrow: PropTypes.string,
  // eslint-disable-next-line consistent-return
  title: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (!comp) {
        return false;
      }
      if (typeof comp.type === 'string') {
        return comp.type === 'DecorativeLink';
      }
      return comp.type.name && comp.type.name === 'DecorativeLink';
    };
    if (!isValid(component)) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
    }
  },
  level: PropTypes.number,
  date: PropTypes.string,
  org: PropTypes.string,
  // eslint-disable-next-line consistent-return
  description: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (!comp) {
        return false;
      }
      if (typeof comp.type === 'string') {
        return comp.type === 'Paragraph';
      }
      return comp.type.name && comp.type.name === 'Paragraph';
    };
    if (component && !isValid(component)) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
    }
  },
  // eslint-disable-next-line consistent-return
  subLinks: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (!comp) {
        return false;
      }
      if (!Array.isArray(comp)) {
        return false;
      }
      let valid = false;
      comp.every((child) => {
        if (!child) {
          return valid;
        }
        if (typeof child.type === 'string') {
          valid = child.type === 'DecorativeLink';
        }
        valid = child.type.name && child.type.name === 'DecorativeLink';
        return valid;
      });
      return valid;
    };
    if (component && !isValid(component)) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
    }
  },
  // eslint-disable-next-line consistent-return
  primaryInfo: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (!comp) {
        return false;
      }
      if (typeof comp.type === 'string') {
        return comp.type === 'ContactGroup';
      }
      return comp.type.name && comp.type.name === 'ContactGroup';
    };
    if (component && !isValid(component)) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
    }
  },
  // eslint-disable-next-line consistent-return
  secondaryInfo: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (!comp) {
        return false;
      }
      if (!Array.isArray(comp)) {
        return false;
      }
      let valid = false;
      comp.every((child) => {
        if (!child) {
          return valid;
        }
        if (typeof child.type === 'string') {
          valid = child.type === 'IconLink';
        }
        valid = child.type.name && child.type.name === 'IconLink';
        return valid;
      });
      return valid;
    };
    if (component && !isValid(component)) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
    }
  }
};

GeneralTeaser.defaultProps = {
  subLinks: null,
  secondaryInfo: null,
  primaryInfo: null,
  description: null
};

export default GeneralTeaser;
