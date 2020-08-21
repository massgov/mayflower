import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';
import Paragraph from 'MayflowerReactText/Paragraph';
import OrderedList from 'MayflowerReactLists/OrderedList';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';
import CalloutAlert from './index';
import CalloutAlertDocs from './CalloutAlert.md';

const themeOptions = {
  'c-highlight (default)': '',
  'c-primary': 'c-primary',
  'c-primary-alt': 'c-primary-alt',
  'c-gray-dark': 'c-gray-dark',
  'c-error-red': 'c-error-red',
  'c-white': 'c-white'
};
export const CalloutAlertExample = (args) => {
  const icon = {
    ariaHidden: true,
    name: args.iconName
  };
  return(
    <CalloutAlert {...args} icon={icon}>
      <Paragraph>A paragraph (from the Greek paragraphos, &quot;to write beside&quot; or &quot;written beside&quot;) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</Paragraph>
      <OrderedList />
      <DecorativeLink />
    </CalloutAlert>
  );
};
CalloutAlertExample.storyName = 'Default';
CalloutAlertExample.args = {
  iconName: '',
  theme: ''
};
CalloutAlertExample.argTypes = {
  iconName: {
    control: {
      type: 'select',
      options: Object.fromEntries(
        Object.entries(svgOptions).map(([key, value]) => [`Icon${key[0].toUpperCase() + key.slice(1)}`, value ? `Icon${value[0].toUpperCase() + value.slice(1)}` : value])
      )
    }
  },
  theme: {
    control: {
      type: 'select',
      options: themeOptions
    }
  },
  children: {
    control: {
      disable: true
    }
  }
};
export const CalloutAlertRealData = (args) => {
  const icon = {
    ariaHidden: true,
    name: args.iconName
  };
  return(
    <CalloutAlert {...args} icon={icon}>
      <Paragraph text="<strong>You are required to remit payment to the department starting 7/1.</strong> Because you have more than 25 total employees in Massachusetts." />
      <Paragraph text="<strong>You are required to remit payment on behalf of your contractors.</strong> For employers with over 50% their workforce made up of 1099s need to consider these as full time employees under the new language." />
    </CalloutAlert>
  );
};
CalloutAlertRealData.storyName = 'CalloutAlert with real data';
CalloutAlertRealData.args = {
  iconName: 'IconAlert',
  theme: 'c-primary'
};
CalloutAlertRealData.argTypes = {
  iconName: {
    control: {
      type: 'select',
      options: Object.fromEntries(
        Object.entries(svgOptions).map(([key, value]) => [`Icon${key[0].toUpperCase() + key.slice(1)}`, value ? `Icon${value[0].toUpperCase() + value.slice(1)}` : value])
      )
    }
  },
  theme: {
    control: {
      type: 'select',
      options: themeOptions
    }
  },
  children: {
    control: {
      disable: true
    }
  }
};

export default {
  title: 'organisms/CalloutAlert',
  component: CalloutAlert,
  parameters: {
    docs: {
      page: () => <StoryPage Description={CalloutAlertDocs} />
    }
  }
};
