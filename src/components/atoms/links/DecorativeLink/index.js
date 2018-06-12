import React from 'react';
import PropTypes from 'prop-types';

import SvgArrow from '../../icons/SvgArrow';
import SvgDocPdf from '../../icons/SvgDocPdf';
import SvgDocDocx from '../../icons/SvgDocDocx';
import SvgDocXlxs from '../../icons/SvgDocXlxs';
import './DecorativeLink.css';

const DecorativeLink = (props) => {
  const classes = ['ma__decorative-link'];
  let Icon = null;
  if (props.showFileIcon) {
    classes.push('ma__download-link');
    // eslint-disable-next-line no-bitwise
    const getFileExtension = (filename) => filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    const ext = getFileExtension(props.href);
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
      default:
        Icon = null;
    }
  }
  return(
    <span className={classes.join(' ')}>
      {Icon && <span><Icon />&nbsp;</span>}
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
