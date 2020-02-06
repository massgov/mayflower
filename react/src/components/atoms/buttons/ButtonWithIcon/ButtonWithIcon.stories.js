import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, array, select, boolean } from '@storybook/addon-knobs';

import ButtonWithIcon from '.';
import ButtonWithIconDocs from './ButtonWithIcon.md';
import buttonWithIconOptions from './ButtonWithIcon.knobs.options';

import Icon from '../../../base/Icon';
import { svgOptions } from '../../Icon/Icon.knob.options';

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
      const iconProps = {
        name: select('name', svgOptions, 'chevron'),
        svgWidth: 20,
        svgHeight: 20
      };
      return(
        <ButtonWithIcon {...props} icon={<Icon {...iconProps} />} />
      );
    }),
    { info: ButtonWithIconDocs }
  )
  .add(
    'ButtonSearch', (() => {
      const icons = {
        chevron: <Icon name="chevron" svgHeight={20} svgWidth={20} />,
        search: <Icon name="search" svgHeight={20} svgWidth={20} />
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
