import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import DecorativeLink from './index';
import DecorativeLinkDocs from './DecorativeLink.md';
import IconDownload from 'MayflowerReactBase/Icon/IconDownload';

const Template = (args) => <DecorativeLink {...args} />;

export const DecorativeLinkExample = Template.bind({});

DecorativeLinkExample.storyName = 'Default';

DecorativeLinkExample.args = {
  info: 'This is a clickable styled link',
  text: 'HTML Page as a Link',
  href: '#',
  showFileIcon: false
};
DecorativeLinkExample.argTypes = {
  icon: {
    control: {
      disable: true
    }
  }
};

export const FileExample = Template.bind({});
FileExample.args = {
  info: 'This is a clickable styled link',
  text: 'File as a Link',
  href: 'https://www.mass.gov/test.pdf',
  showFileIcon: true
};
FileExample.argTypes = {
  icon: {
    control: {
      disable: true
    }
  }
};
export const FileDownloadExample = Template.bind({});
FileDownloadExample.args = {
  info: 'This is a clickable styled link',
  text: 'File Download as a Link',
  href: 'https://www.mass.gov/test.pdf',
  details: '(30 MB)',
  showFileIcon: true,
  icon: <IconDownload width={15} height={15} />
};
FileDownloadExample.argTypes = {
  icon: {
    control: {
      disable: true
    }
  }
};

export default {
  title: 'atoms/links/DecorativeLink',
  component: DecorativeLink,
  parameters: {
    docs: {
      page: () => <StoryPage Description={DecorativeLinkDocs} />
    }
  }
};
