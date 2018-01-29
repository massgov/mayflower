import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import sidebarMarkdown from './SidebarHeading.md';
import SidebarHeading from './SidebarHeading';
import sidebarData from './SidebarHeading.json';

storiesOf('Atoms/Headings', module).addDecorator(withKnobs)
  .add('SidebarHeading', withInfo(sidebarMarkdown)(() => (<SidebarHeading data={sidebarData} />)));

