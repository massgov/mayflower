import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select } from '@storybook/addon-knobs/react';

import NarrowTemplate from '.';
import NarrowTemplateReadme from './NarrowTemplate.md';
import NarrowTemplateOptions from './NarrowTemplate.knobs.options';

storiesOf('templates', module).addDecorator(withKnobs)
  .add('NarrowTemplate', withInfo(`<div>${NarrowTemplateReadme}</div>`)(() => {
    const props = {
      side: select('narrowTemplate.side', NarrowTemplateOptions.side, 'right'),
      color: select('narrowTemplate.color', NarrowTemplateOptions.color, 'yellow')
    };
    return(<NarrowTemplate {...props} />);
  }));
