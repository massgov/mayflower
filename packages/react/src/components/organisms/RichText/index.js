/**
 * RichText module.
 * @module @massds/mayflower-react/RichText
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import ReactDOMServer from 'react-dom/server';

const RichText = ({
  className, id, htmlTag, rawHtml, transform, children, ...rest
}) => {
  const CustomElement = htmlTag;
  // If chidlren don't exist, expect to render the rawHtml string.
  const markup = children ? ReactDOMServer.renderToStaticMarkup(children) : rawHtml;
  return(
    <CustomElement ref={(element) => element} className={className} id={id} {...rest}>
      {ReactHtmlParser(markup, { transform })}
    </CustomElement>
  );
};

RichText.propTypes = {
  /** The raw html nodes that you want to render. */
  children: PropTypes.node,
  /** The stringified raw html that you want to render. If children exist, will render children instead of rawHtml */
  rawHtml: PropTypes.string,
  /** A className that you want to component to reference. */
  className: PropTypes.string,
  /** An id to be rendered on the component. */
  id: PropTypes.string,
  /** A valid html tag you want the component wrapper to be. By default, this is a `div`. */
  htmlTag: PropTypes.string,
  /** The transform function will be called for every node that is parsed by ReactHtmlParser.
    * See documentation of react-html-parser for the transform function: https://www.npmjs.com/package/react-html-parser#transform-function
  * */
  transform: PropTypes.func
};

RichText.defaultProps = {
  htmlTag: 'div'
};

export default RichText;
