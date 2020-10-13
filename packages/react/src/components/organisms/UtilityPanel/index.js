/**
 * UtilityPanel module.
 * @module @massds/mayflower-react/UtilityPanel
 * @requires module:@massds/mayflower-assets/scss/03-organisms/utility-panel
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 */
import React from 'react';
import PropTypes from 'prop-types';

import Paragraph from 'MayflowerReactText/Paragraph';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';

const UtilityPanel = (utilityPanel) => {
  const descriptionClasses = ['ma__utility-panel__description'];
  const links = utilityPanel.links;
  if (!Array.isArray(links) || links.length === 0) {
    descriptionClasses.push('ma__utility-panel__description--full');
  }
  return(
    <div className="ma__utility-panel">
      <div className={descriptionClasses.join(' ')}>
        <Paragraph {...utilityPanel.description} />
      </div>
      <ul className="ma__utility-panel__items">
        {links.map((decorativeLink, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className="ma__utility-panel__item js-clickable" key={index}>
            <DecorativeLink {...decorativeLink} />
          </li>
        ))}
      </ul>
    </div>
  );
};

UtilityPanel.propTypes = {
  /** Text describing the contents of the panel */
  description: PropTypes.shape(Paragraph.propTypes).isRequired,
  /** Links to display in the panel */
  links: PropTypes.arrayOf(PropTypes.shape(DecorativeLink.propTypes))
};

UtilityPanel.defaultProps = {
  links: []
};

export default UtilityPanel;
