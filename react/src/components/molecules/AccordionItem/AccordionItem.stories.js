import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean, date } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import Paragraph from '../../atoms/text/Paragraph'

import AccordionItem from './index';
import AccordionDocs from './AccordionItem.md';

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

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('AccordionItem', withInfo(`<div>${AccordionDocs}</div>`)(() => {
    const props = {
      title: text('accordion.title', 'Collapsible Header'),
      info: text('accordion.info', 'Collapsible Header'),
      icon: select('accordion.icon', Object.keys(icons), 'circlechevron'),
      border: boolean('accordion.border', true)
    };

    // Example of child element, paragraph, passable to accordion
    const child = {
      paragraph: text('children.paragraph.text (example)', 'Most parks and beaches that charge daily parking fees sell MassParks Passes at their contact stations during their paid parking seasons. Just ask to purchase a MassParks Pass and show your driver’s license or proof of residency. Please note: most parks cannot accept credit cards, so you’ll have to pay with cash or a check')
    };

    // Set the icon prop to the actual element based on knob selection.
    props.icon = icons[props.icon];

    return(
      <AccordionItem {...props}>
        <Paragraph text={child.paragraph}/>
      </AccordionItem>
    );
  }));
