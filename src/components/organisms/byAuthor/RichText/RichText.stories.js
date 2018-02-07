import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';

import {
  Paragraph,
  Heading,
  CompHeading,
  SidebarHeading,
  DecorativeLink,
  UnorderedList,
  compHeadingOptions,
  sidebarHeadingOptions,
  decorativeLinkOptions,
  paragraphOptions,
  unorderedOptions
} from './RichText.require';

import RichText from './index';
import textMarkdown from './RichText.md';

storiesOf('organisms/byAuthor', module)
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
      const paraOptionsWithKnobs = Object.assign(...Object.entries(paragraphOptions).map(([k, v]) => (
        { [k]: v(Paragraph.defaultProps[k]) })));
      const orderedOptionsWithKnobs = Object.assign(...Object.entries(unorderedOptions).map(([k, v]) => (
        { [k]: v(UnorderedList.defaultProps[k]) })));
      const headerIndent = boolean('headerIndent', RichText.defaultProps.headerIndent);
      const anchorLinks = boolean('anchorLinks', RichText.defaultProps.anchorLinks);
      return(
        <RichText headerIndent={headerIndent} anchorLinks={anchorLinks}>
          <CompHeading {...compOptionsWithKnobs} />
          <SidebarHeading {...sideOptionsWithKnobs} />
          <Paragraph {...paraOptionsWithKnobs} />
          <Paragraph text={text('Paragraph2.text', 'foobarbaz')} />
          <Heading text={text('Heading1.text', 'This is a heading')} level={1} />
          <UnorderedList {...orderedOptionsWithKnobs} />
          <DecorativeLink {...decoreOptionsWithKnobs} />
        </RichText>);
    })
  );
