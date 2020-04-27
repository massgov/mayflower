import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import Label from './index';
import LabelDocs from './Label.md';
import LabelOptions from './Label.knobs.options';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Label', (() => {
      const props = {
        inputId: text('inputID', LabelOptions.inputId),
        renderState: select('renderState', LabelOptions.renderState),
        conditionText: text('conditionText', LabelOptions.conditionText),
        className: text('className', LabelOptions.conditionText),
      };
      return(<Label {...props}>{LabelOptions.labelText}</Label>);
    }),
    { info: LabelDocs }
  );