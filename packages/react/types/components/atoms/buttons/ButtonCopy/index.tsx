// @ts-nocheck
/**
 * ButtonCopy module.
 * @module @massds/mayflower-react/ButtonCopy
 * @requires module:@massds/mayflower-assets/scss/00-base/mixins/ma-button-reset
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-copy
 */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import IconCopy from 'MayflowerReactBase/Icon/IconCopy';
// eslint-disable-next-line import/no-unresolved
import IconInputsuccess from 'MayflowerReactBase/Icon/IconInputsuccess';

export interface ButtonCopyProps {
  /** Copied content string. */
  content?: string
}

const ButtonCopy = ({
  content
}: ButtonCopyProps) => {
  const [copied, setCopied] = React.useState(false);
  const copyAction = () => {
    navigator.clipboard.writeText(content).then(() => setCopied(true));
  };
  const copyButtonTitle = copied ? 'copied' : 'copy hex code';
  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);
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
};

export default ButtonCopy;
