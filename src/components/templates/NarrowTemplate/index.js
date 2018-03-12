import React from 'react';
import PropTypes from 'prop-types';
import SiteLogo from '../../atoms/media/SiteLogo';
import Placeholder from '../../base/Placeholder';

const NarrowTemplate = (narrowTemplate) => {
  const sideClass = narrowTemplate.side ? ` ma__narrow-template--${narrowTemplate.side}` : '';
  const colorClass = narrowTemplate.color ? ` ma__narrow-template--${narrowTemplate.color}` : '';
  const classNames = `ma__narrow-template${sideClass}${colorClass}`;
  return(
    <main id="main-content" className={classNames} tabIndex="-1">
      <header className="ma__narrow-template__header">
        <SiteLogo />
      </header>
      <div className="ma__narrow-template__container">
        <div className="ma__narrow-template__content">
          {narrowTemplate.children ? narrowTemplate.children : <Placeholder text="Page Content" />}
        </div>
      </div>
    </main>
  );
};

NarrowTemplate.propTypes = {
  /** Align the template to the right or to the left */
  side: PropTypes.oneOf(['right', 'left']),
  /** Secondary color is yellow or green */
  color: PropTypes.oneOf(['yellow', 'green'])
};

// Only set defaults for the configuration variables which need to be opted in to activate.
NarrowTemplate.defaultProps = {
  side: 'right',
  color: 'yellow'
};

export default NarrowTemplate;
