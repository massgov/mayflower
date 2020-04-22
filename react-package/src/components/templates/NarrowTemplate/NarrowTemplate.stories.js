import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import NarrowTemplate from '.';
import NarrowTemplateDocs from './NarrowTemplate.md';
import NarrowTemplateOptions from './NarrowTemplate.knobs.options';

storiesOf('templates', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'NarrowTemplate', (() => {
      const siteLogoDomainProps = {
        url: {
          domain: text('NarrowTemplate siteLogoDomain: url domain', 'https://www.mass.gov/')
        }
      };
      const props = {
        side: select('NarrowTemplate side', NarrowTemplateOptions.side, 'right'),
        color: select('NarrowTemplate color', NarrowTemplateOptions.color, 'yellow'),
        siteLogoDomain: siteLogoDomainProps
      };
      return(<NarrowTemplate {...props} />);
    }),
    { info: NarrowTemplateDocs }
  );
