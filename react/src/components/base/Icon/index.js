import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

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

  constructor(props) {
    super(props);
    this.state = {
      content: null,
      loaded: null
    };
    this._isMounted = false;
  }


  componentDidMount() {
    this._isMounted = true;
    const {
      svgWidth,
      svgHeight,
      title,
      name,
      classes,
      ariaHidden,
      fill,
      ...rest
    } = this.props;

    if (this._isMounted) {
      this.loadAssets(name)
        .then(({ default: SVG }) => {
          if (SVG && SVG.content) {
            const attr = {
              width: svgWidth || null,
              height: svgHeight || null,
              className: (classes && classes.length > 0) ? classes.filter((c) => c).toString() : null,
              'aria-hidden': ariaHidden || null
            };
            const content = (
              <svg {...attr} {...rest} >
                {title && <title>{title}</title>}
                <use xlinkHref={`#${name}`} fill={fill} />
              </svg>
            );
            if (this.state.loaded !== name) {
              this.setState({ loaded: name, content });
            }
          }
        });
    }
  }

  componentWillUnmount() {
    console.log('unmount')
    this._isMounted = false;
  }

  loadAssets = (asset) => import(/* webpackChunkName: "svg-icons" */ /* webpackMode: "lazy-once" */`!svg-sprite-loader!./assets/${asset}.svg`);

  render() {
    // The promise will not be resolved until after render,
    // so re-render once the promise is finished by using state.
    return this.state.content;
  }
}
