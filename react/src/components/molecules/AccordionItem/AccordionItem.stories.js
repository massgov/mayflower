import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import * as Icon from 'MayflowerReactBase/Icon';
import Paragraph from 'MayflowerReactText/Paragraph';
import AccordionItem from './index';
import AccordionItemDocs from './AccordionItem.md';

const getIcon = (iconProps) => {
  // Capitalizes the name of each SVG icon to match
  // what SVGR names components.
  const SelectedComponent = Icon[iconProps.name];
  return(
    <SelectedComponent {...iconProps} />
  );
};

export const AccordionItemExample = (args) => {
  const props = {
    ...args,
    icon: getIcon({ name: args.icon })
  };
  return(<AccordionItem {...props} />);
};

AccordionItemExample.storyName = 'Default';

AccordionItemExample.args = {
  title: 'Collapsible Header',
  info: 'Collapsible Header',
  icon: 'IconCirclechevron',
  border: true,
  emphasize: true,
  secondary: false,
  headerLevel: 2,
  id: 'accordionid',
  children: <Paragraph>Most parks and beaches that charge daily parking fees sell MassParks Passes at their contact stations during their paid parking seasons. Just ask to purchase a MassParks Pass and show your driver’s license or proof of residency. Please note: most parks cannot accept credit cards, so you’ll have to pay with cash or a check</Paragraph>
};

AccordionItemExample.argTypes = {
  icon: {
    control: {
      type: 'select',
      options: ['IconCirclechevron', 'IconLaptop', 'IconPhone', 'IconFax']
    }
  },
  headerLevel: {
    control: {
      type: 'select',
      options: [1, 2, 3, 4, 5, 6]
    }
  },
  children: {
    control: {
      disable: true
    }
  }
};


export default {
  title: 'molecules/AccordionItem',
  component: AccordionItem,
  parameters: {
    docs: {
      page: () => <StoryPage Description={AccordionItemDocs} />
    }
  }
};
