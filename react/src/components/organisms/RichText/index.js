/**
 * RichText module.
 * @module @massds/mayflower-react/RichText
 * @requires module:@massds/mayflower-assets/scss/03-organisms/rich-text
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/comp-heading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/sidebar-heading
 */
import React from 'react';
import PropTypes from 'prop-types';
// import child components
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink/index';
import CompHeading from 'MayflowerReactHeadings/CompHeading/index';
import SidebarHeading from 'MayflowerReactHeadings/SidebarHeading/index';
import Paragraph from 'MayflowerReactText/Paragraph';
import UnorderedList from 'MayflowerReactLists/UnorderedList';


const RichText = (props) => {
  // if (!Object.entries) {
  //   entries.shim();
  // }
  const headerIndent = props.headerIndent ? 'js-ma-outline-indent' : '';
  const anchorLinks = props.anchorLinks ? 'js-ma-insert-heading-anchors' : '';
  const children = React.Children.toArray(props.children);
  const optional = ['CompHeading', 'DecorativeLink', 'SidebarHeading'];
  const elementProperties = {
    paragraph: (value) => <Paragraph {...value} />,
    unorderedList: (value) => <UnorderedList {...value} />
  };
  const rteElements = props.rteElements || null;
  let requiredElements = [];
  if (typeof rteElements !== 'undefined' && rteElements !== null) {
    requiredElements = rteElements.map((element) => {
      if (typeof element.data === 'undefined' || element.data === null) {
        return[];
      }
      return Object.entries(element.data).map(([eleIndex, eleValue]) => {
        if (Object.prototype.hasOwnProperty.call(elementProperties, eleIndex)) {
          const newEleValue = { ...eleValue };
          newEleValue.key = `element.${eleIndex}`;
          return elementProperties[eleIndex](newEleValue);
        }
        return null;
      });
    });
  }
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
      {decorative
      && (
      <div className="ma__rich-text__more">
        {decorative}
      </div>
      )}
    </section>
  );
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
  rteElements: PropTypes.arrayOf(PropTypes.object),
  /** Children passed to rich text. */
  children: PropTypes.node
};

RichText.defaultProps = {
  headerIndent: false,
  anchorLinks: false,
  rteElements: []
};

export default RichText;
