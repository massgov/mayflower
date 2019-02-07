import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';

import Breadcrumb from './index';
import BreadcrumbItem from './item';
import { Link } from '../../../index';

const getLink = (sampleText = 'Sample Link', index) => {
  const linkProps = {
    text: text(`Breadcrumb.${index}.text`, sampleText),
    href: text(`Breadcrumb.${index}.href`, 'http://www.mass.gov/'),
    icon: null
  };
  return<Link {...linkProps} />;
};

const currentItemProp = {
  currentPage: text('Breadcrumb.current.text', 'Suffolk DA - Historical Spending')
};

const getItem = (itemText, index, currentPage) => (
  <BreadcrumbItem currentPage={currentPage}>
    {getLink(itemText, index)}
  </BreadcrumbItem>
);

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Breadcrumb', (() => (
    <Breadcrumb>
      {getItem('Appropriation Recommendation', 0)}
      {getItem('Independents', 1)}
      {getItem('District Attorneys', 2)}
      <BreadcrumbItem {...currentItemProp} />
    </Breadcrumb>
  )));
