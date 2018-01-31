import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, number, withKnobs } from '@storybook/addon-knobs/react';

import sidebarMarkdown from './SidebarHeading.md';
import SidebarHeading from './SidebarHeading';
import data from './SidebarHeading.json';

storiesOf('Atoms/Headings', module).addDecorator(withKnobs)
  .add('SidebarHeading', withInfo({ sidebarMarkdown })(() => {
    const title = text('title', data.sidebarHeading.title || '');
    const level = number('level', data.sidebarHeading.level || 2);

    return(<SidebarHeading title={title} level={level} />);
  }));

