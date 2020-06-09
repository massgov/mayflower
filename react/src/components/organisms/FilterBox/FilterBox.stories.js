import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select, object, optionsKnob } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import InputTextTypeAhead from 'MayflowerReactForms/InputTextTypeAhead';
import SelectBox from 'MayflowerReactForms/SelectBox';
import DateRange from 'MayflowerReactForms/DateRange';

import FilterBox from '.';
import sharedProps from './FilterBox.props';
// import knob options for child patterns
import buttonOptions from 'MayflowerReactButtons/Button/Button.knobs.options';
import selectBoxOptions from 'MayflowerReactForms/SelectBox/SelectBox.knobs.options';
import inputOptions from 'MayflowerReactForms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('FilterBox', () => {
    const organization = {
      label: text('Filterbox organization: label', 'State organization', 'Organization'),
      id: text('Filterbox organization: id', 'state-organization', 'Organization'),
      options: object('Filterbox organization: options', inputOptions.options.orgSelector, 'Organization'),
      selected: optionsKnob(
        'Filterbox organization: selected',
        Object.assign({}, ...inputOptions.options.orgSelector.map((option) => ({ [option.text]: option.text })).values()),
        inputOptions.options.orgSelector[0].text,
        { display: 'select' },
        'Organization'
      ),
      placeholder: text('Filterbox organization: placeholder', 'All Organizations', 'Organization'),
      onChange: action('Filterbox organization typeahead onChange')
    };
    const topic = {
      label: text('Filterbox topic: label', 'Filter by Topic', 'Topic'),
      stackLabel: boolean('Filterbox topic: stackLabel', true, 'Topic'),
      id: 'topic',
      options: object('Filterbox topic: options', selectBoxOptions.options.topics, 'Topic'),
      selected: optionsKnob(
        'Filterbox topic: selected',
        Object.assign({}, ...(selectBoxOptions.options.topics.map((option) => ({ [option.text]: option.text })).values())),
        selectBoxOptions.options.topics[0].text,
        { display: 'select' },
        'Topic'
      ),
      required: boolean('Filterbox topic: required', true, 'Topic')
    };
    const dateRange = {
      label: text('Filterbox dateRange: label', 'Date range', 'Date Range'),
      startDate: object('Filterbox dateRange: startDate', sharedProps.startDate, 'Date Range'),
      endDate: object('Filterbox dateRange: endDate', sharedProps.endDate, 'Date Range')
    };
    const type = {
      label: text('Filterbox pressType: label', 'Filter by Type', 'Press Type'),
      id: text('Filterbox pressType: id', 'press-type', 'Press Type'),
      options: object('Filterbox pressType: options', inputOptions.options.pressTypes, 'Press Type'),
      selected: select(
        'Filterbox pressType: selected',
        [''].concat(inputOptions.options.pressTypes.map((option) => option.text)),
        '',
        'Press Type'
      ),
      placeholder: text('Filterbox pressType: placeholder', 'All Types', 'Press Type'),
      onChange: action('Filterbox pressType typeahead onChange')
    };
    const props = {
      active: boolean('Filterbox active', true),
      action: text('Filterbox action', '#'),
      filterLabel: text('Filterbox label', 'Mass.gov search results filter'),
      filterNote: text('Filterbox note', 'This is an additional note for the SR users'),
      pressType: {},
      submitButton: {
        text: text('Filterbox submitButton: text', 'Submit', 'Submit Button'),
        type: select('Filterbox submitButton: type', buttonOptions.type, 'submit', 'Submit Button'),
        size: select('Filterbox submitButton: size', buttonOptions.size, null, 'Submit Button'),
        theme: select('Filterbox submitButton: theme', buttonOptions.theme, '', 'Submit Button'),
        usage: select('Filterbox submitButton: usage', buttonOptions.usage, '', 'Submit Button'),
        outline: boolean('Filterbox submitButton: outline', false, 'Submit Button'),
        onClick: action('FilterBox submitButton: onClick')
      },
      clearButton: {
        text: text('Filterbox clearButton: text', 'Clear all filters', 'Clear Button'),
        info: text('Filterbox clearButton: aria-label', 'Clear all filters', 'Clear Button'),
        onClearCallback: action('FilterBox clearButton onClearCallback')
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
  });
