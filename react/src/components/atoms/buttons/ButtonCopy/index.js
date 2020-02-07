import React from 'react';
import PropTypes from 'prop-types';
import Icon
import './style.css';

const ButtonCopy = (button) => {
  const [copied, setCopied] = useState(false);
  const copyAction = () => {
    setCopied(true);
    navigator.clipboard.writeText(name);
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return() => clearTimeout(timer);
  };
  const copyButtonTitle = copied ? 'copied' : 'copy hex code';
  if (navigator && navigator.clipboard) {
    return(
      <button
        onClick={copyAction}
        title={copyButtonTitle}
        aria-label={copyButtonTitle}
      >
        { copied ? <Icon name="inputsuccess" svgWidth={16} svgHeight={16} /> : <Icon name="copy" svgWidth={16} svgHeight={16} />}
      </button>
    );
  }

};

ButtonCopy.propTypes = {
  /** Copied content string. */
  content: PropTypes.string
};

// Only set defaults for the configuration variables which need to be opted in to activate.
ButtonCopy.defaultProps = {
  href: '',
  type: '',
  size: '',
  theme: '',
  usage: '',
  disabled: false,
  classes: ['']
};

export default ButtonCopy;
