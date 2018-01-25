import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { linkTo } from '@storybook/addon-links';

import sidebarHeadingMarkdown from '../src/components/atoms/headings/SidebarHeading/SidebarHeading.md';


import '@massds/mayflower/css/index-generated.css';
import '@massds/mayflower/css/base-theme-generated.css';

import { Welcome } from '@storybook/react/demo';
import SidebarHeading from '../src/components/atoms/headings/SidebarHeading/SidebarHeading';
import Footer from '../src/components/organisms/Footer';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
storiesOf('Atoms/Headings', module)
  .add('SidebarHeading', withNotes(sidebarHeadingMarkdown)(() => <SidebarHeading/>));
storiesOf('Footer', module)
  .add('Footer', () => <Footer />);