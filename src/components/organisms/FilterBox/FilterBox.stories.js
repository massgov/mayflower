import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import FilterBox from './index';
// import PressFiltersDocs from './PressFilters.md';

// import knob options for child patterns
import buttonOptions from '../../atoms/buttons/Button/Button.knobs.options';
import headingOptions from '../../atoms/headings/Headings.knobs.options';
import coloredHeadingOptions from '../../atoms/headings/ColoredHeading/ColoredHeading.knobs.options';
import selectBoxOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';
import inputOptions from '../../atoms/forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';
import orgSelectorOptions from '../../molecules/OrgSelector/OrgSelector.knobs.options';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add(
    'FilterBox',
    withInfo()(() => {
      const filterBoxStartDate = {
        labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'm/dd/yyyy', restrict: 'max'
      };
      const filterBoxEndDate = {
        labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'today', restrict: 'max'
      };
      const hideTopic = boolean('filterBox.hideTopic', true);
      const hideOrganization = boolean('filterBox.hideOrganization', true);
      const orgSelectorInput = select('filterBox.orgSelector.inputType', { '': 'Choose', selectbox: 'SelectBox', typeahead: 'TypeAhead' }, 'typeahead');
      const pressTypeInput = select('filterBox.pressType.inputType', { '': 'Choose', selectbox: 'SelectBox', typeahead: 'TypeAhead' }, 'typeahead');
      const props = {
        active: boolean('filterBox.active', true),
        action: text('filterBox.action', '#'),
        topic: (!hideTopic && {
          label: text('filterBox.topic.label', 'Filter by Topic'),
          stackLabel: boolean('filterBox.topic.stackLabel', true),
          id: 'topic',
          options: object('filterBox.topic.options', selectBoxOptions.options.topics),
          required: boolean('filterBox.topic.required', true)
        }),
        pressType: {},
        dateRange: {
          label: text('filterBox.dateRange.label', 'Date range'),
          startDate: object('filterBox.dateRange.startDate', filterBoxStartDate),
          endDate: object('filterBox.dateRange.endDate', filterBoxEndDate)
        },
        submitButton: {
          text: text('filterBox.submitButton.text', 'Submit'),
          type: select('filterBox.submitButton.type', buttonOptions.type, 'submit'),
          size: select('filterBox.submitButton.size', buttonOptions.size, 'small'),
          theme: select('filterBox.submitButton.theme', buttonOptions.theme, ''),
          outline: boolean('filterBox.submitButton.outline', false),
          onClick: action('filterBox.submitButton clicked')
        },
        clearButton: {
          text: text('filterBox.clearButton.text', 'Clear all filters'),
          info: text('filterBox.clearButton.aria-label', buttonOptions.type, 'Clear all filters'),
          onClearCallback: action('pressFilters on clearAll')
        },
        organization: (!hideOrganization && {
          label: text('filterBox.organization.label', 'State organization'),
          id: text('filterBox.organization.id', 'state-organization'),
          options: object('filterBox.organization.options', inputOptions.options.orgSelector),
          selected: select(
            'filterBox.organization.defaultSelected',
            [''].concat(inputOptions.options.orgSelector.map((option) => option.text)),
            ''
          ),
          placeholder: text('filterBox.organization.placeholder', 'All Organizations'),
          onChange: action('filterBox.organization typeahead onChange')
        })
      };
      if (pressTypeInput === 'selectbox') {
        props.pressType.selectBox = {
          label: text('filterBox.pressType.label', 'Filter by Type'),
          stackLabel: boolean('filterBox.pressType.stackLabel', true),
          id: 'announcement-type',
          options: object('filterBox.pressType.options', selectBoxOptions.options.pressTypes),
          required: boolean('filterBox.pressType.required', true)
        };
      } else {
        props.pressType.typeAhead = {
          label: text('filterBox.pressType.label', 'Filter by Type'),
          id: text('filterBox.pressType.id', 'press-type'),
          options: object('filterBox.pressType.options', inputOptions.options.pressTypes),
          selected: select(
            'filterBox.pressType.defaultSelected',
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
