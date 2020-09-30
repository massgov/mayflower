import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import AccordionItem from 'MayflowerReactMolecules/AccordionItem';
import * as Icon from 'MayflowerReactBase/Icon';
import Paragraph from 'MayflowerReactText/Paragraph';
import OrderedList from 'MayflowerReactLists/OrderedList';
import AccordionWrapper from './index';
import AccordionWrapperDocs from './AccordionWrapper.md';

const getIcon = (iconProps) => {
  // Capitalizes the name of each SVG icon to match
  // what SVGR names components.
  const SelectedComponent = Icon[iconProps.name];
  return(
    <SelectedComponent {...iconProps} />
  );
}
const icons = {
  IconCirclechevron: getIcon({ name: 'IconCirclechevron' }),
  IconLaptop: getIcon({ name: 'IconLaptop' }),
  IconPhone: getIcon({ name: 'IconPhone' }),
  IconFax: getIcon({ name: 'IconFax' }),
  none: null
};

export const AccordionWrapperExample = ({ accordionItem1Props,  accordionItem2Props,...accordionWrapperProps}) => (
  <AccordionWrapper {...accordionWrapperProps}>
    <AccordionItem {...accordionItem1Props}>
      <Paragraph>A paragraph (from the Greek paragraphos, &quot;to write beside&quot; or &quot;written beside&quot;) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</Paragraph>
    </AccordionItem>
    <AccordionItem {...accordionItem2Props}>
      <OrderedList />
    </AccordionItem>
  </AccordionWrapper>
);
AccordionWrapperExample.storyName = 'Default';
AccordionWrapperExample.args = {
  accordionItem1Props: {
    title: 'Collapsible Header One',
    info: 'Collapsible Header One',
    icon: icons.IconCirclechevron,
    id: 'accordionid1'
  },
  accordionItem2Props: {
    title: 'Collapsible Header Two',
    info: 'Collapsible Header Two',
    icon: icons.IconLaptop,
    id: 'accordionid2'
  },
  border: true,
  secondary: false,
  emphasize: true,
  headerLevel: 2
};
AccordionWrapperExample.argTypes = {
  children: {
    control: {
      disable: true
    }
  }
};

export default {
  title: 'organisms/AccordionWrapper',
  component: AccordionWrapper,
  parameters: {
    docs: {
      page: () => <StoryPage StoryComponent={AccordionWrapperExample} Description={AccordionWrapperDocs} />
    }
  }
};
