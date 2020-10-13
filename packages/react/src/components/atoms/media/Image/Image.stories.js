import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import rectPlaceholder from '@massds/mayflower-assets/static/images/placeholder/800x400.png';
import circPlaceholder from '@massds/mayflower-assets/static/images/placeholder/250x250.png';
import Image from './index';
import ImageDocs from './Image.md';

const Template = (args) => <Image {...args} />;
export const ImageExample = Template.bind({});

ImageExample.storyName = 'Default';
ImageExample.args = {
  alt: 'alt text',
  src: rectPlaceholder,
  width: 800,
  height: 400,
  shape: '',
  classes: []
};

export const ImageCircular = Template.bind({});
ImageCircular.storyName = 'Image (circular)';
ImageCircular.args = {
  alt: 'alt text',
  src: circPlaceholder,
  width: 250,
  height: 250,
  shape: 'circular',
  classes: []
};

export default {
  title: 'atoms/media/Image',
  component: Image,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ImageDocs} />
    }
  }
};
