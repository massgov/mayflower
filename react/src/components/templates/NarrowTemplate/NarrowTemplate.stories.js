import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, text } from '@storybook/addon-knobs/react';

import NarrowTemplate from '.';
import NarrowTemplateReadme from './NarrowTemplate.md';
import NarrowTemplateOptions from './NarrowTemplate.knobs.options';

storiesOf('templates', module).addDecorator(withKnobs)
  .add('NarrowTemplate', withInfo(`<div>${NarrowTemplateReadme}</div>`)(() => {
    const siteLogoDomainProps = {
      url: {
        domain: text('narrowTemplate.siteLogoDomain.url.domain', 'https://www.mass.gov/')
      }
    };
    const props = {
      side: select('narrowTemplate.side', NarrowTemplateOptions.side, 'right'),
      color: select('narrowTemplate.color', NarrowTemplateOptions.color, 'yellow'),
      siteLogoDomain: siteLogoDomainProps
    };
    return(<NarrowTemplate {...props} />);
  }));
