import classNames from 'classnames';
import css from 'dom-helpers/style';
import React from 'react';
import PropTypes from 'prop-types';
import Transition, { EXITED, ENTERED, ENTERING, EXITING } from 'react-transition-group/Transition';

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
    value +
    parseInt(css(elem, margins[0]), 10) +
    parseInt(css(elem, margins[1]), 10)
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

  getDimension() {
    return(
      typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension
    );
  }

  // Expanding
  handleEnter(elem) {
    elem.style[this.getDimension()] = '0'; // eslint-disable-line no-param-reassign
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
    elem.style[this.getDimension()] = '0'; // eslint-disable-line no-param-reassign
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
      ...props
    } = this.props;

    const collapseStyles = {
      [EXITED]: 'collapsed',
      [EXITING]: 'collapsing',
      [ENTERING]: 'expanding',
      [ENTERED]: 'expanded'
    };

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
        {(state, innerProps) =>
          React.cloneElement(children, {
            ...innerProps,
            className: classNames(
              className,
              children.props.className,
              collapseStyles[state],
              this.getDimension() === 'width' && 'width'
            )
          })
        }
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
  className: PropTypes.string,
  children: PropTypes.node
};

Collapse.defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  dimension: 'height',
  getDimensionValue
};

export default Collapse;
