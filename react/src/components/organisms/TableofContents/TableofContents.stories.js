import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import TableofContents from '.';
import TableofContentsDocs from './TableofContents.md';
import ColoredHeading from '../../atoms/headings/ColoredHeading';
import SidebarHeading from '../../atoms/headings/SidebarHeading';
import DecorativeLink from '../../atoms/links/DecorativeLink';
import AccordionItem from '../../molecules/AccordionItem';
import Link from '../../molecules/Link';

const getDecorativeLink = (index) => {
  const props = {
    info: 'Title info here',
    text: 'Lorem ipsum dolor sit amet',
    href: 'index.pdf',
    showFileIcon: true
  };
  return<DecorativeLink {...props} />;
};

const getAccordionItem = (index) => {
  const props = {
    title: 'Collapsible Header Two',
    info: 'Collapsible Header Two',
    icon: null,
    border: false,
    secondary: false,
    emphasize: true,
    // eslint-disable-next-line radix
    headerLevel: '2'
  };
  return<AccordionItem {...props}>{getLink()}</AccordionItem>;
};

const getLink = (sampleText = 'Sample Link') => {
  const linkProps = {
    sampleText,
    href: 'http://www.mass.gov/'
  };
  return<Link {...linkProps} />;
};

const getColoredHeading = () => {
  const props = {
    text: 'Table of Contents',
    // eslint-disable-next-line radix
    level: '2',
    color: 'green'
  };
  return<ColoredHeading {...props} />;
};

const getSidebarHeading = () => {
  const props = {
    title: 'Key Agencies',
    level: '2'
  };
  return<SidebarHeading {...props} />;
};

export const TableofContentsExample = (args) => (
  <TableofContents {...args}>
    {getDecorativeLink(0)}
    {getAccordionItem('phone', 1)}
    {getAccordionItem('phone', 2)}
    {getDecorativeLink(3)}
  </TableofContents>
);
TableofContentsExample.storyName = 'Default';
TableofContentsExample.args = {
  heading: getColoredHeading()
};
TableofContentsExample.argTypes = {
  heading: {
    control: {
      disable: true
    }
  }
};

export const TableofContentsSidebarHeading = (args) => (
  <TableofContents {...args}>
    {getDecorativeLink(0)}
    {getAccordionItem('phone', 1)}
    {getAccordionItem('phone', 2)}
    {getDecorativeLink(3)}
  </TableofContents>
);
TableofContentsSidebarHeading.storyName = 'TableofContents with SidebarHeading';
TableofContentsSidebarHeading.args = {
  heading: getSidebarHeading()
};
TableofContentsSidebarHeading.argTypes = {
  heading: {
    control: {
      disable: true
    }
  }
};
export default {
  title: 'organisms/TableofContents',
  component: TableofContents,
  parameters: {
    docs: {
      page: () => <StoryPage Description={TableofContentsDocs} />
    }
  }
};
