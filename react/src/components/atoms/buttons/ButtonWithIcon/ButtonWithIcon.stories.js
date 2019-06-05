import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, array, select, boolean } from '@storybook/addon-knobs';

import ButtonWithIcon from '.';
import ButtonWithIconDocs from './ButtonWithIcon.md';
import buttonWithIconOptions from './ButtonWithIcon.knob.options';

import Icon from '../../icons/Icon';



storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonWithIcon', (() => {
      const icons = {
        chevron: <Icon name="chevron" svgHeight={20} svgWidth={20} />,
        search: <Icon name="search" svgHeight={20} svgWidth={20} />
      };
      const props = {
        onClick: action('ButtonWithIcon clicked'),
        text: text('text', 'Button With Icon'),
        type: select('type', buttonWithIconOptions.type, 'submit'),
        classes: array('classes', []),
        icon: select('icon', Object.keys(icons), 'chevron'),
        iconSize: select('iconSize', buttonWithIconOptions.size, ''),
        iconColor: select('iconColor', buttonWithIconOptions.color),
        canExpand: boolean('canExpand', true),
        expanded: boolean('expanded', true),
        capitalized: boolean('capitalized', true),
        ariaLabel: text('arialLabel', '')
      };

      // Set the icon prop to the actual element based on knob selection.
      props.icon = icons[props.icon];

      return(
        <ButtonWithIcon {...props} />
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
