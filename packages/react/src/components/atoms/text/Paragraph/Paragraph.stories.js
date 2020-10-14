import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import ParagraphDocs from './Paragraph.md';
import Paragraph from './index';

const Template = (args) => <Paragraph {...args} />;
export const ParagraphExample = Template.bind({});

ParagraphExample.storyName = 'Default';
ParagraphExample.args = {
  text: 'A <strong>paragraph</strong> (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.',
  className: 'ma__custom-class'
};

export const ParagraphWithChildren = Template.bind({});
ParagraphWithChildren.storyName = 'Paragraph using props.children';
ParagraphWithChildren.args = {
  children: 'A <strong>paragraph</strong> (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.',
  className: 'ma__custom-class'
};

export default {
  title: 'atoms/text/Paragraph',
  component: Paragraph,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ParagraphDocs} />
    }
  }
};
