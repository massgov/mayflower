import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import compHeadingOptions from '../../../atoms/headings/CompHeading/CompHeading.knob.options';
import sidebarHeadingOptions from '../../../atoms/headings/SidebarHeading/SidebarHeading.knob.options';
import decorativeLinkOptions from '../../../atoms/links/DecorativeLink/DecorativeLink.knob.options';

import CompHeading from '../../../atoms/headings/CompHeading';
import SidebarHeading from '../../../atoms/headings/SidebarHeading';
import DecorativeLink from '../../../atoms/links/DecorativeLink';

import RichText from './index';

storiesOf('Organisms/By-Author', module)
  .addDecorator(withKnobs)
  .add(
    'RichText',
    withInfo()(() => {
      const decoreOptionsWithKnobs = Object.assign(...Object.entries(decorativeLinkOptions).map(([k, v]) => (
        { [k]: v(DecorativeLink.defaultProps[k]) })));
      const compOptionsWithKnobs = Object.assign(...Object.entries(compHeadingOptions).map(([k, v]) => (
        { [k]: v(CompHeading.defaultProps[k]) })));
      const sideOptionsWithKnobs = Object.assign(...Object.entries(sidebarHeadingOptions).map(([k, v]) => (
        { [k]: v(SidebarHeading.defaultProps[k]) })));
      return(
        <RichText>
          <CompHeading {...compOptionsWithKnobs} />
          <SidebarHeading {...sideOptionsWithKnobs} />
          <DecorativeLink {...decoreOptionsWithKnobs} />
        </RichText>);
    })
  );
