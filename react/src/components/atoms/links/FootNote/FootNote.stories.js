import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import FootNote from './index';
import FootNoteLink from '../FootNoteLink/index';
import FootNoteDocs from './FootNote.md';

export const FootNoteExample = (args) => (
  <div>
    <p>
      This is where the footnote would be referenced.&nbsp;
      <FootNoteLink index={args.index} />
    </p>
    <FootNote {...args} />
  </div>
);

FootNoteExample.storyName = 'Default';

FootNoteExample.args = {
  index: '1',
  children: 'This is the footnote <a href="https://www.mass.gov/">(reference)</a>.'
};

export default {
  title: 'atoms/links/FootNote',
  component: FootNote,
  parameters: {
    docs: {
      page: () => <StoryPage StoryComponent={FootNoteExample} Description={FootNoteDocs} />
    }
  }
};
