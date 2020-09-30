import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import UtilityNav from './index';
import UtilityNavDocs from './UtilityNav.md';
import UtilityNavData from './UtilityNav.knob.options';

export const UtilityNavExample = (args) => <UtilityNav {...args} />;


UtilityNavExample.storyName = 'Default';
UtilityNavExample.args = {
  googleLanguages: false,
  items: UtilityNavData.items.map((item, itemIndex) => {
    const storyProps = {
      text: item.text,
      ariaLabelText: item.ariaLabelText,
      closeText: item.closeText,
      href: item.href,
      panel: item.panel
    };
    storyProps.icon = item.icon;
    return(storyProps);
  })
};

export default {
  title: 'organisms/UtilityNav',
  component: UtilityNav,
  parameters: {
    docs: {
      page: () => <StoryPage Description={UtilityNavDocs} />
    }
  }
};
