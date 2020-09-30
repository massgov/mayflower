import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import * as Icon from 'MayflowerReactBase/Icon';
import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';
import Link from 'MayflowerReactMolecules/Link';
import EmergencyAlerts from './index';

const themeOptions = {
  'c-warning (default)': 'c-warning',
  'c-primary': 'c-primary',
  'c-primary-alt': 'c-primary-alt',
  'c-gray': 'c-gray',
  'c-error': 'c-error'
};

export const EmergencyAlertsExample = (args) => (<EmergencyAlerts {...args} />);

EmergencyAlertsExample.storyName = 'Default';
EmergencyAlertsExample.args = {
  id: 'GUID18378923w38789',
  title: '',
  theme: 'c-warning',
  buttonAlert: {
    hideText: 'Hide ',
    showText: 'Show ',
    text: 'Updates'
  },
  emergencyHeader: {
    title: 'The State is experiencing severe weather due to the winter storm Paula.'
  },
  alerts: [{
    message: 'MassPort is operating with limited flights due to road closures.',
    timeStamp: '02.15.16, 5:00 p.m.',
    link: ({ linkClasses, TextElement }) => <Link classes={linkClasses} href="https://www.mass.gov"><TextElement>Read full alert</TextElement></Link>
  }, {
    message: 'The MTBA is operating at a lighter service level, and experiencing delays.',
    timeStamp: '02.15.16, 3:00 p.m.',
    link: ({ linkClasses, TextElement }) => <Link classes={linkClasses} href="https://www.mass.gov"><TextElement>Read full alert</TextElement></Link>
  }, {
    message: 'The Governor directs non-emergency executive branch state employees to not come in to work.',
    timeStamp: '02.13.16, 10:00 a.m.',
    link: ({ linkClasses, TextElement }) => <Link classes={linkClasses} href="https://www.mass.gov"><TextElement>Read full alert</TextElement></Link>
  }]
};
EmergencyAlertsExample.argTypes = {
  theme: {
    control: {
      type: 'select',
      options: themeOptions
    }
  }
};
export const EmergencyAlertsWithoutAlerts = (args) => {
  const { emergencyHeader, title, icon, ...rest } = args;
  emergencyHeader.title = title;
  const SelectedComponent = Icon[args.iconName];
  emergencyHeader.icon = <SelectedComponent />;

  return(<EmergencyAlerts {...rest} emergencyHeader={emergencyHeader} />);
};
EmergencyAlertsWithoutAlerts.storyName = 'EmergencyAlerts without Alerts';
EmergencyAlertsWithoutAlerts.args = {
  id: 'GUID18378923w38789',
  theme: 'c-primary-alt',
  emergencyHeader: {
    prefix: 'Updates'
  },
  buttonClose: true,
  title: ({ linkClasses }) => <a className={linkClasses} href="https://www.mass.gov">Our new & improved Boston office is now open!</a>,
  iconName: 'IconOpennow'
};
EmergencyAlertsWithoutAlerts.argTypes = {
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
  }
};
export default {
  title: 'organisms/EmergencyAlerts',
  component: EmergencyAlerts,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
