import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select, object } from '@storybook/addon-knobs/react';

import PressFilters from './index';

// import knob options for child patterns
import buttonOptions from '../../atoms/buttons/Button/Button.knobs.options';
import headingOptions from '../../atoms/headings/Headings.knob.options';
import coloredHeadingOptions from '../../atoms/headings/ColoredHeading/ColoredHeadings.knob.options';
import selectOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';
import orgSelectorOptions from '../../molecules/OrgSelector/OrgSelector.knobs.options';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add(
    'PressFilters',
    withInfo(`
          This pattern shows a Form with inputs tailored to filtering Press Articles
          
          @see [@organisms/by-author/press-listing](https://mayflower.digital.mass.gov/?p=organisms-press-filters&view=c)
        `)(() => {
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
          color: select('pressFilters.coloredHeading.color', coloredHeadingOptions.color, ''),
          level: select('pressFilters.coloredHeading.level', headingOptions.levels, defaultHeadingLevel)
        },
        orgSelector: {
          selectBox: {
            label: text('orgSelector.selectBox.label', 'State organization'),
            id: 'state-organization',
            options: object('orgSelector.selectBox.options', selectOptions.options.orgSelector)
          },
          organizations: object('orgSelector.organizations', orgSelectorOptions.organizations)
        },
        topic: {
          label: text('pressFilters.topic.label', 'Filter by Topic'),
          id: 'topic',
          options: object('pressFilters.topic.options', selectOptions.options.topics)
        },
        pressType: {
          label: text('pressFilters.pressType.label', 'Filter by Announcement Type'),
          id: 'announcement-type',
          options: object('pressFilters.pressType.options', selectOptions.options.pressTypes)
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
