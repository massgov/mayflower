import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import PageHeaderAddons from './index';
import PageHeaderAddonsDocs from './PageHeaderAddons.md';
import PageHeaderAddonsData from './PageHeaderAddons.knobs.options';

export const PageHeaderAddonsExample = (args) => <PageHeaderAddons {...args} />;
const defaultProps = PageHeaderAddonsData.pageHeader;

PageHeaderAddonsExample.storyName = 'Default';
PageHeaderAddonsExample.args = {
  optionalContents: [{
    paragraph: {
      text: defaultProps.optionalContents[0].paragraph.text
    }
  }],
};

export default {
  title: 'organisms/PageHeaderAddons',
  component: PageHeaderAddons,
  parameters: {
    docs: {
      page: () => <StoryPage Description={PageHeaderDocs} />
    }
  }
};
