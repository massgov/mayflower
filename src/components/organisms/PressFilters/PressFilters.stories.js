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

storiesOf('Organisms', module).addDecorator(withKnobs)
  .add(
    'PressFilters',
    withInfo(`
          This pattern shows a Form with inputs tailored to filtering Press Articles
          
          @see [@organisms/by-author/press-listing](https://mayflower.digital.mass.gov/?p=organisms-press-filters&view=c)
        `)(() => {
      const defaultHeadingLevel = '2';
      const pressFilterStartDate = {
        labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'mm/dd/yyyy', restrict: 'max'
      };
      const pressFilterEndDate = {
        labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'today', restrict: 'max'
      };

      const props = {
        action: text('pressFilter.action', '#'),
        coloredHeading: {
          text: text('pressFilter.coloredHeading.text', 'Filter Results'),
          color: select('pressFilter.coloredHeading.color', coloredHeadingOptions.color, ''),
          level: select('pressFilter.coloredHeading.level', headingOptions.levels, defaultHeadingLevel)
        },
        topic: {
          label: text('pressFilter.topic.label', 'Filter by Topic'),
          id: 'topic',
          options: object('pressFilter.topic.options', selectOptions.options.topics)
        },
        pressType: {
          label: text('pressFilter.pressType.label', 'Filter by Announcement Type'),
          id: 'announcement-type',
          options: object('pressFilter.pressType.options', selectOptions.options.pressTypes)
        },
        dateRange: {
          label: text('pressFilter.dateRange.label', 'Date range'),
          startDate: object('pressFilter.dateRange.startDate', pressFilterStartDate),
          endDate: object('pressFilter.dateRange.endDate', pressFilterEndDate)
        },
        submitButton: {
          text: text('pressFilter.submitButton.text', 'Submit'),
          type: select('pressFilter.submitButton.type', buttonOptions.type, 'submit'),
          size: select('pressFilter.submitButton.size', buttonOptions.size, 'small'),
          theme: select('pressFilter.submitButton.theme', buttonOptions.theme, ''),
          outline: boolean('pressFilter.submitButton.outline', false)
        }
      };

      return(<PressFilters {...props} />);
    })
  );
