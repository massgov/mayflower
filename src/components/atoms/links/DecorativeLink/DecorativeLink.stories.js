import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs/react';

import DecorativeLink from '../../links/DecorativeLink';
import linkMarkdown from './DecorativeLink.md';

storiesOf('Atoms/Links', module).addDecorator(withKnobs)
  .add('DecorativeLink', withInfo({ linkMarkdown })(() => {
    const info = text('info', '');
    const linkText = text('text', 'Lorem ipsum dolor sit amet');
    const href = text('href', '#');

    return(<DecorativeLink
      info={info}
      text={linkText}
      href={href}
    />);
  }));

