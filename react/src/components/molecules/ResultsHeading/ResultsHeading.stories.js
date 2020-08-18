import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';
import buttonToggleOptions from 'MayflowerReactButtons/ButtonToggle/ButtonToggle.knobs.options';
import TagsData from 'MayflowerReactMolecules/Tags/Tags.knobs.options';
import ResultsHeading from './index';
import ResultsHeadingDocs from './ResultsHeading.md';
import { SortData } from './ResultsHeading.knobs.options';

export const ResultsHeadingExample = (args) => <ResultsHeading {...args} />;

ResultsHeadingExample.storyName = 'Default';
ResultsHeadingExample.args = {
  numResults: '1-12',
  totalResults: '108',
  tags: {
    tags: TagsData.tags,
    onClearCallback: action('resultsHeading tags on clearAll'),
    onClearThisCallback: action('resultsHeading tags on clearThis')
  },
  buttonToggle: {
    option1: buttonToggleOptions.options[0],
    option2: buttonToggleOptions.options[1],
    id: 'sort',
    labelText: 'Sort by:',
    onChangeCallback: action('resultsHeading buttontoggle on change'),
    defaultValue: 'date'
  }
};
ResultsHeadingExample.argTypes = {
  selectBox: {
    control: {
      disable: true
    }
  },
  defaultValue: {
    control: {
      type: 'select',
      options: [buttonToggleOptions.options[0].value, buttonToggleOptions.options[1].value]
    }
  }
};

export const ResultsHeadingSelectBox = (args) => <ResultsHeading {...args} />;
ResultsHeadingSelectBox.storyName = 'ResultsHeading with SelectBox';
ResultsHeadingSelectBox.args = {
  numResults: '1-12',
  totalResults: '108',
  tags: {
    tags: TagsData.tags,
    onClearCallback: action('resultsHeading tags on clearAll'),
    onClearThisCallback: action('resultsHeading tags on clearThis')
  },
  selectBox: {
    label: 'Sort by:',
    stackLabel: false,
    required: true,
    id: 'sort-select',
    options: SortData.sort,
    selected: SortData.sort[0].text,
    onChangeCallback: action('custom-click on select')
  }
};
ResultsHeadingSelectBox.argTypes = {
  buttonToggle: {
    control: {
      disable: true
    }
  },
  selected: {
    control: {
      type: 'select',
      options: SortData.sort.map((option) => option.text)
    }
  }
};

export default {
  title: 'molecules/ResultsHeading',
  component: ResultsHeading,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ResultsHeadingDocs} />
    }
  }
};
