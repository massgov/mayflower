import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import EmergencyHeader from '.';
import Icon from '../../atoms/Icon';
import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';

/* eslint-disable react/prop-types */
storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('EmergencyHeader', (() => {
    const iconName = select('Icon: name', svgOptions, 'alert');
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
      icon: (!iconName) ? null : <Icon name={iconName} />
    };
    return(<EmergencyHeader {...props} />);
  }));
