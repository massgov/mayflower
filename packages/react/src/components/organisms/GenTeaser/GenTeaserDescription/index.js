/**
 * GenTeaserDescription module.
 * @module @massds/mayflower-react/GenTeaserDescription
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "html-react-parser";

const GenTeaserDescription = (props) => {
  const { children, description, ...rest } = props;
  let descriptionHTML = null;
  if (typeof (description) === 'string') {
    const parserOptions = {
      replace: (domNode) => {
        // Wrap children text nodes in spans to persist DOM relationship consistency for ReactDOM when Google Translate manipulates the DOM tree
        // eslint-disable-next-line react/no-array-index-key
        if (domNode.type === 'text') {
          return(
            <span>
              {domNode.data}
            </span>
          );
        }

        return null;
      }
    };
    descriptionHTML = ReactHtmlParser(description, parserOptions);
  }

  return(
    <div className="ma__gen-teaser__description" {...rest}>
      {children || <p>{descriptionHTML}</p>}
    </div>
  );
};

GenTeaserDescription.propTypes = {
  /** A html formatted or plain string of text */
  description: PropTypes.string,
  /** React children to render */
  children: PropTypes.node
};

export default GenTeaserDescription;
