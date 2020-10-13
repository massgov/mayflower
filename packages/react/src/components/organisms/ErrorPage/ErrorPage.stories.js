import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import ErrorPage from '.';
import ErrorPageDocs from './ErrorPage.md';

export const ErrorPageExample = (args) => <ErrorPage {...args} />;

ErrorPageExample.storyName = 'Default';
ErrorPageExample.args = {
  type: '404',
  label: 'Oops',
  title: "We can't find that page",
  message: 'The link you clicked may be broken or the page may have been removed'
};

export default {
  title: 'organisms/ErrorPage',
  component: ErrorPage,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ErrorPageDocs} />
    }
  }
};
