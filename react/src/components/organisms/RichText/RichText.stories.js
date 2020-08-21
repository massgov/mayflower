import React, { Fragment } from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import RichText from './index';
import RichTextDocs from './RichText.md';

export const RichTextExample = (args) => {
  const rawHtml = args.hasChildren || <h1>This is heading 1</h1>;
  return(
    <RichText {...args} rawHtml={rawHtml}>
      { args.hasChildren && (
        <Fragment>
          <h1>This is a heading.</h1>
          <p>
            An <b>unordered list</b> is a list in which the sequence of items is not important. Sometimes, an unordered list is a bulleted list. And this is a long list item in an unordered list that can wrap onto a new line. Lists can be nested inside of each other.
          </p>
          <ul>
            <li>This is a list item in an unordered list.</li>
            <ul>
              <li>This is a nested list item.</li>
              <li>This is another nested list item in an unordered list.</li>
            </ul>
            <li>This is the last list item.</li>
          </ul>
        </Fragment>
      ) }
    </RichText>
  );
};

RichTextExample.storyName = 'Default';
RichTextExample.args = {
  hasChildren: true,
  className: '',
  id: '',
  transform: action('transform callback')
};

export default {
  title: 'organisms/RichText',
  component: RichText,
  parameters: {
    docs: {
      page: () => <StoryPage Description={RichTextDocs} />
    }
  }
};
