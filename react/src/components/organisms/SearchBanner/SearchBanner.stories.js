import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';
import SelectBox from 'MayflowerReactForms/SelectBox';
import InputTextFuzzy from 'MayflowerReactForms/InputTextFuzzy';
import DateRange from 'MayflowerReactForms/DateRange';
import inputOptions from 'MayflowerReactForms/InputTextFuzzy/InputTextFuzzy.knobs.options';
import tabsOptions from 'MayflowerReactMolecules/Tabs/Tabs.knobs.options';
import filterBoxSharedProps from 'MayflowerReactOrganisms/FilterBox/FilterBox.props';
// import knob options for child patterns
import buttonOptions from 'MayflowerReactButtons/Button/Button.knobs.options';
import selectBoxOptions from 'MayflowerReactForms/SelectBox/SelectBox.knobs.options';
import SearchBanner from './index';

export const SearchBannerExample = (args) => {
  const {
    withPostInputFilter, withTabs, withOrgDropdown, withFilterBox, ...rest
  } = args;
  const props = {
    ...rest
  };
  if (withTabs) {
    props.tabs = {
      tabs: tabsOptions.tabValues,
      handleClick: action('SearchBanner tab clicked'),
      selectedTab: 'all'
    };
  }
  if (withOrgDropdown) {
    props.searchBox.orgDropdown = {
      dropdownButton: {
        text: ('All Organizations'),
        capitalized: true
      },
      inputText: {
        boxed: true,
        label: null,
        keys: ['text'],
        placeholder: 'Search an organization...',
        id: 'org-typeahead',
        options: inputOptions.options.orgSelector,
        selected: '',
        onChange: action('SearchBanner searchBox.orgDropdown.onChange')
      }
    };
  } else {
    props.searchBox.orgDropdown = null;
  }
  if (withFilterBox) {
    props.filterBox = {
      filterDesktopHidden: false,
      active: true,
      action: '#',
      id: 'filter-box',
      fields: [
        {
          class: 'ma__filter-box__organizations ma__filter-box--desktop-hidden',
          component: (
            <InputTextFuzzy
              label="State organization"
              id="state-organization"
              options={inputOptions.options.orgSelector.filter((option) => option.text !== '')}
              keys={['text']}
              selected=""
              placeholder="All Organizations"
              onChange={action('Filterbox organization onChange')}
            />
          )
        },
        {
          class: 'ma__filter-box__type',
          component: (
            <InputTextFuzzy
              label="Filter by Type"
              id="press-type"
              keys={['text']}
              options={inputOptions.options.pressTypes}
              selected=""
              placeholder="All Types"
              onChange={action('Filterbox pressType onChange')}
            />
          )
        },
        {
          class: 'ma__filter-box__date',
          component: (
            <DateRange
              label="Date range"
              startDate={{
                ...filterBoxSharedProps.startDate,
                defaultDate: new Date()
              }}
              endDate={{
                ...filterBoxSharedProps.endDate,
                defaultDate: new Date()
              }}
            />
          )
        }
      ],
      submitButton: {
        text: 'Submit',
        type: 'submit',
        size: null,
        theme: '',
        usage: '',
        outline: false,
        onClick: action('SearchBanner filterBox submitButton.onClick')
      },
      clearButton: {
        text: 'Clear all filters',
        info: 'Clear all filters',
        onClearCallback: action('SearchBanner filterBox clearButton onClearCallback')
      }
    };
  } else {
    props.filterBox = null;
  }
  if (withPostInputFilter) {
    props.searchBox.postInputFilter = (
      <SelectBox
        label=""
        stackLabel
        required
        id="distance-select"
        options={selectBoxOptions.options.distance}
        selected={selectBoxOptions.options.distance[0].text}
        onChangeCallback={action('SelectBox onChangeCallback')}
      />
    );
  } else {
    props.searchBox.postInputFilter = null;
  }
  return<SearchBanner {...props} />;
};

SearchBannerExample.storyName = 'Default';
SearchBannerExample.argTypes = {
  withTabs: {
    control: {
      type: 'boolean'
    }
  },
  withPostInputFilter: {
    control: {
      type: 'boolean'
    }
  },
  withOrgDropdown: {
    control: {
      type: 'boolean'
    }
  },
  withFilterBox: {
    control: {
      type: 'boolean'
    }
  },
  filterBoxExpanded: {
    control: {
      type: 'boolean'
    }
  },
  filterDesktopHidden: {
    control: {
      type: 'boolean'
    }
  },
  searchBox: {
    control: {
      disable: true
    }
  },
  tabs: {
    control: {
      disable: true
    }
  },
  filterBox: {
    control: {
      disable: true
    }
  }
};
SearchBannerExample.args = {
  DesktopHidden: false,
  withTabs: true,
  withPostInputFilter: false,
  withOrgDropdown: true,
  withFilterBox: true,
  searchBox: {
    placeholder: 'Search Mass.gov',
    buttonSearch: {
      onClick: (e) => {
        action('SearchBanner searchBox, buttonSearch clicked')(e);
        e.preventDefault();
      },
      'aria-label': 'Search',
      text: 'Search'
    },
    onSubmit: action('SearchBanner searchBox onSubmit'),
    onChange: action('SearchBanner searchBox onChange'),
    defaultText: ''
  },
  toggleButtonOnClick: action('SearchBanner toggleButtonOnClick'),
  filterBoxExpanded: false,
  filterDesktopHidden: false,
  filterToggleText: 'More Filters'
};

export default {
  title: 'organisms/SearchBanner',
  component: SearchBanner,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
