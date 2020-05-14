import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';

import AccordionWrapper from './index';
import AccordionWrapperDocs from './AccordionWrapper.md';
import AccordionItem from '../../molecules/AccordionItem';
import Icon from '../../base/Icon';
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
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'AccordionWrapper', () => {
      const AccordionItem1Props = {
        title: text('Accordion1 title', 'Collapsible Header One', 'Accordion1'),
        info: text('Accordion1 info', 'Collapsible Header One', 'Accordion1'),
        icon: select('Accordion1 icon', Object.keys(icons), 'circlechevron', 'Accordion1'),
        id: text('id', 'accordionid1')
      };
      const AccordionItem2Props = {
        title: text('Accordion2 title', 'Collapsible Header Two', 'Accordion2'),
        info: text('Accordion2 info', 'Collapsible Header Two', 'Accordion2'),
        icon: select('Accordion2 icon', Object.keys(icons), 'laptop', 'Accordion2'),
        id: text('id', 'accordionid2')
      };
      const AccordionWrapperProps = {
        border: boolean('border', true),
        secondary: boolean('secondary', false),
        emphasize: boolean('emphasize', true),
        headerLevel: select('headerLevel', [1, 2, 3, 4, 5, 6], 2),
        id: text('id', 'accordionid3')
      };

      // Set the icon prop to the actual element based on knob selection.
      AccordionItem1Props.icon = icons[AccordionItem1Props.icon];
      AccordionItem2Props.icon = icons[AccordionItem2Props.icon];

      return(
        <AccordionWrapper {...AccordionWrapperProps}>
          <AccordionItem {...AccordionItem1Props}>
            <Paragraph>A paragraph (from the Greek paragraphos, &quot;to write beside&quot; or &quot;written beside&quot;) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</Paragraph>
          </AccordionItem>
          <AccordionItem {...AccordionItem2Props}>
            <OrderedList />
          </AccordionItem>
        </AccordionWrapper>
      );
    },
    { info: AccordionWrapperDocs }
  );
