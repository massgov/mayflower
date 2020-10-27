import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import ArrowNav from 'MayflowerReactMolecules/ArrowNav';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';
import PageFlipper from './index';
import PageFlipperDocs from './PageFlipper.md';

export const PageFlipperExample = (args) => <PageFlipper {...args} />;

PageFlipperExample.storyName = 'Default';
const decorativeLinkProps = {
  href: '#',
  info: 'info',
  text: 'Some Section',
  showFileIcon: false
};
const nextProps = {
  href: '',
  info: 'This is the next page',
  text: 'Next Site',
  title: 'See the Next Site',
  onClick: action('Next Clicked'),
  direction: 'right',
  label: 'Next Site'
};
const prevProps = {
  href: '',
  info: 'This is the previous page',
  text: 'Previous Site',
  title: 'See the Previous Site',
  onClick: action('Previous Clicked'),
  direction: 'left',
  label: 'Previous Site'
};
PageFlipperExample.args = {
  intro: {
    label: 'This is part of:',
    introDecorativeLink: <DecorativeLink {...decorativeLinkProps} />
  },
  nextLink: <ArrowNav {...nextProps} />,
  previousLink: <ArrowNav {...prevProps} />
};

export default {
  title: 'organisms/PageFlipper',
  component: PageFlipper,
  parameters: {
    docs: {
      page: () => <StoryPage Description={PageFlipperDocs} />
    }
  }
};
