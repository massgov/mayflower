import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import tooltipOptions from './Tooltip.knob.options';
import Tooltip from './index';

export const TooltipExample = (args) => <Tooltip {...args} />;

TooltipExample.storyName = 'Default';
TooltipExample.args = {
  openText: tooltipOptions.openText,
  closeText: tooltipOptions.closeText,
  message: tooltipOptions.message,
  controlId: tooltipOptions.controlId,
  openIcon: true,
  info: tooltipOptions.info,
  title: tooltipOptions.title,
  level: 2
};
TooltipExample.argTypes = {
  level: {
    control: {
      type: 'select',
      options: tooltipOptions.level
    }
  }
};


export default {
  title: 'molecules/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
