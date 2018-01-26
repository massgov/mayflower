import React from 'react';

import { storiesOf } from '@storybook/react';

import Button from './Button';

storiesOf('Atoms/Buttons/Button', module)
  .add('Button', () => <Button />)
  .add('Button with info', () => <Button info="Testing info" />)
  .add('Button with text', () => <Button text="Example text" />)
  .add('Button with type', () => <Button type="submit" />)
  .add('Button with size', () => <Button size="small" />)
  .add('Button with theme', () => <Button theme="secondary" />)
  .add('Button with href', () => <Button href="http://www.google.com" text="Click >" />)
  .add('Button as quarternary', () => <Button theme="quaternary" />)
  .add('Button as secondary', () => <Button theme="secondary" />);
