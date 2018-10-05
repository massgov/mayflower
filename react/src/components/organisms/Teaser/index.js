import React from 'react';
import PropTypes from 'prop-types';
import componentPropTypeCheck, { componentArrayPropTypeCheck } from "../../utilities/componentPropTypeCheck";
import './style.css';

class Teaser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({ isActive: true });
    if (typeof this.props.setActiveHover === 'function') {
      this.props.setActiveHover(this.props.id)
    }
  };

  handleMouseLeave = () => {
    this.setState({ isActive: false });
    if (typeof this.props.clearActiveHover === 'function') {
      this.props.clearActiveHover()
    }
  };

  render() {
    const primaryInfoClass =
      this.props.left && !this.props.right
        ? 'ma__general-teaser__primaryinfo__details'
        : 'ma__general-teaser__primaryinfo';
    const secondaryInfoClass =
      !this.props.left && this.props.right
        ? 'ma__general-teaser__secondary'
        : 'ma__general-teaser__secondary--border';

    const teaserClass = this.state.isActive ? ' ma__general-teaser--active' : '';
    const sectionProps = {
      className: `ma__general-teaser${teaserClass}`,
      onMouseEnter: () => this.handleMouseEnter(),
      onMouseLeave: () => this.handleMouseLeave()
    };
    return (
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
  id: PropTypes.number,
  clearActiveHover: PropTypes.func,
  setActiveHover: PropTypes.func,
  title: (props, propName, componentName) =>
    componentPropTypeCheck(props, propName, componentName, 'DecorativeLink'),
  left: (props, propName, componentName) => {
    if (props[propName]) {
      return componentArrayPropTypeCheck(props, propName, componentName, [
        'Link',
        'ContactGroup'
      ]);
    }
  },
  right: (props, propName, componentName) => {
    if (props[propName]) {
      return componentArrayPropTypeCheck(props, propName, componentName, [
        'DecorativeLink',
        'OperationalHours',
        'IconLink'
      ]);
    }
  },
};

export default Teaser;
