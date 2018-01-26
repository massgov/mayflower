import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';


const stories = storiesOf('Storybook Knobs', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

import siteLogoDocs from '../src/components/atoms/media/site-logo/SiteLogo.md'
import siteLogoData from '../src/components/atoms/media/site-logo/SiteLogo.json'

import '@massds/mayflower/css/index-generated.css';
import '@massds/mayflower/css/base-theme-generated.css';

import { Welcome } from '@storybook/react/demo';
import Button from '../src/components/atoms/Button';
import SiteLogo from '../src/components/atoms/media/site-logo/SiteLogo';
import Footer from '../src/components/organisms/Footer';


storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Atoms/Media/Site Logo', module)
  .add('Site Logo', () => <SiteLogo data={siteLogoData} />);

storiesOf('Atoms/Button', module).addDecorator(withKnobs)
  .add('Button', () => <Button>Submit</Button>)
  .add('Button with info', () => <Button info="Testing info">Submit</Button>)
  .add('Button with text', () => <Button text="Example text"></Button>)
  .add('Button with type', () => <Button type="submit">Submit</Button>)
  .add('Button with size', () => <Button size="small">Submit</Button>)
  .add('Button with theme', () => <Button theme="secondary">Submit</Button>)
  .add('Button with href', () => <Button href="http://www.google.com">Click></Button>)
  .add('Button as quarternary', () => <Button theme='quaternary'></Button>)
  .add('Button as secondary', () => <Button theme='secondary'></Button>)
  .add('Button Test', 
    withInfo(`
      Testing this... 
    
      ~~~js
      <Button>Click Here</Button>
      ~~~
    
    `)(() => {
    	const theme = text('theme','quaternary');
    	const type = text('type','submit');
    	const outline = boolean('outline', false);
    	const size = text('size','small');
    	const info = text('info','information')
    	return(<Button theme={theme} type={type} size={size} info={info}></Button>)
    })
  );

storiesOf('Organisms', module)
  .add('Footer', () => <Footer />);
