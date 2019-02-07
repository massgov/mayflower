import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import OrderedList from './index';
import OrderedListDocs from './OrderedList.md';
import orderedOptions from './OrderedList.knob.options';

storiesOf('atoms/lists', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'OrderedList', (() => {
      const orderedOptionsWithKnobs = Object.assign(...Object.entries(orderedOptions).map(([k, v]) => (
        { [k]: v(OrderedList.defaultProps[k]) })));
      return(<OrderedList {...orderedOptionsWithKnobs} />);
    }),
    { info: OrderedListDocs }
  );
