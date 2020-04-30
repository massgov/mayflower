import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Tags from './index';
import TagsDocs from './Tags.md';
import TagsData from './Tags.knobs.options';

storiesOf('molecules/Tags', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Tags with ButtonToggle', (() => {
      const props = {
        tags: object('Tags tags', TagsData.tags),
        onClearCallback: action('Tags tags on clearAll'),
        onClearThisCallback: action('Tags tags on clearThis')
      };
      return(
        <Tags {...props} />
      );
    }),
    { info: TagsDocs }
  );
