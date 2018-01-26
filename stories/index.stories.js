import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '@massds/mayflower/css/index-generated.css';
import '@massds/mayflower/css/base-theme-generated.css';

import { Welcome } from '@storybook/react/demo';
import Button from '../src/components/atoms/Button';
import Isearch from '../src/components/atoms/icons/iconSearch'
import Footer from '../src/components/organisms/Footer';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Atoms/Button', module)
  .add('Button', () => <Button>Submit</Button>)
  .add('Button with info', () => <Button info="Testing info">Submit</Button>)
  .add('Button with text', () => <Button text="Example text"></Button>)
  .add('Button with type', () => <Button type="submit">Submit</Button>)
  .add('Button with size', () => <Button size="small">Submit</Button>)
  .add('Button with theme', () => <Button theme="secondary">Submit</Button>)
  .add('Button with href', () => <Button href="http://www.google.com">Click</Button>)
  .add('Button as quarternary', () => <Button theme='quaternary'></Button>)
  .add('Button as secondary', () => <Button theme='secondary'></Button>);

storiesOf('Atoms/Icons', module)
  .add('Search Icon', () => <Isearch/>)

storiesOf('Organisms', module)
  .add('Footer', () => <Footer />);
