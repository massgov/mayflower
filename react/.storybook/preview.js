import React from 'react';
import {
  Title,
  Subtitle,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY
} from '@storybook/addon-docs/blocks';
import '../src/index.scss';

const storyKindOrder = [
  'about', // storyKindOrder.indexOf -1 follow alphabetical order
  'brand', // storyKindOrder.indexOf -1 follow alphabetical order
  'dataviz', // storyKindOrder.indexOf -1 follow alphabetical order
  'forms',
  'atoms',
  'molecules',
  'organisms',
  'others/templates',
  'others/pages'
];

export const StoryPage = ({ showStories = false, Description }) => {
  return(
    <>
      <Title>Description</Title>
      <Subtitle />
      { Description && <Description />}
      <Primary />
      <ArgsTable story={PRIMARY_STORY}/>
      { showStories && <Stories />}
    </>
  );
}

export const parameters = {
  options: {
    storySort: {
      order: storyKindOrder
    },
  },
  controls: {
    expanded: true,
    hideNoControlsWarning: true
  }
};
