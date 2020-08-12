import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';

import NarrowTemplate from '.';
import NarrowTemplateDocs from './NarrowTemplate.md';
import NarrowTemplateOptions from './NarrowTemplate.knobs.options';

storiesOf('others/templates', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'NarrowTemplate', (() => {
      const siteLogoDomainProps = {
        url: {
          domain: text('NarrowTemplate siteLogoDomain: url domain', 'https://www.mass.gov/')
        },
        image: {
          src: logo,
          alt: 'Massachusetts state seal'
        },
        siteName: 'Mass.gov'
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
