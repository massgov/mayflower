import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

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
  unorderedOptions
} from './RichText.require';
import RichText from './index';
import RichTextDocs from './RichText.md';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'RichText', () => {
      const decoreOptionsWithKnobs = Object.assign(...Object.entries(decorativeLinkOptions).map(([k, v]) => (
        { [k]: v(DecorativeLink.defaultProps[k]) })));
      const compOptionsWithKnobs = Object.assign(...Object.entries(compHeadingOptions).map(([k, v]) => (
        { [k]: v(CompHeading.defaultProps[k]) })));
      const sideOptionsWithKnobs = Object.assign(...Object.entries(sidebarHeadingOptions).map(([k, v]) => (
        { [k]: v(SidebarHeading.defaultProps[k]) })));
      const paraOptionsWithKnobs = {
        text: text('Paragraph1: text', 'A <strong>paragraph</strong> (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.', 'Paragraph')
      };
      const orderedOptionsWithKnobs = Object.assign(...Object.entries(unorderedOptions).map(([k, v]) => (
        { [k]: v(UnorderedList.defaultProps[k]) })));
      const headerIndent = boolean('headerIndent', RichText.defaultProps.headerIndent, 'RichText');
      const anchorLinks = boolean('anchorLinks', RichText.defaultProps.anchorLinks, 'RichText');
      const description = {
        rteElements: [{
          path: '@atoms/11-text/paragraph.twig',
          data: {
            paragraph: {
              text: text('rteParagraph', 'Optional description', 'RichText')
            }
          }
        },
        {
          path: '@atoms/08-lists/unordered-list.twig',
          data: {
            unorderedList: [
              { text: 'This is a list item in an unordered list' },
              { text: 'An unordered list is a list in which the sequence of items is not important. Sometimes, an unordered list is a bulleted list. And this is a long list item in an unordered list that can wrap onto a new line.' },
              {
                text: 'Lists can be nested inside of each other',
                sublist: [
                  { text: 'This is a nested list item' },
                  { text: 'This is another nested list item in an unordered list' }
                ]
              },
              { text: 'This is the last list item' }
            ]
          }
        }]
      };
      return(
        <RichText headerIndent={headerIndent} anchorLinks={anchorLinks} {...description}>
          <CompHeading {...compOptionsWithKnobs} />
          <SidebarHeading {...sideOptionsWithKnobs} />
          <Paragraph {...paraOptionsWithKnobs} />
          <Paragraph text={text('Paragraph2: text', 'foobarbaz', 'Paragraph')} />
          <Heading text={text('Heading: text', 'This is a heading', 'Heading')} level={1} />
          <UnorderedList {...orderedOptionsWithKnobs} />
          <DecorativeLink {...decoreOptionsWithKnobs} />
        </RichText>);
    },
    { info: RichTextDocs }
  );
