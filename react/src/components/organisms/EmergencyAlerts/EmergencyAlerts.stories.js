import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, object } from '@storybook/addon-knobs/react';

import EmergencyAlerts from './index';
import Icon from '../../atoms/icons/Icon';
import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';

const themeOptions = {
  'c-highlight (default)': 'c-highlight',
  'c-primary': 'c-primary',
  'c-primary-alt': 'c-primary-alt',
  'c-gray-dark': 'c-gray-dark',
  'c-error-red': 'c-error-red',
  'c-white': 'c-white'
};

storiesOf('organisms/EmergencyAlerts', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('EmergencyAlerts with Alerts', (() => {
    const props = {
      id: text('id', 'GUID18378923w38789'),
      theme: select('theme', {
        'c-highlight (default)': 'c-highlight',
        'c-primary': 'c-primary',
        'c-primary-alt': 'c-primary-alt',
        'c-error': 'c-error',
        'c-gray': 'c-gray'
      }, 'c-highlight'),
      buttonAlert: object('buttonAlert', {
        hideText: 'Hide ',
        showText: 'Show ',
        text: 'Updates'
      }),
      emergencyHeader: object('emergencyHeader', {
        title: 'The State is experiencing severe weather due to the winter storm Paula.'
      }),
      alerts: object('alerts', [{
        message: 'MassPort is operating with limited flights due to road closures.',
        timeStamp: '02.15.16, 5:00 p.m.',
        link: {
          href: '#',
          text: 'Read full alert',
          chevron: true
        }
      }, {
        message: 'The MTBA is operating at a lighter service level, and experiencing delays.',
        timeStamp: '02.15.16, 3:00 p.m.',
        link: {
          href: '#',
          text: 'Read full alert',
          chevron: true
        }
      }, {
        message: 'The Governor directs non-emergency executive branch state employees to not come in to work.',
        timeStamp: '02.13.16, 10:00 a.m.',
        link: {
          href: '#',
          text: 'Read full alert',
          chevron: true
        }
      }])
    };
    return(<EmergencyAlerts {...props} />);
  }))
  .add('EmergencyAlerts without Alerts', (() => {
    const iconName = select('Icon: name', svgOptions, 'opennow');
    const titleText = text('title', 'Our new & improved Boston office is now open!');
    const props = {
      id: text('id', 'GUID18378923w38789'),
      theme: select('theme', {
        'c-highlight (default)': 'c-highlight',
        'c-primary': 'c-primary',
        'c-primary-alt': 'c-primary-alt',
        'c-error': 'c-error',
        'c-gray': 'c-gray'
      }, 'c-primary-alt'),
      emergencyHeader: object('emergencyHeader', {
        prefix: 'Updates',
        icon: (!iconName) ? null : <Icon name={iconName} />,
        title: ({ theme, linkClasses }) => <a className={linkClasses} href="https://www.mass.gov">{titleText}</a>
      })
    };
    return(<EmergencyAlerts {...props} />);
  }));
