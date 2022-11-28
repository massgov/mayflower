// @ts-nocheck
/**
 * RichText module.
 * @module @massds/mayflower-react/RichText
 */
import React from 'react';
import ReactHtmlParser from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';

export interface RichTextProps {
  /** The raw html nodes that you want to render. */
  children?: React.ReactNode
  /** The stringified raw html that you want to render. If children exist, will render children instead of rawHtml */
  rawHtml?: string
  /** A className that you want to component to reference. */
  className?: string
  /** An id to be rendered on the component. */
  id?: string
  /** A valid html tag you want the component wrapper to be. By default, this is a `div`. */
  htmlTag?: string
  /** The transform function will be called for every node that is parsed by ReactHtmlParser.
    * See documentation of html-react-parser for the transform function: https://www.npmjs.com/package/html-react-parser#transform-function
  * */
  transform?(...args: unknown[]): unknown
}

const RichText = ({
  className,
  id,
  htmlTag,
  rawHtml,
  transform,
  children,
  ...rest
}: RichTextProps) => {
  const CustomElement = htmlTag;
  // If chidlren don't exist, expect to render the rawHtml string.
  const markup = children ? ReactDOMServer.renderToStaticMarkup(children) : rawHtml;
  return(
    <CustomElement ref={(element) => element} className={className} id={id} {...rest}>
      {ReactHtmlParser(markup, { transform })}
    </CustomElement>
  );
};

RichText.defaultProps = {
  htmlTag: 'div'
};

export default RichText;
