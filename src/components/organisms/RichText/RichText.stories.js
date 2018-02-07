import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import compHeadingOptions from '../../atoms/headings/CompHeading/CompHeading.knob.options';
import sidebarHeadingOptions from '../../atoms/headings/SidebarHeading/SidebarHeading.knob.options';
import decorativeLinkOptions from '../../atoms/links/DecorativeLink/DecorativeLink.knob.options';

import textMarkdown from './RichText.md';

import CompHeading from '../../atoms/headings/CompHeading/index';
import SidebarHeading from '../../atoms/headings/SidebarHeading/index';
import DecorativeLink from '../../atoms/links/DecorativeLink/index';

import RichText from './index';

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .add(
    'RichText',
    withInfo({ textMarkdown })(() => {
      const decoreOptionsWithKnobs = Object.assign(...Object.entries(decorativeLinkOptions).map(([k, v]) => (
        { [k]: v(DecorativeLink.defaultProps[k]) })));
      const compOptionsWithKnobs = Object.assign(...Object.entries(compHeadingOptions).map(([k, v]) => (
        { [k]: v(CompHeading.defaultProps[k]) })));
      const sideOptionsWithKnobs = Object.assign(...Object.entries(sidebarHeadingOptions).map(([k, v]) => (
        { [k]: v(SidebarHeading.defaultProps[k]) })));
      const headerIndent = boolean('headerIndent', RichText.defaultProps.headerIndent);
      const anchorLinks = boolean('anchorLinks', RichText.defaultProps.anchorLinks);
      return(
        <RichText headerIndent={headerIndent} anchorLinks={anchorLinks}>
          <CompHeading {...compOptionsWithKnobs} />
          <SidebarHeading {...sideOptionsWithKnobs} />
          <DecorativeLink {...decoreOptionsWithKnobs} />
        </RichText>);
    })
  );
