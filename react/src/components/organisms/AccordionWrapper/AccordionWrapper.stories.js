import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';

import AccordionWrapper from './index';
import AccordionWrapperDocs from './AccordionWrapper.md';

import AccordionItem from '../../molecules/AccordionItem';
import Icon from '../../atoms/icons/Icon';
import Paragraph from '../../atoms/text/Paragraph';
import OrderedList from '../../atoms/lists/OrderedList';

const getIcon = (iconProps) => <Icon {...iconProps} />;

const icons = {
  circlechevron: getIcon({ name: 'circlechevron' }),
  laptop: getIcon({ name: 'laptop' }),
  phone: getIcon({ name: 'phone' }),
  fax: getIcon({ name: 'fax' }),
  none: null
};

storiesOf('organisms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'AccordionWrapper', (() => {
      const AccordionItem1Props = {
        title: text('accordion1.title', 'Collapsible Header One'),
        info: text('accordion1.info', 'Collapsible Header One'),
        icon: select('accordion1.icon', Object.keys(icons), 'circlechevron')
      };
      const AccordionItem2Props = {
        title: text('accordion2.title', 'Collapsible Header Two'),
        info: text('accordion2.info', 'Collapsible Header Two'),
        icon: select('accordion2.icon', Object.keys(icons), 'laptop')
      };
      const AccordionWrapperProps = {
        border: boolean('accordionWrapper.border', true),
        secondary: boolean('accordionWrapper.secondary', false),
        emphasize: boolean('accordionWrapper.emphasize', true),
        headerLevel: select('accordionWrapper.headerLevel', [1, 2, 3, 4, 5, 6], 2)
      };

      // Set the icon prop to the actual element based on knob selection.
      AccordionItem1Props.icon = icons[AccordionItem1Props.icon];
      AccordionItem2Props.icon = icons[AccordionItem2Props.icon];

      return(
        <AccordionWrapper {...AccordionWrapperProps}>
          <AccordionItem {...AccordionItem1Props}>
            <Paragraph />
          </AccordionItem>
          <AccordionItem {...AccordionItem2Props}>
            <OrderedList />
          </AccordionItem>
        </AccordionWrapper>
      );
    }),
    { info: AccordionWrapperDocs }
  );
