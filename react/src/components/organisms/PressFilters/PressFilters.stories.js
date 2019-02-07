import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import PressFilters from './index';
import PressFiltersDocs from './PressFilters.md';
// import knob options for child patterns
import buttonOptions from '../../atoms/buttons/Button/Button.knobs.options';
import headingOptions from '../../atoms/headings/Headings.knobs.options';
import coloredHeadingOptions from '../../atoms/headings/ColoredHeading/ColoredHeading.knobs.options';
import selectBoxOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';
import inputOptions from '../../atoms/forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';
import orgSelectorOptions from '../../molecules/OrgSelector/OrgSelector.knobs.options';

storiesOf('organisms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'PressFilters', (() => {
      const defaultHeadingLevel = '2';
      const pressFiltersStartDate = {
        labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'm/dd/yyyy', restrict: 'max'
      };
      const pressFiltersEndDate = {
        labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'today', restrict: 'max'
      };
      const hideTopic = select('pressFilters.hideTopic', { hide: 'Hide', show: 'Show' }, 'show');
      const orgSelectorInput = select('pressFilters.orgSelector.inputType', { '': 'Choose', selectbox: 'SelectBox', typeahead: 'TypeAhead' }, 'typeahead');
      const pressTypeInput = select('pressFilters.pressType.inputType', { '': 'Choose', selectbox: 'SelectBox', typeahead: 'TypeAhead' }, 'typeahead');
      const props = {
        action: text('pressFilters.action', '#'),
        coloredHeading: {
          text: text('pressFilters.coloredHeading.text', 'Filter Results'),
          color: select('pressFilters.coloredHeading.color', coloredHeadingOptions.color, 'blue'),
          level: select('pressFilters.coloredHeading.level', headingOptions.levels, defaultHeadingLevel)
        },
        orgSelector: {
          organizations: object('pressFilters.orgSelector.organizations', orgSelectorOptions.organizations),
          onChangeOrgCallback: action('PressFilters onChangeOrgCallback')
        },
        topic: ((hideTopic === 'show') ? {
          label: text('pressFilters.topic.label', 'Filter by Topic'),
          stackLabel: boolean('pressFilters.topic.stackLabel', true),
          id: 'topic',
          options: object('pressFilters.topic.options', selectBoxOptions.options.topics),
          required: boolean('pressFilters.topic.required', true)
        } : null),
        pressType: {},
        dateRange: {
          label: text('pressFilters.dateRange.label', 'Date range'),
          startDate: object('pressFilters.dateRange.startDate', pressFiltersStartDate),
          endDate: object('pressFilters.dateRange.endDate', pressFiltersEndDate)
        },
        submitButton: {
          text: text('pressFilters.submitButton.text', 'Submit'),
          type: select('pressFilters.submitButton.type', buttonOptions.type, 'submit'),
          size: select('pressFilters.submitButton.size', buttonOptions.size),
          theme: select('pressFilters.submitButton.theme', buttonOptions.theme, ''),
          outline: boolean('pressFilters.submitButton.outline', false),
          onClick: action('pressFilters.submitButton clicked')
        },
        clearButton: {
          text: text('pressFilters.clearButton.text', 'Clear all filters'),
          info: text('pressFilters.clearButton.aria-label', 'Clear all filters'),
          onClearCallback: action('pressFilters on clearAll')
        }
      };
      if (orgSelectorInput === 'selectbox') {
        props.orgSelector.selectBox = {
          label: text('orgSelector.selectBox.label', 'State organization'),
          id: text('orgSelector.selectBox.id', 'state-organization'),
          options: object('orgSelector.selectBox.options', selectBoxOptions.options.orgSelector),
          selected: select('orgSelector.selectBox.defaultSelected', selectBoxOptions.options.orgSelector.map((option) => option.text), selectBoxOptions.options.orgSelector[0].text)
        };
      } else {
        props.orgSelector.typeAhead = {
          label: text('orgSelector.typeAhead.label', 'State organization'),
          id: text('orgSelector.typeAhead.id', 'state-organization'),
          options: object('orgSelector.typeAhead.options', inputOptions.options.orgSelector),
          selected: select(
            'orgSelector.defaultSelected',
            [''].concat(inputOptions.options.orgSelector.map((option) => option.text)),
            ''
          ),
          placeholder: text('orgSelector.typeAhead.placeholder', 'All Organizations'),
          onChange: action('pressFilters.orgSelector typeahead onChange')
        };
      }
      if (pressTypeInput === 'selectbox') {
        props.pressType.selectBox = {
          label: text('pressFilters.pressType.label', 'Filter by Announcement Type'),
          stackLabel: boolean('pressFilters.pressType.stackLabel', true),
          id: 'announcement-type',
          options: object('pressFilters.pressType.options', selectBoxOptions.options.pressTypes),
          required: boolean('pressFilters.pressType.required', true)
        };
      } else {
        props.pressType.typeAhead = {
          label: text('pressFilters.pressType.label', 'Filter by Announcement Type'),
          id: text('pressFilters.pressType.id', 'press-type'),
          options: object('pressFilters.pressType.options', inputOptions.options.pressTypes),
          selected: select(
            'pressFilters.pressType.defaultSelected',
            [''].concat(inputOptions.options.pressTypes.map((option) => option.text)),
            ''
          ),
          placeholder: text('pressFilters.pressType.placeholder', 'All Types'),
          onChange: action('pressFilters.pressType typeahead onChange')
        };
      }
      return(<PressFilters {...props} />);
    }),
    { info: PressFiltersDocs }
  );
