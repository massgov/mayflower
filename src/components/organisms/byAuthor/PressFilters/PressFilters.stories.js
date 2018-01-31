import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select, object } from '@storybook/addon-knobs/react';

import PressFilters from './PressFilters';

storiesOf('Organisms/By-Author/PressFilters', module).addDecorator(withKnobs)
    .add('PressFilters',
        withInfo(`
      
      ### Description
      
      This is the standard press filters pattern
    
      ~~~js
      <PressFilters></PressFilters>
      ~~~
    
    `)(() => {

          // @todo define somewhere so that we can use them whenever we implement this pattern
          const headingLevels = {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6
          };


          // @todo define somewhere so that we can use them whenever we implement this pattern
          const colorOptions = {
            "": "grey (default)",
            green: "green"
          };

          const action = text('Action','#');
          const coloredHeading = {
            coloredHeading: {
              text:  text('Colored Heading Text', "Filter Results"),
              color:  select('Colored Heading Color', colorOptions, ""),
              level: select('Colored Heading Level', headingLevels, 2)
            }
          };

          // @todo define somewhere so that we can use them whenever we implement this pattern
          const topicOptions = [{text: "Select", value: ""},{text: "Topic 1", value: "topic1",}, {text: "Topic 2", value: "topic2"},{text: "Topic 3", value: "topic3"}];

          const topic = {
            label: text('Topic Filter label', "Filter by Topic"),
            id: "topic",
            options: object('Topic Filter options', topicOptions)
          };

          // @todo define somewhere so that we can use them whenever we implement this pattern
          const pressTypeOptions = [{text: "Select", value: ""},{text: "Press Release", value: "press-release",}, {text: "Press Statement", value: "press-statement"},{text: "News Article", value: "news-article"}, {text: "Blog Post", value: "blog-poast"},{text: "Speech", value: "speech"}];

          // @todo define somewhere so that we can use them whenever we implement this pattern
          const pressType = {
            label: text('Press Type label', "Filter by Announcement Type"),
            id: "announcement-type",
            options: object('Press Type Options', pressTypeOptions)
          };

          // If we want to augment the default for the orgSelector uncomment and populate below.
          // const orgSelector = {}

          // @todo define somewhere so that we can use them whenever we implement this pattern
          const defaultStartDate = {labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'mm/dd/yyyy', restrict: 'max'};
          const defaultEndDate = {labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'today', restrict: 'max'};

          const dateRange = {
            label: text('Date Range label', 'Date range'),
            startDate: object('Date Range startDate', defaultStartDate),
            endDate: object('Date Range endDate', defaultEndDate)
          };

          // @todo define somewhere so that we can use them whenever we implement this pattern
          const buttonThemeOptions = {'': 'primary (default)', secondary: 'secondary', quaternary: 'quaternary'};
          const buttonSizeOptions = { '': 'default', small: 'small' };
          const buttonTypeOptions = {"": "no button type", submit: 'submit', reset: 'reset', button: 'button'};

          const submitButton = {
            text: text("Button text", "Submit"),
            type: select("Button type", buttonTypeOptions, "submit"),
            size: select("Button size", buttonSizeOptions, "small"),
            theme: select("Button theme", buttonThemeOptions, ""),
            outline: boolean('Button Outline', false)
          };

          return(<PressFilters action={action} coloredHeading={coloredHeading} topic={topic} pressType={pressType} dateRange={dateRange} submitButton={submitButton}/>)
        })
    );
