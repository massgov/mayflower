import React from 'react';
import PropTypes from 'prop-types';

// import child components
import DecorativeLink from '../../../atoms/links/DecorativeLink';
import CompHeading from '../../../atoms/headings/CompHeading';
import SidebarHeading from '../../../atoms/headings/SidebarHeading';

const RichText = (props) => {
  const headerIndent = props.headerIndent ? 'js-ma-outline-indent' : '';
  const anchorLinks = props.anchorLinks ? 'js-ma-insert-heading-anchors' : '';
  const children = React.Children.toArray(props.children);
  const optional = ['CompHeading', 'DecorativeLink', 'SidebarHeading'];
  const requiredElements = [];
  const optionalElements = [];
  children.forEach((value) => {
    if (optional.indexOf(value.type.name) >= 0) {
      optionalElements[value.type.name] = value;
    } else {
      requiredElements.push(value);
    }
  });
  const decorative = optionalElements.DecorativeLink || null;
  return(
    <section className={`ma__rich-text js-ma-rich-text ${headerIndent} ${anchorLinks}`}>
      {optionalElements.CompHeading}
      {optionalElements.SidebarHeading}
      {requiredElements}
      {decorative &&
      <div className="ma__rich-text__more">
        {decorative}
      </div>
      }
    </section>);
};


RichText.propTypes = {
  headerIndent: PropTypes.bool,
  anchorLinks: PropTypes.bool,
  /** @atoms/headings/CompHeading */
  compHeading: PropTypes.instanceOf(CompHeading),
  /** @atoms/headings/SidebarHeading */
  sidebarHeading: PropTypes.instanceOf(SidebarHeading),
  /** @atoms/links/DecorativeLink */
  decorativeLink: PropTypes.instanceOf(DecorativeLink),
  rteElements: PropTypes.arrayOf(PropTypes.object)
};

RichText.defaultProps = {
  headerIndent: true,
  anchorLinks: true,
  compHeading: <CompHeading {...CompHeading.defaultProps} />,
  sidebarHeading: <SidebarHeading {...SidebarHeading.defaultProps} />,
  decorativeLink: <DecorativeLink {...DecorativeLink.defaultProps} />,
  rteElements: [{}]
};

export default RichText;
