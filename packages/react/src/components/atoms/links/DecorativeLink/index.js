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

// eslint-disable-next-line import/no-unresolved
import IconDocPdf from 'MayflowerReactBase/Icon/IconDocPdf';
// eslint-disable-next-line import/no-unresolved
import IconDocDocx from 'MayflowerReactBase/Icon/IconDocDocx';
// eslint-disable-next-line import/no-unresolved
import IconDocXlsx from 'MayflowerReactBase/Icon/IconDocXlsx';
// eslint-disable-next-line import/no-unresolved
import IconDocGeneric from 'MayflowerReactBase/Icon/IconDocGeneric';
// eslint-disable-next-line import/no-unresolved
import IconArrow from 'MayflowerReactBase/Icon/IconArrow';
// eslint-disable-next-line import/no-unresolved
import IconDownload from 'MayflowerReactBase/Icon/IconDownload';

const DecorativeLink = (props) => {
  const {
    showFileIcon, className, href, info, text, details, icon, fileIcon, ...rest
  } = props;
  const classes = classNames({
    'ma__decorative-link': true,
    'ma__download-link': showFileIcon,
    [props.className]: className
  });
  let preIcon;
  let title;
  let postIcon = <IconArrow aria-hidden="true" />;
  if (showFileIcon) {
    // eslint-disable-next-line no-bitwise
    const getFileExtension = (filename) => filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    let ext = getFileExtension(href);
    title = `${ext} file`;
    const genericFile = ['csv', 'doc', 'docm', 'dot', 'dotx', 'dwg', 'geojson', 'gif', 'json', 'jpg', 'kml', 'kmz', 'mp3', 'mpp', 'msg', 'odf', 'ods', 'odt', 'png', 'pps', 'ppsx', 'potx', 'ppt', 'pptm', 'pptx', 'ppsm', 'prx', 'pub', 'rdf', 'rtf', 'tiff', 'tsv', 'txt', 'xls', 'xlsb', 'xlsm', 'xml', 'zip'];
    ext = genericFile.indexOf(ext) !== -1 ? 'generic' : ext;
    postIcon = <IconDownload aria-hidden="true" />;
    switch (ext) {
      case 'pdf':
        preIcon = <IconDocPdf title={title} width={35} height={36} />;
        break;
      case 'docx':
        preIcon = <IconDocDocx title={title} width={35} height={36} />;
        break;
      case 'xlxs':
        preIcon = <IconDocXlsx title={title} width={35} height={36} />;
        break;
      case 'generic':
        preIcon = <IconDocGeneric title={title} width={35} height={36} />;
        break;
      default:
        preIcon = null;
        postIcon = <IconArrow aria-hidden="true" />;
    }
  }
  return(
    <span className={classes}>
      <a
        {...rest}
        href={href}
        title={info || null}
      >
        {(fileIcon || preIcon) && (
        <span className="ma__download-link--icon">
          {fileIcon || preIcon}
          <span>&nbsp;</span>
        </span>
        )}
        <span>{text}</span>
        {details && (
        <span className="ma__decorative-link__details">
          <span>&nbsp;</span>
          <span>{details}</span>
        </span>
        )}
        <span>&nbsp;</span>
        {icon || postIcon}
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
  icon: PropTypes.element,
  fileIcon: PropTypes.element
};

DecorativeLink.defaultProps = {
  href: '#',
  text: 'Lorem ipsum dolor sit amet',
  showFileIcon: false
};

export default DecorativeLink;
