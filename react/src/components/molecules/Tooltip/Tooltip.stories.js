import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import tooltipOptions from './Tooltip.knob.options';

import Tooltip from './index';

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .add('Tooltip', withInfo('<div>Tooltip</div>')(() => {
    const props = {
      openText: text('Tooltip.openText', tooltipOptions.openText),
      closeText: text('Tooltip.closeText', tooltipOptions.closeText),
      message: text('Tooltip.message', tooltipOptions.message),
      controlId: text('Tooltip.controlId', tooltipOptions.controlId),
      openIcon: boolean('Tooltip.openIcon', true),
      info: text('Tooltip.info', tooltipOptions.info),
      title: text('Tooltip.title', tooltipOptions.title),
      level: select('Tooltip.level', tooltipOptions.level),
      htmlTag: select('Tooltip.htmlTag', tooltipOptions.htmlTag)
    };
    return(
      <p> A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.
        <Tooltip {...props} />
      </p>
    );
  }));
