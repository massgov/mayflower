import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select, object } from '@storybook/addon-knobs/react';

import PressFilters from './PressFilters';

storiesOf('Organisms/By-Author/PressFilters', module).addDecorator(withKnobs)
    .add('PressFilters',
        withInfo(`
      
      ### Description
      
      This is the standard date range pattern
    
      ~~~js
      <PressFilters></PressFilters>
      ~~~
    
    `)(() => {

          const colorOptions = {
            "": "grey (default)",
            green: "green"
          };

          const action = text('Action','#');
          const coloredHeading = {
            coloredHeading: {
              title:  text('title', "Filter Results"),
              color:  select('color', colorOptions),
            }
          };

          const topicOptions = [{text: "Select", value: ""},{text: "Topic 1", value: "topic1",}, {text: "Topic 2", value: "topic2"},{text: "Topic 3", value: "topic3"}];

          const topic = {
            label: text('label', "Filter by Topic"),
            id: text('id', "topic"),
            options: object('topics', topicOptions)
          };

          const pressTypeOptions = [{text: "Select", value: ""},{text: "Press Release", value: "press-release",}, {text: "Press Statement", value: "press-statement"},{text: "News Article", value: "news-article"}, {text: "Blog Post", value: "blog-poast"},{text: "Speech", value: "speech"}];

          const pressType = {
            label: text('label', "Filter by Announcement Type"),
            id: text('id', "announcement-type"),
            options: object('news type', pressTypeOptions)
          };

          // const orgSelector = {}

          const defaultStartDate = {labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'mm/dd/yyyy', restrict: 'max'};
          const defaultEndDate = {labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'today', restrict: 'max'};

          const dateRange = {
            label: text('label', 'Date range'),
            startDate: object('startDate', defaultStartDate),
            endDate: object('endDate', defaultEndDate)
          }
          const submitButton = {
            text: text("text", "Submit"),
            type: text("type", "submit"),
            size: text("size", "small"),
            theme: text('theme',""),
            outline: boolean('outline', false)
          }

          return(<PressFilters action={action} coloredHeading={coloredHeading} topic={topic} pressType={pressType} dateRange={dateRange} submitButton={submitButton}/>)
        })
    );
