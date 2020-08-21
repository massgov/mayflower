import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, text, boolean, select, object, optionsKnob, array
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import InputTextFuzzy from 'MayflowerReactForms/InputTextFuzzy';
import SelectBox from 'MayflowerReactForms/SelectBox';
import DateRange from 'MayflowerReactForms/DateRange';
// import knob options for child patterns
import buttonOptions from 'MayflowerReactButtons/Button/Button.knobs.options';
import selectBoxOptions from 'MayflowerReactForms/SelectBox/SelectBox.knobs.options';
import inputOptions from 'MayflowerReactForms/InputTextFuzzy/InputTextFuzzy.knobs.options';
import FilterBox from '.';
import sharedProps from './FilterBox.props';

export const FilterBoxExample = (args) => <FilterBox {...args} />;
FilterBoxExample.storyName = 'Default';
const organization = {
  label: 'State organization',
  id: 'state-organization',
  options: inputOptions.options.orgSelector.filter((option) => option.text !== ''),
  keys: ['text'],
  selected: '',
  placeholder: 'All Organizations',
  onChange: action('Filterbox organization onChange')
};
const topic = {
  label: 'Filter by Topic',
  stackLabel: true,
  id: 'topic',
  options: selectBoxOptions.options.topics,
  selected: selectBoxOptions.options.topics[0].text,
  required: true
};
const dateRange = {
  label: 'Date range',
  startDate: sharedProps.startDate,
  endDate: sharedProps.endDate
};
const type = {
  label: 'Filter by Type',
  id: 'press-type',
  keys: ['text'],
  options: inputOptions.options.pressTypes,
  selected: '',
  placeholder: 'All Types',
  onChange: action('Filterbox pressType onChange')
};
FilterBoxExample.args = {
  active: true,
  action: '#',
  filterLabel: 'Mass.gov search results filter',
  filterNote: 'This is an additional note for the SR users',
  pressType: {},
  submitButton: {
    text: 'Submit',
    type: 'submit',
    size: null,
    theme: '',
    usage: '',
    outline: false,
    onClick: action('FilterBox submitButton: onClick')
  },
  clearButton: {
    text: 'Clear all filters',
    info: 'Clear all filters',
    onClearCallback: action('FilterBox clearButton onClearCallback')
  },
  fields: [
    {
      class: 'ma__filter-box__organizations ma__filter-box--desktop-hidden',
      component: <InputTextFuzzy {...organization} />
    },
    {
      class: 'ma__filter-box__topic',
      component: <SelectBox {...topic} />
    },
    {
      class: 'ma__filter-box__type',
      component: <InputTextFuzzy {...type} />
    },
    {
      class: 'ma__filter-box__date',
      component: <DateRange {...dateRange} />
    }
  ]
};

export default {
  title: 'organisms/FilterBox',
  component: FilterBox,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
