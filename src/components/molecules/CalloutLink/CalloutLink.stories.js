import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';

import CalloutLink from './index';
import CalloutLinkDocs from './CalloutLink.md';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('CalloutLink', withInfo(`<div>`+CalloutLinkDocs+`</div>`)(() => {
    const props = {
      text: text('calloutLink.text', 'Link to another page'),
      href: text('calloutLink.href', ''),
      info: text('calloutLink.info', 'this will be the tooltip text on hover'),
      description: text('calloutLink.description', '')
    };
    return(
      <CalloutLink {...props} />
    );
  }));
