import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, select, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SelectBox from 'MayflowerReactForms/SelectBox';
import InputTextTypeAhead from 'MayflowerReactForms/InputTextTypeAhead';
import DateRange from 'MayflowerReactForms/DateRange';
import SearchBanner from './index';
import inputOptions from 'MayflowerReactForms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';
import tabsOptions from 'MayflowerReactMolecules/Tabs/Tabs.knobs.options';
import filterBoxSharedProps from 'MayflowerReactOrganisms/FilterBox/FilterBox.props';
// import knob options for child patterns
import buttonOptions from 'MayflowerReactButtons/Button/Button.knobs.options';
import selectBoxOptions from 'MayflowerReactForms/SelectBox/SelectBox.knobs.options';

storiesOf('organisms/SearchBanner', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('SearchBanner', () => {
    const options = inputOptions.options.orgSelector;
    const withOrgDropdown = boolean('withOrgDropdown', true);
    const withFilterBox = boolean('withFilterBox', true);
    const DesktopHidden = boolean('SearchBanner: filterDesktopHidden', false);
    const withTabs = boolean('withTabs', true);
    const props = {
      searchBox: {
        placeholder: text('SearchBanner searchBox: placeholder', 'Search Mass.gov', 'SearchBox'),
        buttonSearch: {
          onClick: (e) => {
            action('SearchBanner searchBox, buttonSearch clicked')(e);
            e.preventDefault();
          },
          ariaLabel: text('SearchBanner searchBox, buttonSearch: ariaLabel', 'Search', 'SearchBox'),
          text: text('SearchBanner searchBox, buttonSearch: text', 'Search', 'SearchBox')
        },
        onSubmit: action('SearchBanner searchBox onSubmit'),
        onChange: action('SearchBanner searchBox onChange'),
        defaultText: text('SearchBanner searchBox: defaultText', '', 'SearchBox')
      }
    };
    if (withTabs) {
      const tabs = object('tabs', tabsOptions.tabValues, 'Tabs');
      const selectedTab = select('tabs selectedTab', tabsOptions.tabValues.map((tab) => tab.value), 'all', 'Tabs');
      props.tabs = {
        tabs,
        handleClick: action('SearchBanner tab clicked'),
        selectedTab
      };
    }
    if (withOrgDropdown) {
      const dropdownButton = object(
        'searchBox, orgDropdown: dropdownButton',
        {
          text: ('All Organizations'),
          capitalized: true
        },
        'Dropdown'
      );
      const inputText = object('searchBox, orgDropdown: inputText', {
        boxed: true,
        label: null,
        placeholder: 'Search an organization...',
        id: 'org-typeahead',
        options,
        selected: '',
        onChange: action('SearchBanner searchBox.orgDropdown.onChange')
      }, 'Dropdown');
      props.searchBox.orgDropdown = {
        dropdownButton,
        inputText
      };
    }
    if (withFilterBox) {
      props.toggleButtonOnClick = action('SearchBanner toggleButtonOnClick');
      props.filterBoxExpanded = boolean('SearchBanner filterBox Expanded?', true, 'FilterBox');
      props.filterDesktopHidden = DesktopHidden;
      props.filterToggleText = text('SearchBanner filterToggleText', 'More Filters', 'FilterBox');
      const organization = {
        label: text('filterBox organization label', 'State organization', 'FilterBox'),
        id: text('filterBox organization id', 'state-organization', 'FilterBox'),
        options: object('filterBox organization options', inputOptions.options.orgSelector, 'FilterBox'),
        selected: select(
          'filterBox organization defaultSelected',
          [''].concat(inputOptions.options.orgSelector.map((option) => option.text)),
          '',
          'FilterBox'
        ),
        placeholder: text('filterBox organization placeholder', 'All Organizations', 'FilterBox'),
        onChange: action('filterBox organization typeahead onChange')
      };
      const pressType = {
        label: text('filterBox pressType label', 'Filter by Type', 'FilterBox'),
        id: text('filterBox pressType id', 'press-type', 'FilterBox'),
        options: object('filterBox pressType options', inputOptions.options.pressTypes, 'FilterBox'),
        selected: select(
          'filterBox pressType defaultSelected',
          [''].concat(inputOptions.options.pressTypes.map((option) => option.text)),
          '',
          'FilterBox'
        ),
        placeholder: text('filterBox pressType placeholder', 'All Types', 'FilterBox'),
        onChange: action('SearchBanner filterBox pressType.typeAhead.onChange')
      };
      const dateRange = {
        label: text('filterBox dateRange label', 'Date range', 'FilterBox'),
        startDate: object('filterBox dateRange startDate', filterBoxSharedProps.startDate, 'FilterBox'),
        endDate: object('filterBox dateRange endDate', filterBoxSharedProps.endDate, 'FilterBox')
      };
      props.filterBox = {
        filterDesktopHidden: DesktopHidden,
        active: boolean('filterBox active', true, 'FilterBox'),
        action: text('filterBox action', '#', 'FilterBox'),
        id: text('filterBox id', 'filter-box', 'FilterBox'),
        fields: [
          {
            class: 'ma__filter-box__organizations ma__filter-box--desktop-hidden',
            component: <InputTextTypeAhead {...organization} />
          },
          {
            class: 'ma__filter-box__type',
            component: <InputTextTypeAhead {...pressType} />
          },
          {
            class: 'ma__filter-box__date',
            component: <DateRange {...dateRange} />
          }
        ],
        submitButton: {
          text: text('filterBox submitButton text', 'Submit', 'FilterBox'),
          type: select('filterBox submitButton type', buttonOptions.type, 'submit', 'FilterBox'),
          size: select('filterBox submitButton size', buttonOptions.size, null, 'FilterBox'),
          theme: select('filterBox submitButton theme', buttonOptions.theme, '', 'FilterBox'),
          usage: select('filterBox submitButton usage', buttonOptions.usage, '', 'FilterBox'),
          outline: boolean('filterBox submitButton outline', false, 'FilterBox'),
          onClick: action('SearchBanner filterBox submitButton.onClick')
        },
        clearButton: {
          text: text('filterBox clearButton text', 'Clear all filters', 'FilterBox'),
          info: text('filterBox clearButton aria-label', 'Clear all filters', 'FilterBox'),
          onClearCallback: action('SearchBanner filterBox clearButton onClearCallback', 'FilterBox')
        }
      };
      if (dateRange) {
        dateRange.startDate.defaultDate = new Date(dateRange.startDate.defaultDate);
        dateRange.endDate.defaultDate = new Date(dateRange.endDate.defaultDate);
      }
    }
    return(<SearchBanner {...props} />);
  })
  // second story
  .add('SearchBanner with postInputFilter', () => {
    const options = inputOptions.options.orgSelector;
    const withOrgDropdown = boolean('withOrgDropdown', false);
    const withFilterBox = boolean('withFilterBox', true);
    const DesktopHidden = boolean('SearchBanner: filterDesktopHidden', false);
    const withTabs = boolean('withTabs', false);
    const selectBoxProps = {
      label: text('selectBox label', '', 'Post Input Filter: SelectBox'),
      stackLabel: boolean('selectBox stackLabel', true, 'Post Input Filter: SelectBox'),
      required: boolean('selectBox required', true, 'Post Input Filter: SelectBox'),
      id: text('selectBox id', 'distance-select', 'Post Input Filter: SelectBox'),
      options: object('selectBox options', selectBoxOptions.options.distance, 'Post Input Filter: SelectBox'),
      selected: select('selectBox defaultSelected', selectBoxOptions.options.distance.map((option) => option.text), selectBoxOptions.options.distance[0].text, 'Post Input Filter: SelectBox'),
      onChangeCallback: action('SelectBox onChangeCallback')
    };
    const props = {
      searchBox: {
        placeholder: text('SearchBanner searchBox: placeholder', 'Search Mass.gov', 'SearchBox'),
        buttonSearch: {
          onClick: (e) => {
            action('SearchBanner searchBox, buttonSearch clicked')(e);
            e.preventDefault();
          },
          ariaLabel: text('SearchBanner searchBox, buttonSearch: ariaLabel', 'Search', 'SearchBox'),
          text: text('SearchBanner searchBox, buttonSearch: text', 'Search', 'SearchBox')
        },
        onSubmit: action('SearchBanner searchBox onSubmit'),
        onChange: action('SearchBanner searchBox onChange'),
        defaultText: text('SearchBanner searchBox: defaultText', '', 'SearchBox'),
        postInputFilter: <SelectBox {...selectBoxProps} />
      }

    };
    if (withTabs) {
      const tabs = object('tabs', tabsOptions.tabValues, 'Tabs');
      const selectedTab = select('tabs selectedTab', tabsOptions.tabValues.map((tab) => tab.value), 'all', 'Tabs');
      props.tabs = {
        tabs,
        handleClick: action('SearchBanner tab clicked'),
        selectedTab
      };
    }
    if (withOrgDropdown) {
      const dropdownButton = object(
        'searchBox, orgDropdown: dropdownButton',
        {
          text: ('All Organizations'),
          capitalized: true
        },
        'Dropdown'
      );
      const inputText = object('searchBox, orgDropdown: inputText', {
        boxed: true,
        label: null,
        placeholder: 'Search an organization...',
        id: 'org-typeahead',
        options,
        selected: '',
        onChange: action('SearchBanner searchBox.orgDropdown.onChange')
      }, 'Dropdown');
      props.searchBox.orgDropdown = {
        dropdownButton,
        inputText
      };
    }
    if (withFilterBox) {
      props.toggleButtonOnClick = action('SearchBanner toggleButtonOnClick');
      props.filterBoxExpanded = boolean('SearchBanner filterBox Expanded?', true, 'FilterBox');
      props.filterDesktopHidden = DesktopHidden;
      props.filterToggleText = text('SearchBanner filterToggleText', 'More Filters', 'FilterBox');
      const postInputFilter = {
        label: text('filterBox topic label', 'Distance Radius', 'FilterBox'),
        stackLabel: boolean('filterBox topic stackLabel', true, 'FilterBox'),
        id: 'distance-select',
        options: object('filterBox topic options', selectBoxOptions.options.distance, 'FilterBox'),
        required: boolean('filterBox topic required', true, 'FilterBox')
      };
      const typeOfCare = {
        label: text('filterBox topic label', 'Type of Care', 'FilterBox'),
        stackLabel: boolean('filterBox topic stackLabel', true, 'FilterBox'),
        id: 'topic',
        options: object('filterBox topic options', selectBoxOptions.options.typeOfCare, 'FilterBox'),
        required: boolean('filterBox topic required', true, 'FilterBox')
      };
      props.filterBox = {
        filterDesktopHidden: DesktopHidden,
        active: boolean('SearchBanner filterBox: active', true, 'FilterBox'),
        action: text('SearchBanner filterBox: action', '#', 'FilterBox'),
        fields: [
          {
            class: 'ma__filter-box__postInputFilter ma__filter-box--desktop-hidden',
            component: <SelectBox {...postInputFilter} />
          },
          {
            class: 'ma__filter-box__type',
            component: <SelectBox {...typeOfCare} />
          }
        ],
        submitButton: {
          text: text('filterBox submitButton text', 'Submit', 'FilterBox'),
          type: select('filterBox submitButton type', buttonOptions.type, 'submit', 'FilterBox'),
          size: select('filterBox submitButton size', buttonOptions.size, null, 'FilterBox'),
          theme: select('filterBox submitButton theme', buttonOptions.theme, '', 'FilterBox'),
          usage: select('filterBox submitButton usage', buttonOptions.usage, '', 'FilterBox'),
          outline: boolean('filterBox submitButton outline', false, 'FilterBox'),
          onClick: action('SearchBanner filterBox submitButton.onClick')
        },
        clearButton: {
          text: text('filterBox clearButton text', 'Clear all filters', 'FilterBox'),
          info: text('filterBox clearButton aria-label', 'Clear all filters', 'FilterBox'),
          onClearCallback: action('SearchBanner filterBox clearButton onClearCallback', 'FilterBox')
        }
      };
      if (props.filterBox.dateRange) {
        props.filterBox.dateRange.startDate.defaultDate = new Date(props.filterBox.dateRange.startDate.defaultDate);
        props.filterBox.dateRange.endDate.defaultDate = new Date(props.filterBox.dateRange.endDate.defaultDate);
      }
    }
    return(<SearchBanner {...props} />);
  });
