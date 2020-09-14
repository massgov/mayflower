/**
 * ButtonCopy module.
 * @module @massds/mayflower-react/ButtonCopy
 * @requires module:@massds/mayflower-assets/scss/00-base/mixins/ma-button-reset
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import IconCopy from 'MayflowerReactBase/Icon/IconCopy';
// eslint-disable-next-line import/no-unresolved
import IconInputsuccess from 'MayflowerReactBase/Icon/IconInputsuccess';

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
        type="button"
        className="ma__button-copy"
        onClick={copyAction}
        title={copyButtonTitle}
        aria-label={copyButtonTitle}
      >
        { copied ? <IconInputsuccess width={16} height={16} /> : <IconCopy width={16} height={16} />}
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
