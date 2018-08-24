import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';

import AccordionWrapper from './index';
import AccordionWrapperDocs from './AccordionWrapper.md';

import AccordionItem from '../../molecules/AccordionItem';
import SvgCircleChevron from '../../atoms/icons/SvgCircleChevron';
import SvgLaptop from '../../atoms/icons/SvgLaptop';
import SvgPhone from '../../atoms/icons/SvgPhone';
import SvgFax from '../../atoms/icons/SvgFax';
import Paragraph from '../../atoms/text/Paragraph';
import OrderedList from '../../atoms/lists/OrderedList';

const icons = {
  circlechevron: <SvgCircleChevron />,
  laptop: <SvgLaptop />,
  phone: <SvgPhone />,
  fax: <SvgFax />,
  none: null
};

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('AccordionWrapper', withInfo(`<div>${AccordionWrapperDocs}</div>`)(() => {
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
  }));
