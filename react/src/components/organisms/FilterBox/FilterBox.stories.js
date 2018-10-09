import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { InputTextTypeAhead, SelectBox, DateRange } from '../../../index';

import FilterBox from '.';
import sharedProps from './FilterBox.props';

// import knob options for child patterns
import buttonOptions from '../../atoms/buttons/Button/Button.knobs.options';
import selectBoxOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';
import inputOptions from '../../atoms/forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add(
    'FilterBox',
    withInfo()(() => {
      const organization = {
        label: text('filterBox.organization.label', 'State organization'),
        id: text('filterBox.organization.id', 'state-organization'),
        options: object('filterBox.organization.options', inputOptions.options.orgSelector),
        selected: select(
          'filterBox.organization.selected',
          inputOptions.options.orgSelector.map((option) => option.text),
          inputOptions.options.orgSelector[0].text
        ),
        placeholder: text('filterBox.organization.placeholder', 'All Organizations'),
        onChange: action('filterBox.organization typeahead onChange')
      };
      const topic = {
        label: text('filterBox.topic.label', 'Filter by Topic'),
        stackLabel: boolean('filterBox.topic.stackLabel', true),
        id: 'topic',
        options: object('filterBox.topic.options', selectBoxOptions.options.topics),
        selected: select(
          'filterBox.topic.selected',
          selectBoxOptions.options.topics.map((option) => option.text),
          selectBoxOptions.options.topics[0].text
        ),
        required: boolean('filterBox.topic.required', true)
      };
      const dateRange = {
        label: text('filterBox.dateRange.label', 'Date range'),
        startDate: object('filterBox.dateRange.startDate', sharedProps.startDate),
        endDate: object('filterBox.dateRange.endDate', sharedProps.endDate)
      };
      const type = {
        label: text('filterBox.pressType.label', 'Filter by Type'),
        id: text('filterBox.pressType.id', 'press-type'),
        options: object('filterBox.pressType.options', inputOptions.options.pressTypes),
        selected: select(
          'filterBox.pressType.selected',
          [''].concat(inputOptions.options.pressTypes.map((option) => option.text)),
          ''
        ),
        placeholder: text('filterBox.pressType.placeholder', 'All Types'),
        onChange: action('filterBox.pressType typeahead onChange')
      };
      const props = {
        active: boolean('filterBox.active', true),
        action: text('filterBox.action', '#'),
        pressType: {},
        submitButton: {
          text: text('filterBox.submitButton.text', 'Submit'),
          type: select('filterBox.submitButton.type', buttonOptions.type, 'submit'),
          size: select('filterBox.submitButton.size', buttonOptions.size),
          theme: select('filterBox.submitButton.theme', buttonOptions.theme, 'c-primary'),
          outline: boolean('filterBox.submitButton.outline', false),
          onClick: action('FilterBox submitButton.onClick')
        },
        clearButton: {
          text: text('filterBox.clearButton.text', 'Clear all filters'),
          info: text('filterBox.clearButton.aria-label', 'Clear all filters'),
          onClearCallback: action('FilterBox clearButton.onClearCallback')
        },
        fields: [
          {
            class: 'ma__filter-box__organizations ma__filter-box--desktop-hidden',
            component: <InputTextTypeAhead {...organization} />
          },
          {
            class: 'ma__filter-box__topic',
            component: <SelectBox {...topic} />
          },
          {
            class: 'ma__filter-box__type',
            component: <InputTextTypeAhead {...type} />
          },
          {
            class: 'ma__filter-box__date',
            component: <DateRange {...dateRange} />
          }
        ]
      };
      return(<FilterBox {...props} />);
    })
  );
