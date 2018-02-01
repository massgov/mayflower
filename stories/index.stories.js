import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/react';
import { Welcome } from '@storybook/react/demo';

const stories = storiesOf('Storybook Knobs', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

import siteLogoDocs from '../src/components/atoms/media/site-logo/SiteLogo.md';
import siteLogoData from '../src/components/atoms/media/site-logo/SiteLogo.json';


import '@massds/mayflower/css/index-generated.css';
import '@massds/mayflower/css/base-theme-generated.css';

import SiteLogo from '../src/components/atoms/media/site-logo/SiteLogo';
import Button from '../src/components/atoms/buttons/Button';
import Footer from '../src/components/organisms/Footer';
import InputDate from '../src/components/atoms/forms/InputDate';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Atoms/Buttons/Button', module)
  .add('Button', () => <Button>Submit</Button>)
  .add('Button with info', () => <Button info="Testing info">Submit</Button>)
  .add('Button with text', () => <Button text="Example text" />)
  .add('Button with type', () => <Button type="submit">Submit</Button>)
  .add('Button with size', () => <Button size="small">Submit</Button>)
  .add('Button with theme', () => <Button theme="secondary">Submit</Button>)
  .add('Button with href', () => <Button href="http://www.google.com">Click></Button>)
  .add('Button as quarternary', () => <Button theme="quaternary" />)
  .add('Button as secondary', () => <Button theme="secondary" />);


storiesOf('Atoms/Media/Site Logo', module)
  .add('Site Logo', () => <SiteLogo data={siteLogoData} />);


storiesOf('Atoms/Button', module).addDecorator(withKnobs)
  .add(
    'Button',
    withInfo(`
      Testing this... 
    
      ~~~js
      <Button>Click Here</Button>
      ~~~
    
    `)(() => {
    	const themeOptions = { '': 'default', secondary: 'secondary', quaternary: 'quaternary' };
    	const theme = select('theme', themeOptions);

    	const typeOptions = {
        submit: 'submit', reset: 'reset', button: 'button', '': 'default'
      };
    	const type = select('type', typeOptions);

    	const defaultValue = false;
    	const outline = boolean('outline', defaultValue);

    	const sizeOptions = { '': 'default', small: 'small' };
    	const size = select('size', sizeOptions);

    	const info = text('info', 'information');
    	const buttonText = text('text', 'button');
    	const href = text('href', '');

    	return(<Button theme={theme} type={type} size={size} info={info} text={buttonText} href={href} outline={outline} />);
    })
  );

storiesOf('Atoms/Forms/InputDate', module).addDecorator(withKnobs)
  .add(
    'InputDate',
    withInfo(`
      Testing this... 
    
      ~~~js
      <InputDate></InputDate>
      ~~~
    
    `)(() => (<InputDate />))
  );

storiesOf('Organisms', module)
  .add('Footer', () => <Footer />);
