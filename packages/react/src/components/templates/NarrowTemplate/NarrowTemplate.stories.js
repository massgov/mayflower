import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';

import NarrowTemplate from '.';
import NarrowTemplateDocs from './NarrowTemplate.md';

export const NarrowTemplateExample = (args) => <NarrowTemplate {...args} />;

NarrowTemplateExample.storyName = 'Default';
NarrowTemplateExample.args = {
  siteLogoDomain: {
    url: {
      domain: 'https://www.mass.gov/'
    },
    image: {
      src: logo,
      alt: 'Massachusetts state seal',
      width: 45,
      height: 45
    },
    siteName: 'Mass.gov'
  }
};

export default {
  title: 'templates/NarrowTemplate',
  component: NarrowTemplate,
  parameters: {
    docs: {
      page: () => <StoryPage Description={NarrowTemplateDocs} />
    }
  }
};
