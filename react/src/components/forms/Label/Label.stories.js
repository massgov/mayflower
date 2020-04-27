import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';

import Label from './index';
import LabelDocs from './Label.md';
import LabelOptions from './Label.knobs.options';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Label', (() => {
      const props = {
        inputId: text('inputID', LabelOptions.inputId),
        disabled: boolean('disabled', LabelOptions.disabled),
        hidden: boolean('hidden', LabelOptions.hidden),
        conditionText: text('conditionText', LabelOptions.conditionText),
        className: text('className', ''),
      };
      return(<Label {...props}>{LabelOptions.labelText}</Label>);
    }),
    { info: LabelDocs }
  );