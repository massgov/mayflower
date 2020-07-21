/**
 * DecorativeLink module.
 * @module @massds/mayflower-react/DecorativeLink
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Pdf from 'MayflowerReactBase/Icon/Pdf';
import Docx from 'MayflowerReactBase/Icon/Docx';
import Xlxs from 'MayflowerReactBase/Icon/Xlxs';
import Generic from 'MayflowerReactBase/Icon/Generic';
import Arrow from 'MayflowerReactBase/Icon/Arrow';

const DecorativeLink = (props) => {
  const {
    showFileIcon, className, href, info, text, details, icon, ...rest
  } = props;
  const classes = classNames({
    'ma__decorative-link': true,
    'ma__download-link': showFileIcon,
    [props.className]: className
  });
  let decIcon = null;
  let title;
  if (showFileIcon) {
    // eslint-disable-next-line no-bitwise
    const getFileExtension = (filename) => filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    let ext = getFileExtension(href);
    title = `${ext} file`;
    const genericFile = ['csv', 'doc', 'docm', 'dot', 'dotx', 'dwg', 'geojson', 'gif', 'json', 'jpg', 'kml', 'kmz', 'mp3', 'mpp', 'msg', 'odf', 'ods', 'odt', 'png', 'pps', 'ppsx', 'potx', 'ppt', 'pptm', 'pptx', 'ppsm', 'prx', 'pub', 'rdf', 'rtf', 'tiff', 'tsv', 'txt', 'xls', 'xlsb', 'xlsm', 'xml', 'zip'];
    ext = genericFile.indexOf(ext) !== -1 ? 'generic' : ext;
    switch (ext) {
      case 'pdf':
        decIcon = <Pdf title={title} width={35} height={36} />;
        break;
      case 'docx':
        decIcon = <Docx title={title} width={35} height={36} />;
        break;
      case 'xlxs':
        decIcon = <Xlxs title={title} width={35} height={36} />;
        break;
      case 'generic':
        decIcon = <Generic title={title} width={35} height={36} />;
        break;
      default:
        decIcon = null;
    }
  }
  return(
    <span className={classes}>
      <a
        {...rest}
        href={href}
        title={info || null}
      >
        {decIcon && (
        <span className="ma__download-link--icon">
          {decIcon}
&nbsp;
        </span>
        )}
        {text}
        {details && (
        <span className="ma__decorative-link__details">
          &nbsp;
          {details}
        </span>
        )}
        &nbsp;
        {icon || <Arrow aria-hidden="true" />}
      </a>
    </span>
  );
};

DecorativeLink.propTypes = {
  href: PropTypes.string,
  info: PropTypes.string,
  text: PropTypes.string,
  showFileIcon: PropTypes.bool,
  className: PropTypes.string,
  details: PropTypes.string,
  icon: PropTypes.elementType
};

DecorativeLink.defaultProps = {
  href: '#',
  text: 'Lorem ipsum dolor sit amet',
  showFileIcon: false
};

export default DecorativeLink;
