/**
 * Collapse module.
 * @module @massds/mayflower-react/Collapse
 */
import classNames from 'classnames';
import css from 'dom-helpers/style';
import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

function capitalize(string) {
  return(
    `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  );
}

function getDimensionValue(dimension, elem) {
  const MARGINS = {
    height: ['marginTop', 'marginBottom'],
    width: ['marginLeft', 'marginRight']
  };
  const value = elem[`offset${capitalize(dimension)}`];
  const margins = MARGINS[dimension];

  return(
    value
    + parseInt(css(elem, margins[0]), 10)
    + parseInt(css(elem, margins[1]), 10)
  );
}

function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}

/** The following animation component was implemented following the same logic/strucure
 *  as React-Bootstrap's Collapse component.
 *  (https://react-bootstrap.github.io/utilities/transitions/#transitions-collapse)
*/

class Collapse extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEntering = this.handleEntering.bind(this);
    this.handleEntered = this.handleEntered.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleExiting = this.handleExiting.bind(this);
  }

  // Expanding
  handleEnter(elem) {
    const { minDimension } = this.props;
    const dimension = this.getDimension();
    const currentDim = parseInt(css(elem, dimension), 10);
    const setDim = (minDimension <= currentDim) ? minDimension : currentDim;
    elem.style[dimension] = `${setDim}px`; // eslint-disable-line no-param-reassign
    elem.style[`max${capitalize(dimension)}`] = 'none'; // eslint-disable-line no-param-reassign
  }

  handleEntering(elem) {
    const dimension = this.getDimension();
    elem.style[dimension] = `${elem[`scroll${capitalize(dimension)}`]}px`; // eslint-disable-line no-param-reassign
  }

  handleEntered(elem) {
    elem.style[this.getDimension()] = null; // eslint-disable-line no-param-reassign
  }

  // Collapsing
  handleExit(elem) {
    const dimension = this.getDimension();
    elem.style[dimension] = `${this.props.getDimensionValue(dimension, elem)}px`; // eslint-disable-line no-param-reassign
    triggerBrowserReflow(elem);
  }

  handleExiting(elem) {
    const { minDimension } = this.props;
    const dimension = this.getDimension();
    const currentDim = parseInt(css(elem, dimension), 10);
    const setDim = (minDimension <= currentDim) ? minDimension : currentDim;
    elem.style[dimension] = `${setDim}px`; // eslint-disable-line no-param-reassign
  }

  getDimension() {
    return(
      typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension
    );
  }

  render() {
    const {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      className,
      children,
      minDimension,
      minDimensionOnMount,
      ...props
    } = this.props;

    const collapseStyles = {
      exited: 'collapsed',
      exiting: 'collapsing',
      entering: 'expanding',
      entered: 'expanded'
    };

    const dimension = this.getDimension();

    delete props.dimension;
    delete props.getDimensionValue;
    return(
      <Transition
        {...props}
        aria-expanded={props.role ? props.in : null}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
      >
        {(state, innerProps) => React.cloneElement(children, {
          ...innerProps,
          style: {
            [`max${capitalize(dimension)}`]: minDimensionOnMount ? `${minDimension}px` : 'none'
          },
          className: classNames(
            className,
            children.props.className,
            collapseStyles[state],
            dimension === 'width' && 'width'
          )
        })}
      </Transition>
    );
  }
}

Collapse.propTypes = {
  /** Show the component; triggers the expand or collapse animation */
  in: PropTypes.bool,
  /** Wait until the first "enter" transition to mount the component (add it to the DOM) */
  mountOnEnter: PropTypes.bool,
  /** Unmount the component (remove it from the DOM) when it is collapsed */
  unmountOnExit: PropTypes.bool,
  /** Run the expand animation when the component mounts, if it is initially shown */
  appear: PropTypes.bool,
  /** Duration of the collapse animation in milliseconds */
  timeout: PropTypes.number,
  /** Callback fired before the component expands */
  onEnter: PropTypes.func,
  /** Callback fired after the component starts to expand */
  onEntering: PropTypes.func,
  /** Callback fired after the component has expanded */
  onEntered: PropTypes.func,
  /** Callback fired before the component collapses */
  onExit: PropTypes.func,
  /** Callback fired after the component starts to collapse */
  onExiting: PropTypes.func,
  /** Callback fired after the component has collapsed */
  onExited: PropTypes.func,
  /** The dimension used when collapsing, or a function that returns the dimension */
  dimension: PropTypes.oneOfType([
    PropTypes.oneOf(['height', 'width']),
    PropTypes.func
  ]),
  /** Function that returns the height or width of the animating DOM node Allows for providing some custom
   * logic for how much the Collapse component should animate in its specified dimension. Called with
   * the current dimension prop value and the DOM node. */
  getDimensionValue: PropTypes.func,
  /** ARIA role of collapsible element */
  role: PropTypes.string,
  /** classNames for direct children */
  className: PropTypes.string,
  /** child node */
  children: PropTypes.node,
  /** The minimum dimension, height or width, that you want the animation to collapse to.
   *  This should be in number of pixels (i.e. pass 200 if you want it to collapse to a height of 200px.
      The default value is 0. */
  minDimension: PropTypes.number,
  /** Whether you want to set the minimum height of the child on its initial mount */
  minDimensionOnMount: PropTypes.bool
};

Collapse.defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: true,
  dimension: 'height',
  getDimensionValue,
  minDimension: 0,
  minDimensionOnMount: false
};

export default Collapse;
