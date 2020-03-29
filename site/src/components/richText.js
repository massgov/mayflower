import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

const RichText = ({
  className, id, htmlTag, rawHtml
}) => {
  const CustomElement = htmlTag;
  return(
    <CustomElement ref={(element) => element} className={className} id={id}>
      {ReactHtmlParser(rawHtml)}
    </CustomElement>
  );
}

RichText.propTypes = {
  /** The raw html that you want to render. * */
  rawHtml: PropTypes.string,
  /** A className that you want to component to reference. * */
  className: PropTypes.string,
  /** An id to be rendered on the component. * */
  id: PropTypes.string,
  /** The html tag you want the component to be. By default, this is a `div`. * */
  htmlTag: PropTypes.string
};

RichText.defaultProps = {
  htmlTag: 'div'
};

export default RichText;
