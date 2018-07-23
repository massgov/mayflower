import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean, date } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import Paragraph from '../../atoms/text/Paragraph';
import OrderedList from '../../atoms/lists/OrderedList'

import AccordionWrapper from './index';
import AccordionItem from '../../molecules/AccordionItem';
//import AccordionDocs from './AccordionItem.md';

import SvgCircleChevron from '../../atoms/icons/SvgCircleChevron';
import SvgLaptop from '../../atoms/icons/SvgLaptop';
import SvgPhone from '../../atoms/icons/SvgPhone';
import SvgFax from '../../atoms/icons/SvgFax';

const icons = {
  circlechevron: <SvgCircleChevron />,
  laptop: <SvgLaptop />,
  phone: <SvgPhone />,
  fax: <SvgFax />,
  none: null
};


storiesOf('organisms', module).addDecorator(withKnobs)
  .add('AccordionWrapper', withInfo(/*`<div>${AccordionDocs}</div>`*/)(() => {
    
    const AccordionItem1Props = {
      title: text('accordion1.title', 'Collapsible Header One'),
      info: text('accordion1.info', 'Collapsible Header One'),
      icon: select('accordion1.icon', Object.keys(icons), 'circlechevron'),
      border: boolean('accordion1.border', true)
    };
    
    const AccordionItem2Props = {
      title: text('accordion2.title', 'Collapsible Header Two'),
      info: text('accordion2.info', 'Collapsible Header Two'),
      icon: select('accordion2.icon', Object.keys(icons), 'laptop'),
      border: boolean('accordion2.border', true)
    };

    // Example of child element, paragraph, passable to accordion
    const children = {
      paragraph: text('children.paragraph.text (example)', 'Most parks and beaches that charge daily parking fees sell MassParks Passes at their contact stations during their paid parking seasons. Just ask to purchase a MassParks Pass and show your driver’s license or proof of residency. Please note: most parks cannot accept credit cards, so you’ll have to pay with cash or a check'),
    };

    // Set the icon prop to the actual element based on knob selection.
    AccordionItem1Props.icon = icons[AccordionItem1Props.icon];
    AccordionItem2Props.icon = icons[AccordionItem2Props.icon];

    return(
      <AccordionWrapper>
        <AccordionItem {...AccordionItem1Props}>
          <Paragraph {...children.paragraph}/>
        </AccordionItem>
        <AccordionItem {...AccordionItem2Props}>
          <OrderedList />
        </AccordionItem>
      </AccordionWrapper>
    );
  }));
