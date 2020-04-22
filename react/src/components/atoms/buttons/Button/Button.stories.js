import React, { lazy, Suspense } from 'react';

import { withKnobs, text, select, boolean, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ButtonDocs from './Button.md';
import buttonOptions from './Button.knobs.options';

const Button = lazy(() => import('./index'));

export default {
  title: 'atoms/buttons/Button',
  component: Button,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false
    },
    info: {
      text: ButtonDocs
    }
  }
};


export const Default = () => {
  const props = {
    usage: select('usage', buttonOptions.usage),
    type: select('type', buttonOptions.type),
    size: select('size', buttonOptions.size),
    info: text('info', 'this will be the tooltip text on hover'),
    disabled: boolean('disabled', false),
    text: text('text', 'Button'),
    href: text('href', ''),
    onClick: action('button clicked'),
    classes: array('classes', [])
  };
  // Tertiary and quaternary usages don't have different themes.
  if (props.usage === undefined || props.usage === 'primary' || props.usage === 'secondary') {
    props.theme = select('theme', buttonOptions.theme);
  }
  return(
    <Suspense fallback={<>Loading...</>}>
      <Button {...props} />
    </Suspense>
  );
};

