import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';

import ArrowNav from './index';
import ArrowNavReadme from './ArrowNav.md';
import { Link, ArrowButton } from '../../../index';

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .add('ArrowNav', withInfo({ ArrowNavReadme })(() => {
    const LinkProps = {
      href: text('Link.href', '#'),
      info: text('Link.info', 'link.info'),
      text: text('Link.text', 'link.text')
    };
    const ButtonProps = {
      href: text('ArrowButton.href', '#'),
      info: text('ArrowButton.info', 'info'),
      direction: select('ArrowButton.direction', ['left', 'right'])
    }
    const props = {
      title: text('ArrowNav.title', 'ArrowNav.title'),
      label: text('ArrowNav.label', "ArrowNav.label"),
      ArrowButton: <ArrowButton {...ButtonProps}/>,
      Link: <Link {...LinkProps} />
    };
    return(<ArrowNav {...props} />);
  }));
