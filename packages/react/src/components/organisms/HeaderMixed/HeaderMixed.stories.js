import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';
import mainItems from './main-nav.data';
import HeaderMixed from './index';

export const HeaderMixedExample = (args) => <HeaderMixed {...args} />;
HeaderMixedExample.args = {
  mainItems
};
HeaderMixedExample.storyName = 'Default';
export default {
  title: 'organisms/HeaderMixed',
  component: HeaderMixed,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
}