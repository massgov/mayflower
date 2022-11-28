// @ts-nocheck
/**
 * UtilityPanel module.
 * @module @massds/mayflower-react/UtilityPanel
 * @requires module:@massds/mayflower-assets/scss/03-organisms/utility-panel
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 */
import React from 'react';

import Paragraph, { ParagraphProps } from 'MayflowerReactText/Paragraph';
import DecorativeLink, { DecorativeLinkProps } from 'MayflowerReactLinks/DecorativeLink';

export interface UtilityPanelProps {
  /** Text describing the contents of the panel */
  description: ParagraphProps
  /** Links to display in the panel */
  links?: DecorativeLinkProps[]
}

const UtilityPanel = (utilityPanel: UtilityPanelProps) => {
  const descriptionClasses = ['ma__utility-panel__description'];
  const links = utilityPanel.links;
  if (!Array.isArray(links) || links.length === 0) {
    descriptionClasses.push('ma__utility-panel__description--full');
  }
  return (
    (<div className="ma__utility-panel">
      <div className={descriptionClasses.join(' ')}>
        <Paragraph {...utilityPanel.description} />
      </div>
      <ul className="ma__utility-panel__items">
        {links.map((decorativeLink, index) => (
          // eslint-disable-next-line react/no-array-index-key
          (<li className="ma__utility-panel__item js-clickable" key={index}>
            <DecorativeLink {...decorativeLink} />
          </li>)
        ))}
      </ul>
    </div>)
  );
};

UtilityPanel.defaultProps = {
  links: []
};

export default UtilityPanel;
