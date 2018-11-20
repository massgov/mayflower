import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';
import Paragraph from '../../atoms/text/Paragraph';

import AccordionItem from './index';
import AccordionDocs from './AccordionItem.md';

import Icon from '../../atoms/icons/Icon';

const getIcon = (iconProps) => <Icon {...iconProps} />;

const icons = {
  circlechevron: getIcon({ name: 'circlechevron' }),
  laptop: getIcon({ name: 'laptop' }),
  phone: getIcon({ name: 'phone' }),
  fax: getIcon({ name: 'fax' }),
  none: null
};

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('AccordionItem', withInfo(`<div>${AccordionDocs}</div>`)(() => {
    const props = {
      title: text('accordion.title', 'Collapsible Header'),
      icon: select('accordion.icon', Object.keys(icons), 'circlechevron'),
      border: boolean('accordion.border', true),
      emphasize: boolean('accordion.emphasize', true),
      secondary: boolean('accordion.secondary', false),
      headerLevel: select('accordion.headerLevel', [1, 2, 3, 4, 5, 6], 2)
    };

    // Example of child element, paragraph, passable to accordion
    const child = {
      paragraph: text('children.paragraph.text (example)', 'Most parks and beaches that charge daily parking fees sell MassParks Passes at their contact stations during their paid parking seasons. Just ask to purchase a MassParks Pass and show your driver’s license or proof of residency. Please note: most parks cannot accept credit cards, so you’ll have to pay with cash or a check')
    };

    // Set the icon prop to the actual element based on knob selection.
    props.icon = icons[props.icon];

    return(
      <AccordionItem {...props}>
        <Paragraph text={child.paragraph} />
      </AccordionItem>
    );
  }));
