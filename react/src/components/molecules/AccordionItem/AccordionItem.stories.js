import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';

import Paragraph from '../../atoms/text/Paragraph';
import AccordionItem from './index';
import AccordionItemDocs from './AccordionItem.md';
import Icon from '../../atoms/Icon';

const getIcon = (iconProps) => <Icon {...iconProps} />;

const icons = {
  circlechevron: getIcon({ name: 'circlechevron' }),
  laptop: getIcon({ name: 'laptop' }),
  phone: getIcon({ name: 'phone' }),
  fax: getIcon({ name: 'fax' }),
  none: null
};

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'AccordionItem', (() => {
      const props = {
        title: text('title', 'Collapsible Header'),
        info: text('info', 'Collapsible Header'),
        icon: select('icon', Object.keys(icons), 'circlechevron'),
        border: boolean('border', true),
        emphasize: boolean('emphasize', true),
        secondary: boolean('secondary', false),
        headerLevel: select('headerLevel', [1, 2, 3, 4, 5, 6], 2),
        id: text('id', 'accordionid')
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
    }),
    { info: AccordionItemDocs }
  );
