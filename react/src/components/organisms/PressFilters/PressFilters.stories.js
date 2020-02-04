import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import PressFilters from './index';
import PressFiltersDocs from './PressFilters.md';
// import knob options for child patterns
import buttonOptions from '../../atoms/buttons/Button/Button.knobs.options';
import headingOptions from '../../atoms/headings/Headings.knobs.options';
import coloredHeadingOptions from '../../atoms/headings/ColoredHeading/ColoredHeading.knobs.options';
import selectBoxOptions from '../../forms/SelectBox/SelectBox.knobs.options';
import inputOptions from '../../forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';
import orgSelectorOptions from '../../forms/OrgSelector/OrgSelector.knobs.options';

storiesOf('organisms/PressFilters', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'SelectBox Only', () => {
      const defaultHeadingLevel = '2';
      const pressFiltersStartDate = {
        labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'm/dd/yyyy', restrict: 'max'
      };
      const pressFiltersEndDate = {
        labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'today', restrict: 'max'
      };
      const hideTopic = select('PressFilters hideTopic', { hide: 'Hide', show: 'Show' }, 'show');
      const props = {
        action: text('PressFilters action', '#'),
        coloredHeading: {
          text: text('PressFilters coloredHeading: text', 'Filter Results', 'ColoredHeading'),
          color: select('PressFilters coloredHeading: color', coloredHeadingOptions.color, 'blue', 'ColoredHeading'),
          level: select('PressFilters coloredHeading: level', headingOptions.levels, defaultHeadingLevel, 'ColoredHeading')
        },
        orgSelector: {
          organizations: object('PressFilters orgSelector: organizations', orgSelectorOptions.organizations, 'OrgSelector: organizations'),
          onChangeOrgCallback: action('PressFilters onChangeOrgCallback')
        },
        topic: ((hideTopic === 'show') ? {
          label: text('PressFilters topic: label', 'Filter by Topic', 'Topic'),
          stackLabel: boolean('PressFilters topic: stackLabel', true, 'Topic'),
          id: 'topic',
          options: object('PressFilters topic: options', selectBoxOptions.options.topics, 'Topic'),
          required: boolean('PressFilters topic: required', true, 'Topic')
        } : null),
        pressType: {},
        dateRange: {
          label: text('PressFilters dateRange: label', 'Date range', 'Date Range'),
          startDate: object('PressFilters dateRange: startDate', pressFiltersStartDate, 'Date Range'),
          endDate: object('PressFilters dateRange: endDate', pressFiltersEndDate, 'Date Range')
        },
        submitButton: {
          text: text('PressFilters submitButton: text', 'Submit', 'Submit Button'),
          type: select('PressFilters submitButton: type', buttonOptions.type, 'submit', 'Submit Button'),
          size: select('PressFilters submitButton: size', buttonOptions.size, 'Submit Button'),
          theme: select('PressFilters submitButton: theme', buttonOptions.theme, '', 'Submit Button'),
          outline: boolean('PressFilters submitButton: outline', false, 'Submit Button'),
          onClick: action('PressFilters submitButton clicked')
        },
        clearButton: {
          text: text('PressFilters clearButton: text', 'Clear all filters', 'Clear Button'),
          info: text('PressFilters clearButton: aria-label', 'Clear all filters', 'Clear Button'),
          onClearCallback: action('pressFilters on clearAll')
        }
      };
      props.orgSelector.selectBox = {
        label: text('orgSelector selectBox: label', 'State organization', 'OrgSelector'),
        id: text('orgSelector selectBox: id', 'state-organization', 'OrgSelector'),
        options: object('orgSelector selectBox: options', selectBoxOptions.options.orgSelector, 'OrgSelector'),
        selected: select('orgSelector selectBox: defaultSelected', selectBoxOptions.options.orgSelector.map((option) => option.text), selectBoxOptions.options.orgSelector[0].text, 'OrgSelector')
      };
      props.pressType.selectBox = {
        label: text('PressFilters pressType: label', 'Filter by Announcement Type', 'PressType'),
        stackLabel: boolean('PressFilters pressType: stackLabel', true, 'PressType'),
        id: 'announcement-type',
        options: object('PressFilters pressType: options', selectBoxOptions.options.pressTypes, 'PressType'),
        required: boolean('PressFilters pressType: required', true, 'PressType')
      };
      return(<PressFilters {...props} />);
    },
    { info: PressFiltersDocs }
  )
  .add(
    'TypeAhead Only', () => {
      const defaultHeadingLevel = '2';
      const pressFiltersStartDate = {
        labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'm/dd/yyyy', restrict: 'max'
      };
      const pressFiltersEndDate = {
        labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'today', restrict: 'max'
      };
      const hideTopic = select('PressFilters hideTopic', { hide: 'Hide', show: 'Show' }, 'show');
      const props = {
        action: text('PressFilters action', '#'),
        coloredHeading: {
          text: text('PressFilters coloredHeading: text', 'Filter Results', 'ColoredHeading'),
          color: select('PressFilters coloredHeading: color', coloredHeadingOptions.color, 'blue', 'ColoredHeading'),
          level: select('PressFilters coloredHeading: level', headingOptions.levels, defaultHeadingLevel, 'ColoredHeading')
        },
        orgSelector: {
          organizations: object('PressFilters orgSelector: organizations', orgSelectorOptions.organizations, 'OrgSelector: organizations'),
          onChangeOrgCallback: action('PressFilters onChangeOrgCallback')
        },
        topic: ((hideTopic === 'show') ? {
          label: text('PressFilters topic: label', 'Filter by Topic', 'Topic'),
          stackLabel: boolean('PressFilters topic: stackLabel', true, 'Topic'),
          id: 'topic',
          options: object('PressFilters topic: options', selectBoxOptions.options.topics, 'Topic'),
          required: boolean('PressFilters topic: required', true, 'Topic')
        } : null),
        pressType: {},
        dateRange: {
          label: text('PressFilters dateRange: label', 'Date range', 'Date Range'),
          startDate: object('PressFilters dateRange: startDate', pressFiltersStartDate, 'Date Range'),
          endDate: object('PressFilters dateRange: endDate', pressFiltersEndDate, 'Date Range')
        },
        submitButton: {
          text: text('PressFilters submitButton: text', 'Submit', 'Submit Button'),
          type: select('PressFilters submitButton: type', buttonOptions.type, 'submit', 'Submit Button'),
          size: select('PressFilters submitButton: size', buttonOptions.size, 'Submit Button'),
          theme: select('PressFilters submitButton: theme', buttonOptions.theme, '', 'Submit Button'),
          outline: boolean('PressFilters submitButton: outline', false, 'Submit Button'),
          onClick: action('PressFilters submitButton clicked')
        },
        clearButton: {
          text: text('PressFilters clearButton: text', 'Clear all filters', 'Clear Button'),
          info: text('PressFilters clearButton: aria-label', 'Clear all filters', 'Clear Button'),
          onClearCallback: action('pressFilters on clearAll')
        }
      };

      props.orgSelector.typeAhead = {
        label: text('orgSelector typeAhead: label', 'State organization', 'OrgSelector'),
        id: text('orgSelector typeAhead: id', 'state-organization', 'OrgSelector'),
        options: object('orgSelector typeAhead: options', inputOptions.options.orgSelector, 'OrgSelector'),
        selected: select(
          'orgSelector defaultSelected',
          [''].concat(inputOptions.options.orgSelector.map((option) => option.text)),
          '',
          'OrgSelector'
        ),
        placeholder: text('orgSelector typeAhead: placeholder', 'All Organizations', 'OrgSelector'),
        onChange: action('PressFilters orgSelector typeahead onChange')
      };

      props.pressType.typeAhead = {
        label: text('PressFilters pressType: label', 'Filter by Announcement Type', 'PressType'),
        id: text('PressFilters pressType: id', 'press-type', 'PressType'),
        options: object('PressFilters pressType: options', inputOptions.options.pressTypes, 'PressType'),
        selected: select(
          'PressFilters pressType: defaultSelected',
          [''].concat(inputOptions.options.pressTypes.map((option) => option.text)),
          '',
          'PressType'
        ),
        placeholder: text('PressFilters pressType: placeholder', 'All Types', 'PressType'),
        onChange: action('PressFilters pressType typeahead onChange')
      };
      return(<PressFilters {...props} />);
    },
    { info: PressFiltersDocs }
  )
  .add(
    'OrgSelector using TypeAhead and PressType using SelectBox', () => {
      const defaultHeadingLevel = '2';
      const pressFiltersStartDate = {
        labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'm/dd/yyyy', restrict: 'max'
      };
      const pressFiltersEndDate = {
        labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'today', restrict: 'max'
      };
      const hideTopic = select('PressFilters hideTopic', { hide: 'Hide', show: 'Show' }, 'show');
      const props = {
        action: text('PressFilters action', '#'),
        coloredHeading: {
          text: text('PressFilters coloredHeading: text', 'Filter Results', 'ColoredHeading'),
          color: select('PressFilters coloredHeading: color', coloredHeadingOptions.color, 'blue', 'ColoredHeading'),
          level: select('PressFilters coloredHeading: level', headingOptions.levels, defaultHeadingLevel, 'ColoredHeading')
        },
        orgSelector: {
          organizations: object('PressFilters orgSelector: organizations', orgSelectorOptions.organizations, 'OrgSelector: organizations'),
          onChangeOrgCallback: action('PressFilters onChangeOrgCallback')
        },
        topic: ((hideTopic === 'show') ? {
          label: text('PressFilters topic: label', 'Filter by Topic', 'Topic'),
          stackLabel: boolean('PressFilters topic: stackLabel', true, 'Topic'),
          id: 'topic',
          options: object('PressFilters topic: options', selectBoxOptions.options.topics, 'Topic'),
          required: boolean('PressFilters topic: required', true, 'Topic')
        } : null),
        pressType: {},
        dateRange: {
          label: text('PressFilters dateRange: label', 'Date range', 'Date Range'),
          startDate: object('PressFilters dateRange: startDate', pressFiltersStartDate, 'Date Range'),
          endDate: object('PressFilters dateRange: endDate', pressFiltersEndDate, 'Date Range')
        },
        submitButton: {
          text: text('PressFilters submitButton: text', 'Submit', 'Submit Button'),
          type: select('PressFilters submitButton: type', buttonOptions.type, 'submit', 'Submit Button'),
          size: select('PressFilters submitButton: size', buttonOptions.size, 'Submit Button'),
          theme: select('PressFilters submitButton: theme', buttonOptions.theme, '', 'Submit Button'),
          outline: boolean('PressFilters submitButton: outline', false, 'Submit Button'),
          onClick: action('PressFilters submitButton clicked')
        },
        clearButton: {
          text: text('PressFilters clearButton: text', 'Clear all filters', 'Clear Button'),
          info: text('PressFilters clearButton: aria-label', 'Clear all filters', 'Clear Button'),
          onClearCallback: action('pressFilters on clearAll')
        }
      };
      props.orgSelector.typeAhead = {
        label: text('orgSelector typeAhead: label', 'State organization', 'OrgSelector'),
        id: text('orgSelector typeAhead: id', 'state-organization', 'OrgSelector'),
        options: object('orgSelector typeAhead: options', inputOptions.options.orgSelector, 'OrgSelector'),
        selected: select(
          'orgSelector defaultSelected',
          [''].concat(inputOptions.options.orgSelector.map((option) => option.text)),
          '',
          'OrgSelector'
        ),
        placeholder: text('orgSelector typeAhead: placeholder', 'All Organizations', 'OrgSelector'),
        onChange: action('PressFilters orgSelector typeahead onChange')
      };
      props.pressType.selectBox = {
        label: text('PressFilters pressType: label', 'Filter by Announcement Type', 'PressType'),
        stackLabel: boolean('PressFilters pressType: stackLabel', true, 'PressType'),
        id: 'announcement-type',
        options: object('PressFilters pressType: options', selectBoxOptions.options.pressTypes, 'PressType'),
        required: boolean('PressFilters pressType: required', true, 'PressType')
      };
      return(<PressFilters {...props} />);
    },
    { info: PressFiltersDocs }
  )
  .add(
    'OrgSelector using SelectBox and PressType using TypeAhead', () => {
      const defaultHeadingLevel = '2';
      const pressFiltersStartDate = {
        labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'm/dd/yyyy', restrict: 'max'
      };
      const pressFiltersEndDate = {
        labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'today', restrict: 'max'
      };
      const hideTopic = select('PressFilters hideTopic', { hide: 'Hide', show: 'Show' }, 'show');
      const props = {
        action: text('PressFilters action', '#'),
        coloredHeading: {
          text: text('PressFilters coloredHeading: text', 'Filter Results', 'ColoredHeading'),
          color: select('PressFilters coloredHeading: color', coloredHeadingOptions.color, 'blue', 'ColoredHeading'),
          level: select('PressFilters coloredHeading: level', headingOptions.levels, defaultHeadingLevel, 'ColoredHeading')
        },
        orgSelector: {
          organizations: object('PressFilters orgSelector: organizations', orgSelectorOptions.organizations, 'OrgSelector: organizations'),
          onChangeOrgCallback: action('PressFilters onChangeOrgCallback')
        },
        topic: ((hideTopic === 'show') ? {
          label: text('PressFilters topic: label', 'Filter by Topic', 'Topic'),
          stackLabel: boolean('PressFilters topic: stackLabel', true, 'Topic'),
          id: 'topic',
          options: object('PressFilters topic: options', selectBoxOptions.options.topics, 'Topic'),
          required: boolean('PressFilters topic: required', true, 'Topic')
        } : null),
        pressType: {},
        dateRange: {
          label: text('PressFilters dateRange: label', 'Date range', 'Date Range'),
          startDate: object('PressFilters dateRange: startDate', pressFiltersStartDate, 'Date Range'),
          endDate: object('PressFilters dateRange: endDate', pressFiltersEndDate, 'Date Range')
        },
        submitButton: {
          text: text('PressFilters submitButton: text', 'Submit', 'Submit Button'),
          type: select('PressFilters submitButton: type', buttonOptions.type, 'submit', 'Submit Button'),
          size: select('PressFilters submitButton: size', buttonOptions.size, 'Submit Button'),
          theme: select('PressFilters submitButton: theme', buttonOptions.theme, '', 'Submit Button'),
          outline: boolean('PressFilters submitButton: outline', false, 'Submit Button'),
          onClick: action('PressFilters submitButton clicked')
        },
        clearButton: {
          text: text('PressFilters clearButton: text', 'Clear all filters', 'Clear Button'),
          info: text('PressFilters clearButton: aria-label', 'Clear all filters', 'Clear Button'),
          onClearCallback: action('pressFilters on clearAll')
        }
      };
      props.orgSelector.selectBox = {
        label: text('orgSelector selectBox: label', 'State organization', 'OrgSelector'),
        id: text('orgSelector selectBox: id', 'state-organization', 'OrgSelector'),
        options: object('orgSelector selectBox: options', selectBoxOptions.options.orgSelector, 'OrgSelector'),
        selected: select('orgSelector selectBox: defaultSelected', selectBoxOptions.options.orgSelector.map((option) => option.text), selectBoxOptions.options.orgSelector[0].text, 'OrgSelector')
      };
      props.pressType.typeAhead = {
        label: text('PressFilters pressType: label', 'Filter by Announcement Type', 'PressType'),
        id: text('PressFilters pressType: id', 'press-type', 'PressType'),
        options: object('PressFilters pressType: options', inputOptions.options.pressTypes, 'PressType'),
        selected: select(
          'PressFilters pressType: defaultSelected',
          [''].concat(inputOptions.options.pressTypes.map((option) => option.text)),
          '',
          'PressType'
        ),
        placeholder: text('PressFilters pressType: placeholder', 'All Types', 'PressType'),
        onChange: action('PressFilters pressType typeahead onChange')
      };
      return(<PressFilters {...props} />);
    },
    { info: PressFiltersDocs }
  );
