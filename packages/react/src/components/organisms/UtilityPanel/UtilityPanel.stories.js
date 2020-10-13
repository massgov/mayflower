import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import UtilityPanel from '.';
import UtilityPanelDocs from './UtilityPanel.md';
import UtilityPanelData from './UtilityPanel.json';

export const UtilityPanelExample = (args) => <UtilityPanel {...args} />;


UtilityPanelExample.storyName = 'Default';
UtilityPanelExample.args = {
  ...UtilityPanelData
};
export default {
  title: 'organisms/UtilityPanel',
  component: UtilityPanel,
  parameters: {
    docs: {
      page: () => <StoryPage Description={UtilityPanelDocs} />
    }
  }
};
