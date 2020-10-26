import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import rectPlaceholder from '@massds/mayflower-assets/static/images/placeholder/600x450.png';

import IllustratedHeader from './index';
import IllustratedHeaderDocs from './IllustratedHeader.md';

export const IllustratedHeaderExample = (args) => (
  <IllustratedHeader {...args}>
    <hr />
    <p>Additional Information</p>
  </IllustratedHeader>
);

IllustratedHeaderExample.storyName = 'Default';
IllustratedHeaderExample.args = {
  bgInfo: 'Forest of the Berkshires',
  bgImage: rectPlaceholder,
  category: 'Guide',
  inverted: false,
  publishState: {
    text: 'publish state'
  },
  pageHeader: {
    title: 'Moving to Massachusetts',
    subTitle: '',
    optionalContents: [{
      paragraph: {
        text: 'This part of the series will cover residency, employment, health care coverage, education, registering to vote, and taxes — important things to help you settle into your life in the Bay State.'
      }
    }],
    headerTags: null
  }
};

export default {
  title: 'organisms/IllustratedHeader',
  component: IllustratedHeader,
  parameters: {
    docs: {
      page: () => <StoryPage StoryComponent={IllustratedHeaderExample} Description={IllustratedHeaderDocs} />
    }
  }
};
