import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import tooltipOptions from './Tooltip.knob.options';
import Tooltip from './index';

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .add('Tooltip', (() => {
    const props = {
      openText: text('Tooltip.openText', tooltipOptions.openText),
      closeText: text('Tooltip.closeText', tooltipOptions.closeText),
      message: text('Tooltip.message', tooltipOptions.message),
      controlId: text('Tooltip.controlId', tooltipOptions.controlId),
      openIcon: boolean('Tooltip.openIcon', true),
      info: text('Tooltip.info', tooltipOptions.info),
      title: text('Tooltip.title', tooltipOptions.title),
      level: select('Tooltip.level', tooltipOptions.level)
    };
    return(<Tooltip {...props} />);
  }));
