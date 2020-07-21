import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import EmergencyHeader from '.';
import * as Icon from 'MayflowerReactBase/Icon';
import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';

/* eslint-disable react/prop-types */
storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('EmergencyHeader', (() => {
    // Capitalizes the name of each SVG icon to match
    // what SVGR names components.
    const component = select('Icon: name',
      Object.fromEntries(
        Object.entries(svgOptions).map(([key, value]) => [key[0].toUpperCase() + key.slice(1), value ? value[0].toUpperCase() + value.slice(1) : value])
        ),
      'Alert'
    );
    const SelectedComponent = Icon[component];
    const titleText = text('title', 'The State is experiencing severe weather due to the winter storm Paula.');
    const props = {
      title: ({ linkClasses }) => <a className={linkClasses} href="https://www.mass.gov">{titleText}</a>,
      theme: select('theme', {
        'c-warning (default)': 'c-warning',
        'c-primary': 'c-primary',
        'c-primary-alt': 'c-primary-alt',
        'c-error': 'c-error',
        'c-gray': 'c-gray'
      }, 'c-warning'),
      prefix: text('prefix', 'Emergency Alerts'),
      icon: (!component) ? null : <SelectedComponent />
    };
    return(<EmergencyHeader {...props} />);
  }));
