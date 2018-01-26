import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { linkTo } from '@storybook/addon-links';

import svgArrowMarkdown from '../src/components/atoms/icons/SvgArrow/SvgArrow.md';


import '@massds/mayflower/css/index-generated.css';
import '@massds/mayflower/css/base-theme-generated.css';

import { Welcome } from '@storybook/react/demo';
import SvgArrow from '../src/components/atoms/icons/SvgArrow/SvgArrow';
import Footer from '../src/components/organisms/Footer';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
storiesOf('Atoms/Icons', module)
  .add('SvgArrow', withNotes(svgArrowMarkdown)(() => <SvgArrow/>));
storiesOf('Footer', module)
  .add('Footer', () => <Footer />);