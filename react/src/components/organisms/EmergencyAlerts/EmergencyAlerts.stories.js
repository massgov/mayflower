import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, object, boolean } from '@storybook/addon-knobs/react';

import EmergencyAlerts from './index';
import * as Icon from 'MayflowerReactBase/Icon';
import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';
import Link from 'MayflowerReactMolecules/Link';

const themeOptions = {
  'c-warning (default)': 'c-warning',
  'c-primary': 'c-primary',
  'c-primary-alt': 'c-primary-alt',
  'c-gray': 'c-gray',
  'c-error': 'c-error'
};

/* eslint-disable  react/prop-types */
storiesOf('organisms/EmergencyAlerts', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('EmergencyAlerts with Alerts', () => {
    const props = {
      id: text('id', 'GUID18378923w38789'),
      theme: select('theme', {
        ...themeOptions
      }, 'c-warning'),
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
        link: ({ linkClasses, TextElement }) => <Link classes={linkClasses} href="https://www.mass.gov"><TextElement>Read full alert</TextElement></Link>
      }, {
        message: 'The MTBA is operating at a lighter service level, and experiencing delays.',
        timeStamp: '02.15.16, 3:00 p.m.',
        link: ({ linkClasses, TextElement }) => <Link classes={linkClasses} href="https://www.mass.gov"><TextElement>Read full alert</TextElement></Link>
      }, {
        message: 'The Governor directs non-emergency executive branch state employees to not come in to work.',
        timeStamp: '02.13.16, 10:00 a.m.',
        link: ({ linkClasses, TextElement }) => <Link classes={linkClasses} href="https://www.mass.gov"><TextElement>Read full alert</TextElement></Link>
      }])
    };
    return(<EmergencyAlerts {...props} />);
  })
  .add('EmergencyAlerts without Alerts', () => {
    // Capitalizes the name of each SVG icon to match
    // what SVGR names components.
    const component = select('Icon: name',
      Object.fromEntries(
        Object.entries(svgOptions).map(([key, value]) => [key[0].toUpperCase() + key.slice(1), value ? value[0].toUpperCase() + value.slice(1) : value])
        ),
      'Opennow',
    );
    const SelectedComponent = Icon[component];
    const titleText = text('title', 'Our new & improved Boston office is now open!');
    const props = {
      id: text('id', 'GUID18378923w38789'),
      theme: select('theme', {
        ...themeOptions
      }, 'c-primary-alt'),
      emergencyHeader: object('emergencyHeader', {
        prefix: 'Updates',
      }),
      buttonClose: boolean('buttonClose', true)
    };
    // Having the title and icon in the object causes storybook knobs to error.
    props.emergencyHeader.title = ({ linkClasses }) => <a className={linkClasses} href="https://www.mass.gov">{titleText}</a>;
    props.emergencyHeader.icon = (!component) ? null : <SelectedComponent />;

    return(<EmergencyAlerts {...props} />);
  });
