import React from 'react';
import PropTypes from 'prop-types';

// Loads all SVGs within the assets directory
const req = require.context('!svg-sprite-loader!./assets', true, /.svg$/);
function loadAssets(asset) {
  let file;
  req
    .keys()
    .filter((filename) => filename.indexOf(`${asset}.svg`) > -1)
    .forEach((filename) => {
      file = req(filename);
    });
  return file;
}

class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svgFile: null
    };
  }
  componentWillMount() {
    const svgFile = loadAssets(this.props.name);
    this.setState({ svgFile });
  }
  render() {
    const { svgFile } = this.state;
    const {
      svgWidth,
      svgHeight,
      title,
      name,
      classes
    } = this.props;
    if (svgFile) {
      const attr = {
        width: svgWidth || null,
        height: svgHeight || null,
        className: classes ? classes.join(' ') : null
      };
      return(
        <svg {...attr}>
          {title && <title>{ title }</title> }
          <use xlinkHref={`#${name}`} />
        </svg>
      );
    }
    return null;
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
  classes: PropTypes.arrayOf(PropTypes.string)
};

Icon.defaultProps = {
  title: null
};

export default Icon;
