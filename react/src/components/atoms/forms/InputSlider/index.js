import React, { Component } from 'react';
import ReactInputSlider from 'react-input-slider';
import classNames from 'classnames';
import 'react-input-slider/dist/input-slider.css';
import Input from '../Input';
import Error from '../Input/error';
import { InputContext } from '../Input/context';
import './style.css';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
  }
  handleChange = (position) => {
    this.setState({ ...position });
  };
  render() {
    return(
      <React.Fragment>
        <InputContext.Consumer>
          {
            (context) => {
              const handleDragEnd = () => {
                let value;
                if (this.props.axis === 'x') {
                  value = this.state.x;
                } else if (this.props.axis === 'y') {
                  value = this.state.y;
                } else {
                  value = 0;
                }
                context.updateState({ value });
              };
              const risProps = {
                x: this.state.x,
                y: this.state.y,
                onChange: this.handleChange,
                onDragEnd: handleDragEnd,
                axis: this.props.axis,
                list: `InputSlider-datalist-${this.props.id}`
              };
              if (this.props.axis === 'x') {
                risProps.xmin = this.props.min;
                risProps.xmax = this.props.max;
              }
              if (this.props.axis === 'y') {
                risProps.ymin = this.props.min;
                risProps.ymax = this.props.max;
              }
              const classes = classNames({
                'ma__input-slider': true,
                'ma__input-slider-x': (this.props.axis === 'x'),
                'ma__input-slider-y': (this.props.axis === 'y')
              });
              return<ReactInputSlider className={classes} {...risProps} />;
            }
          }
        </InputContext.Consumer>
      </React.Fragment>
    );
  }
};

const InputSlider = (props) => {
  const {
    axis, max, min, step, width, height, ...inputProps
  } = props;
  const sliderProps = {
    axis, max, min, step, width, height
  };
  const { id } = inputProps;
  sliderProps.id = id;
  return(
    <Input {...inputProps}>
      <Slider {...sliderProps} />
      <Error id={id} />
      <datalist id={`InputSlider-datalist-${id}`}>
        <option value="0" label="0%" />
      </datalist>
    </Input>
  );
};

InputSlider.defaultProps = {
  defaultText: 0,
  width: 300,
  height: 300
};

export default InputSlider;
