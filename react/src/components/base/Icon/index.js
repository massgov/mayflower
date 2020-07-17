/**
 * Icon module.
 * @module @massds/mayflower-react/Icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Icon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    svgWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    svgHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    classes: PropTypes.arrayOf(PropTypes.string),
    ariaHidden: PropTypes.bool,
    fill: PropTypes.string
  };

  static defaultProps = {
    title: null,
    classes: []
  }

  state = {
    content: null,
    loaded: null
  };

  loadAssets = (asset) => import(`./assets/${asset}.svg`);

  render() {
    const {
      svgWidth,
      svgHeight,
      title,
      name,
      classes,
      ariaHidden,
      ...rest
    } = this.props;
    // The promise will not be resolved until after render,
    // so re-render once the promise is finished by using state.
    this.loadAssets(name)
      .then(({ default: SVG }) => {
        if (SVG) {
          const attr = {
            width: svgWidth || null,
            height: svgHeight || null,
            className: (classes && classes.length > 0) ? classes.filter((c) => c).toString() : null,
            'aria-hidden': ariaHidden || null
          };
          // const content = (
          //   <svg {...attr} {...rest}>
          //     {title && <title>{title}</title>}
          //     <use xlinkHref={`#${name}`} fill={fill} />
          //   </svg>
          // );
          const content = <SVG {...attr} {...rest} />;
          if (this.state.loaded !== name) {
            this.setState({ loaded: name, content });
          }
        }
      });
    return this.state.content;
  }
}
