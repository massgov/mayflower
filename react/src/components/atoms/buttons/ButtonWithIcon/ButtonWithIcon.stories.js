import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs, text, array, select, boolean
} from '@storybook/addon-knobs';

import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';
import * as Icon from 'MayflowerReactBase/Icon';
import ButtonWithIcon from '.';
import ButtonWithIconDocs from './ButtonWithIcon.md';
import buttonWithIconOptions from './ButtonWithIcon.knobs.options';


storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonWithIcon', (() => {
      const props = {
        onClick: action('ButtonWithIcon clicked'),
        text: text('text', 'Button With Icon'),
        type: select('type', buttonWithIconOptions.type, 'submit'),
        classes: array('classes', []),
        iconSize: select('iconSize', buttonWithIconOptions.iconSize, ''),
        size: select('size', buttonWithIconOptions.size, ''),
        expanded: boolean('expanded', true),
        capitalized: boolean('capitalized', true),
        'arial-label': text('arial-label', ''),
        'aria-haspopup': boolean('aria-haspopup', false),
        theme: select('theme', buttonWithIconOptions.theme),
        usage: select('usage', buttonWithIconOptions.usage)
      };
      // Capitalizes the name of each SVG icon to match
      // what SVGR names components.
      const component = select('name',
        Object.fromEntries(
          Object.entries(svgOptions).map(([key, value]) => [key[0].toUpperCase() + key.slice(1), value ? value[0].toUpperCase() + value.slice(1) : value])
          ),
        'Chevron'
      );
      const SelectedComponent = Icon[component];
      const iconProps = {
        width: 20,
        height: 20
      };
      return(
        <ButtonWithIcon {...props} icon={<SelectedComponent {...iconProps} />} />
      );
    }),
    { info: ButtonWithIconDocs }
  )
  .add(
    'ButtonSearch', (() => {
      const icons = {
        chevron: <Icon.Chevron height={20} width={20} />,
        search: <Icon.Search height={20} width={20} />
      };
      const props = {
        onClick: action('ButtonWithIcon clicked'),
        usage: select('usage', buttonWithIconOptions.usage, '')
      };

      // Set the icon prop to the actual element based on knob selection.
      props.icon = icons[props.icon];

      return(
        <ButtonWithIcon {...props} />
      );
    }),
    { info: ButtonWithIconDocs }
  );
