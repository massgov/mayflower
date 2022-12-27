/**
 * GenTeaserKeyAction module.
 * @module @massds/mayflower-react/GenTeaserKeyAction
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import ReactHtmlParser from "html-react-parser";
import PropTypes from "prop-types";
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';

/**
 * Key action
 */
const GenTeaserKeyAction = (props) => {
  const {
    description, href, text, info, children, ...rest
  } = props;
  return(
    <div className="ma__gen-teaser__key-action-item" {...rest}>
      {children || (
        <>
          {text && href && <DecorativeLink href={href} text={text} info={info} />}
          {description && <p>{ReactHtmlParser(description)}</p>}
        </>
      )}
    </div>
  );
};

GenTeaserKeyAction.propTypes = {
  /** A description of the link */
  description: PropTypes.string,
  /** A link */
  href: PropTypes.string,
  /** Link text */
  text: PropTypes.string,
  /** Link info */
  info: PropTypes.string,
  /** React children to render */
  children: PropTypes.node
};

export default GenTeaserKeyAction;
