import React from 'react';
import PropTypes from 'prop-types';
import SvgArrow from '../../atoms/icons/SvgArrow';

const CalloutLink = (props) => {
  const calloutLink = props;


  return(
    <div className="ma__callout-link" title={calloutLink.info}>
      <a href={calloutLink.href}><span className="ma__callout-link__container"><span className="ma__callout-link__text" >{calloutLink.text}&nbsp;<SvgArrow /></span></span></a>
      { calloutLink.description ? <p className="ma__callout-link__description">{calloutLink.description}</p> : '' }
    </div>
  );
};

CalloutLink.propTypes = {
  /** The heading text  */
  text: PropTypes.string.isRequired,
  /** The link the callout is going to */
  href: PropTypes.string.isRequired,
  /** Add more information about the link */
  info: PropTypes.string,
  /** Add description text under the title text */
  description: PropTypes.string
};

export default CalloutLink;
