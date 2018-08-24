import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

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
      const hideTopic = boolean('filterBox.hideTopic', true);
      const hideOrganization = boolean('filterBox.hideOrganization', true);
      const hideType = boolean('filterBox.hideType', false);
      const hideDateRange = boolean('filterBox.hideDateRange', false);
      const pressTypeInput = select('filterBox.pressType.inputType', { '': 'Choose', selectbox: 'SelectBox', typeahead: 'TypeAhead' }, 'typeahead');
      const props = {
        active: boolean('filterBox.active', true),
        action: text('filterBox.action', '#'),
        topic: (hideTopic ? undefined : {
          label: text('filterBox.topic.label', 'Filter by Topic'),
          stackLabel: boolean('filterBox.topic.stackLabel', true),
          id: 'topic',
          options: object('filterBox.topic.options', selectBoxOptions.options.topics),
          required: boolean('filterBox.topic.required', true)
        }),
        pressType: {},
        dateRange: (hideDateRange ? undefined : {
          label: text('filterBox.dateRange.label', 'Date range'),
          startDate: object('filterBox.dateRange.startDate', sharedProps.startDate),
          endDate: object('filterBox.dateRange.endDate', sharedProps.endDate)
        }),
        submitButton: {
          text: text('filterBox.submitButton.text', 'Submit'),
          type: select('filterBox.submitButton.type', buttonOptions.type, 'submit'),
          size: select('filterBox.submitButton.size', buttonOptions.size),
          theme: select('filterBox.submitButton.theme', buttonOptions.theme, ''),
          outline: boolean('filterBox.submitButton.outline', false),
          onClick: action('FilterBox submitButton.onClick')
        },
        clearButton: {
          text: text('filterBox.clearButton.text', 'Clear all filters'),
          info: text('filterBox.clearButton.aria-label', 'Clear all filters'),
          onClearCallback: action('FilterBox clearButton.onClearCallback')
        },
        organization: (hideOrganization ? undefined : {
          label: text('filterBox.organization.label', 'State organization'),
          id: text('filterBox.organization.id', 'state-organization'),
          options: object('filterBox.organization.options', inputOptions.options.orgSelector),
          selected: select(
            'filterBox.organization.selected',
            inputOptions.options.orgSelector.map((option) => option.text),
            ''
          ),
          placeholder: text('filterBox.organization.placeholder', 'All Organizations'),
          onChange: action('filterBox.organization typeahead onChange')
        })
      };
      if (hideType) {
        props.pressType.typeAhead = null;
      } else if (pressTypeInput === 'selectbox') {
        props.pressType.selectBox = {
          label: text('filterBox.pressType.label', 'Filter by Type'),
          stackLabel: boolean('filterBox.pressType.stackLabel', true),
          id: 'announcement-type',
          options: object('filterBox.pressType.options', selectBoxOptions.options.pressTypes),
          required: boolean('filterBox.pressType.required', true)
        };
      } else if (pressTypeInput === 'typeahead') {
        props.pressType.typeAhead = {
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
      }
      return(<FilterBox {...props} />);
    })
  );
