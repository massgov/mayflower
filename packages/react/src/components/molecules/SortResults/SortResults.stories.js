import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import SortResults from './index';
import SortResultsDocs from './SortResults.md';
import sortResultsOptions from './SortResults.knobs.options';

export const SortResultsExample = (args) => <SortResults {...args} />;

SortResultsExample.storyName = 'Default';
SortResultsExample.args = {
  label: 'Sort by:',
  sortButtons: sortResultsOptions.sortButtons
};


export default {
  title: 'molecules/SortResults',
  component: SortResults,
  parameters: {
    docs: {
      page: () => <StoryPage Description={SortResultsDocs} />
    }
  }
};
