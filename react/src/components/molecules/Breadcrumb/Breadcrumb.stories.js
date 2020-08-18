import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import Link from 'MayflowerReactMolecules/Link';

import Breadcrumb from './index';
import BreadcrumbItem from './item';

const getLink = (sampleText = 'Sample Link') => {
  const linkProps = {
    text: sampleText,
    href: 'http://www.mass.gov/',
    icon: null
  };
  return<Link {...linkProps} />;
};

const getItem = (itemText, index, currentPage) => (
  <BreadcrumbItem currentPage={currentPage}>
    {getLink(itemText, index)}
  </BreadcrumbItem>
);

export const BreadcrumbExample = (args) => (
  <Breadcrumb>
    {getItem('Appropriation Recommendation')}
    {getItem('Independents')}
    {getItem('District Attorneys')}
    <BreadcrumbItem {...args} />
  </Breadcrumb>
);

BreadcrumbExample.storyName = 'Default';
BreadcrumbExample.args = {
  currentPage: 'Suffolk DA - Historical Spending'
};
BreadcrumbExample.argTypes = {
  children: {
    control: {
      disable: true
    }
  }
};

export default {
  title: 'molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
