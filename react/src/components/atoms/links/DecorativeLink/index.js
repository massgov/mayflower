import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../../icons/Icon';
import './style.css';

const DecorativeLink = (props) => {
  const classes = classNames({
    'ma__decorative-link': true,
    'ma__download-link': props.showFileIcon
  });
  let decIcon = null;
  let title;
  if (props.showFileIcon) {
    // eslint-disable-next-line no-bitwise
    const getFileExtension = (filename) => filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    let ext = getFileExtension(props.href);
    title = `${ext} file`;
    const genericFile = ['csv', 'doc', 'docm', 'dot', 'dotx', 'dwg', 'geojson', 'gif', 'json', 'jpg', 'kml', 'kmz', 'mp3', 'mpp', 'msg', 'odf', 'ods', 'odt', 'png', 'pps', 'ppsx', 'potx', 'ppt', 'pptm', 'pptx', 'ppsm', 'prx', 'pub', 'rdf', 'rtf', 'tiff', 'tsv', 'txt', 'xls', 'xlsb', 'xlsm', 'xml', 'zip'];
    ext = genericFile.indexOf(ext) !== -1 ? 'generic' : ext;
    switch (ext) {
      case 'pdf':
        decIcon = <Icon name="pdf" title={title} svgWidth={35} svgHeight={36} />;
        break;
      case 'docx':
        decIcon = <Icon name="docx" title={title} svgWidth={35} svgHeight={36} />;
        break;
      case 'xlxs':
        decIcon = <Icon name="xlxs" title={title} svgWidth={35} svgHeight={36} />;
        break;
      case 'generic':
        decIcon = <Icon name="generic" title={title} svgWidth={35} svgHeight={36} />;
        break;
      default:
        decIcon = null;
    }
  }
  return(
    <span className={classes}>
      <a
        href={props.href}
        title={props.info || null}
      >
        {decIcon && <span className="ma__download-link--icon">{decIcon}&nbsp;</span>}{props.text}&nbsp;<Icon name="arrow" aria-hidden="true" />
      </a>
    </span>
  );
};

DecorativeLink.propTypes = {
  href: PropTypes.string,
  info: PropTypes.string,
  text: PropTypes.string,
  showFileIcon: PropTypes.bool
};

DecorativeLink.defaultProps = {
  href: '#',
  text: 'Lorem ipsum dolor sit amet',
  showFileIcon: false
};

export default DecorativeLink;
