import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import FootNoteLink from './index';
import FootNote from '../FootNote/index';
import FootNoteLinkDocs from './FootNoteLink.md';

export const FootNoteLinkExample = (args) => (
  <div>
    <p>
      This is where the footnote would be referenced.&nbsp;
      <FootNoteLink index={args.index} />
    </p>
    <FootNote {...args} />
  </div>
);

FootNoteLinkExample.storyName = 'Default';

FootNoteLinkExample.args = {
  index: '1',
  children: 'This is the footnote <a href="https://www.mass.gov/">(reference)</a>.'
};

export default {
  title: 'atoms/links/FootNoteLink',
  component: FootNoteLink,
  parameters: {
    docs: {
      page: () => <StoryPage StoryComponent={FootNoteLinkExample} Description={FootNoteLinkDocs} />
    }
  }
};
