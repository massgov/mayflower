import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import componentPropTypeCheck, { componentArrayPropTypeCheck } from '../../utilities/componentPropTypeCheck';
import './style.css';

class Teaser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  handleMouseEnter = () => {
    this.setState({ isActive: true });
    if (typeof this.props.setActiveHover === 'function') {
      this.props.setActiveHover(this.props.id);
    }
  };

  handleMouseLeave = () => {
    this.setState({ isActive: false });
    if (typeof this.props.clearActiveHover === 'function') {
      this.props.clearActiveHover();
    }
  };

  render() {
    const primaryInfoClass = classNames({
      'ma__general-teaser__primaryinfo__details': (this.props.left && !this.props.right),
      'ma__general-teaser__primaryinfo': !(this.props.left && !this.props.right)
    });
    const secondaryInfoClass = classNames({
      'ma__general-teaser__secondary': (!this.props.left && this.props.right),
      'ma__general-teaser__secondary--border': !(!this.props.left && this.props.right)
    });
    const teaserClass = classNames({
      'ma__general-teaser': true,
      'ma__general-teaser--active': (this.state.isActive)
    });
    const sectionProps = {
      className: teaserClass,
      onMouseEnter: () => this.handleMouseEnter(),
      onMouseLeave: () => this.handleMouseLeave()
    };
    return(
      <section {...sectionProps}>
        <div className="ma__general-teaser__details">
          {this.props.title && (
            <span className="ma__general-teaser__title">{this.props.title}</span>
          )}
          {(this.props.right || this.props.left) && (
            <div className="ma__general-teaser__moreinfo">
              {this.props.left && (
                <div className="ma__general-teaser__primary">
                  {this.props.left.map((info, infoKey) => (
                    <div key={infoKey} className={primaryInfoClass}>
                      {info}
                    </div>
                  ))}
                </div>
              )}
              {this.props.right && (
                <div className={secondaryInfoClass}>
                  {this.props.right.map((info, infoKey) => (
                    <div
                      key={infoKey}
                      className="ma__general-teaser__secondaryinfo"
                    >
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
  }
}

Teaser.propTypes = {
  /** A unique id for the teaser instance. */
  id: PropTypes.number,
  /** A function that runs after the mouse is no longer hovering over the component. */
  clearActiveHover: PropTypes.func,
  /** A function that runs when the mouse is hovering over the component. */
  setActiveHover: PropTypes.func,
  /** A DecorativeLink used to display the title. */
  title: (props, propName, componentName) =>
    componentPropTypeCheck(props, propName, componentName, 'DecorativeLink'),
  /** An array of components to be displayed under the title, on the left.
      Components that may be passed in the array: Link, ContactGroup. */
  left: (props, propName, componentName) => {
    if (props[propName]) {
      return componentArrayPropTypeCheck(props, propName, componentName, [
        'Link',
        'ContactGroup'
      ]);
    }
  },
  /** An array of components to be displayed under the title, on the right.
      If left is not set, this will display on the left side under the title instead.
      Components that may be passed in the array: DecorativeLink, OperationalHours, IconLink. */
  right: (props, propName, componentName) => {
    if (props[propName]) {
      return componentArrayPropTypeCheck(props, propName, componentName, [
        'DecorativeLink',
        'OperationalHours',
        'IconLink'
      ]);
    }
  }
};

export default Teaser;
