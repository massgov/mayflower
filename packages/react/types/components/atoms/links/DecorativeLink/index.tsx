// @ts-nocheck
/**
 * DecorativeLink module.
 * @module @massds/mayflower-react/DecorativeLink
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import classNames from 'classnames';

// eslint-disable-next-line import/no-unresolved
import IconPdf from 'MayflowerReactBase/Icon/IconPdf';
// eslint-disable-next-line import/no-unresolved
import IconDocx from 'MayflowerReactBase/Icon/IconDocx';
// eslint-disable-next-line import/no-unresolved
import IconXlxs from 'MayflowerReactBase/Icon/IconXlxs';
// eslint-disable-next-line import/no-unresolved
import IconGeneric from 'MayflowerReactBase/Icon/IconGeneric';
// eslint-disable-next-line import/no-unresolved
import IconArrow from 'MayflowerReactBase/Icon/IconArrow';

export interface DecorativeLinkProps {
  href?: string
  info?: string
  text?: string
  showFileIcon?: boolean
  className?: string
  details?: string
  icon?: React.ElementType
}

const DecorativeLink = (props: DecorativeLinkProps) => {
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
        decIcon = <IconPdf title={title} width={35} height={36} />;
        break;
      case 'docx':
        decIcon = <IconDocx title={title} width={35} height={36} />;
        break;
      case 'xlxs':
        decIcon = <IconXlxs title={title} width={35} height={36} />;
        break;
      case 'generic':
        decIcon = <IconGeneric title={title} width={35} height={36} />;
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
        {icon || <IconArrow aria-hidden="true" />}
      </a>
    </span>
  );
};

DecorativeLink.defaultProps = {
  href: '#',
  text: 'Lorem ipsum dolor sit amet',
  showFileIcon: false
};

export default DecorativeLink;
