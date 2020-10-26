import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import PageHeader from './index';
import PageHeaderDocs from './PageHeader.md';
import PageHeaderData from './PageHeader.knobs.options';

export const PageHeaderExample = (args) => <PageHeader {...args} />;
const defaultProps = PageHeaderData.pageHeader;

PageHeaderExample.storyName = 'Default';
PageHeaderExample.args = {
  category: defaultProps.category,
  title: defaultProps.title,
  subTitle: defaultProps.subTitle,
  optionalContents: [{
    paragraph: {
      text: defaultProps.optionalContents[0].paragraph.text
    }
  }],
  publishState: {
    text: defaultProps.publishState.text
  },
  headerTags: null
};

export default {
  title: 'organisms/PageHeader',
  component: PageHeader,
  parameters: {
    docs: {
      page: () => <StoryPage Description={PageHeaderDocs} />
    }
  }
};
