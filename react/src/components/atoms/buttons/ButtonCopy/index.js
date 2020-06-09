/**
 * ButtonCopy module.
 * @module @massds/mayflower-react/ButtonCopy
 * @requires module:@massds/mayflower-assets/scss/00-base/mixins/ma-button-reset
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'MayflowerReactBase/Icon';

const ButtonCopy = ({ content }) => {
  const [copied, setCopied] = React.useState(false);
  const copyAction = () => {
    setCopied(true);
    navigator.clipboard.writeText(content);
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return() => clearTimeout(timer);
  };
  const copyButtonTitle = copied ? 'copied' : 'copy hex code';
  if ((navigator && navigator.clipboard) || (window.location.search.indexOf('backstop') > -1)) {
    return(
      <button
        className="ma__button-copy"
        onClick={copyAction}
        title={copyButtonTitle}
        aria-label={copyButtonTitle}
      >
        { copied ? <Icon name="inputsuccess" svgWidth={16} svgHeight={16} /> : <Icon name="copy" svgWidth={16} svgHeight={16} />}
      </button>
    );
  }
  // If no clipboard available, don't render ButtonCopy
  return null;
};

ButtonCopy.propTypes = {
  /** Copied content string. */
  content: PropTypes.string
};

export default ButtonCopy;
