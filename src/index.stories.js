import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import { Welcome } from '@storybook/react/demo';

import { sidebarHeadingMarkdown } from '../src/components/atoms/headings/SidebarHeading/SidebarHeading.md';
import { SidebarHeading } from '../src/components/atoms/headings/SidebarHeading/SidebarHeading';

import '@massds/mayflower/css/index-generated.css';
import '@massds/mayflower/css/base-theme-generated.css';

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Atoms/Headings', module)
  .add('SidebarHeading', withNotes(sidebarHeadingMarkdown)(() => <SidebarHeading/>));