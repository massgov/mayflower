import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';

import tooltipOptions from './Tooltip.knob.options';
import Tooltip from './index';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Tooltip', (() => {
    const props = {
      openText: text('openText', tooltipOptions.openText),
      closeText: text('closeText', tooltipOptions.closeText),
      message: text('message', tooltipOptions.message),
      controlId: text('controlId', tooltipOptions.controlId),
      openIcon: boolean('openIcon', true),
      info: text('info', tooltipOptions.info),
      title: text('title', tooltipOptions.title),
      level: select('level', tooltipOptions.level)
    };
    return(<Tooltip {...props} />);
  }));
