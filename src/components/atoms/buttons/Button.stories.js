import React from 'react';

import { storiesOf } from '@storybook/react';

import Button from './Button';

storiesOf('Atoms/Buttons/Button', module)
  .add('Button', () => <Button>Submit</Button>)
  .add('Button with info', () => <Button info="Testing info">Submit</Button>)
  .add('Button with text', () => <Button text="Example text"></Button>)
  .add('Button with type', () => <Button type="submit">Submit</Button>)
  .add('Button with size', () => <Button size="small">Submit</Button>)
  .add('Button with theme', () => <Button theme="secondary">Submit</Button>)
  .add('Button with href', () => <Button href="http://www.google.com">Click></Button>)
  .add('Button as quarternary', () => <Button theme='quaternary'></Button>)
  .add('Button as secondary', () => <Button theme='secondary'></Button>);