import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs/react';

import PressFilters from './index';
import PressFiltersDocs from './PressFilters.md';

// import knob options for child patterns
import buttonOptions from '../../atoms/buttons/Button/Button.knobs.options';
import headingOptions from '../../atoms/headings/Headings.knobs.options';
import coloredHeadingOptions from '../../atoms/headings/ColoredHeading/ColoredHeading.knobs.options';
import selectOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';
import orgSelectorOptions from '../../molecules/OrgSelector/OrgSelector.knobs.options';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add(
    'PressFilters',
    withInfo(PressFiltersDocs)(() => {
      const defaultHeadingLevel = '2';
      const pressFiltersStartDate = {
        labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'mm/dd/yyyy', restrict: 'max'
      };
      const pressFiltersEndDate = {
        labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'today', restrict: 'max'
      };

      const props = {
        action: text('pressFilters.action', '#'),
        coloredHeading: {
          text: text('pressFilters.coloredHeading.text', 'Filter Results'),
          color: select('pressFilters.coloredHeading.color', coloredHeadingOptions.color, 'blue'),
          level: select('pressFilters.coloredHeading.level', headingOptions.levels, defaultHeadingLevel)
        },
        orgSelector: {
          selectBox: {
            label: text('pressFilters.orgSelector.selectBox.label', 'State organization'),
            id: 'state-organization',
            options: object('pressFilters.orgSelector.selectBox.options', selectOptions.options.orgSelector),
            required: boolean('pressFilters.orgSelector.selectBox.required', true)
          },
          organizations: object('pressFilters.orgSelector.organizations', orgSelectorOptions.organizations)
        },
        topic: {
          label: text('pressFilters.topic.label', 'Filter by Topic'),
          id: 'topic',
          options: object('pressFilters.topic.options', selectOptions.options.topics),
          required: boolean('pressFilters.topic.required', true)
        },
        pressType: {
          label: text('pressFilters.pressType.label', 'Filter by Announcement Type'),
          id: 'announcement-type',
          options: object('pressFilters.pressType.options', selectOptions.options.pressTypes),
          required: boolean('pressFilters.pressType.required', true)
        },
        dateRange: {
          label: text('pressFilters.dateRange.label', 'Date range'),
          startDate: object('pressFilters.dateRange.startDate', pressFiltersStartDate),
          endDate: object('pressFilters.dateRange.endDate', pressFiltersEndDate)
        },
        submitButton: {
          text: text('pressFilters.submitButton.text', 'Submit'),
          type: select('pressFilters.submitButton.type', buttonOptions.type, 'submit'),
          size: select('pressFilters.submitButton.size', buttonOptions.size, 'small'),
          theme: select('pressFilters.submitButton.theme', buttonOptions.theme, ''),
          outline: boolean('pressFilters.submitButton.outline', false)
        }
      };

      return(<PressFilters {...props} />);
    })
  );
