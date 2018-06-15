import React from 'react';
import PropTypes from 'prop-types';

import SvgArrow from '../../icons/SvgArrow';
import SvgDocPdf from '../../icons/SvgDocPdf';
import SvgDocDocx from '../../icons/SvgDocDocx';
import SvgDocXlxs from '../../icons/SvgDocXlxs';
import SvgDocGeneric from '../../icons/SvgDocGeneric';
import './DecorativeLink.css';

const DecorativeLink = (props) => {
  const classes = ['ma__decorative-link'];
  let Icon = null;
  let title;
  if (props.showFileIcon) {
    classes.push('ma__download-link');
    // eslint-disable-next-line no-bitwise
    const getFileExtension = (filename) => filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    let ext = getFileExtension(props.href);
    title = `${ext} file`;
    const genericFile = ['csv', 'doc', 'docm', 'dot', 'dotx', 'dwg', 'geojson', 'gif', 'json', 'jpg', 'kml', 'kmz', 'mp3', 'mpp', 'msg', 'odf', 'ods', 'odt', 'png', 'pps', 'ppsx', 'potx', 'ppt', 'pptm', 'pptx', 'ppsm', 'prx', 'pub', 'rdf', 'rtf', 'tiff', 'tsv', 'txt', 'xls', 'xlsb', 'xlsm', 'xml', 'zip'];
    ext = genericFile.indexOf(ext) !== -1 ? 'generic' : ext;
    switch (ext) {
      case 'pdf':
        Icon = SvgDocPdf;
        break;
      case 'docx':
        Icon = SvgDocDocx;
        break;
      case 'xlxs':
        Icon = SvgDocXlxs;
        break;
      case 'generic':
        Icon = SvgDocGeneric;
        break;
      default:
        Icon = null;
    }
  }
  return(
    <span className={classes.join(' ')}>
      {Icon && <span><Icon title={title} />&nbsp;</span>}
      <a
        href={props.href}
        className="js-clickable-link"
        title={props.info}
      >{props.text}&nbsp;<SvgArrow />
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
  info: '',
  text: 'Lorem ipsum dolor sit amet',
  showFileIcon: false
};

export default DecorativeLink;
