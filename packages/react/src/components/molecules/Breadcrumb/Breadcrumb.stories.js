import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Breadcrumb from './index';
import BreadcrumbItem from './item';
import Link from 'MayflowerReactMolecules/Link';

const getLink = (sampleText = 'Sample Link', index) => {
  const linkProps = {
    text: text(`Breadcrumb ${index}: text`, sampleText, `Breadcrumb ${index}`),
    href: text(`Breadcrumb ${index}: href`, 'http://www.mass.gov/', `Breadcrumb ${index}`),
    icon: null
  };
  return<Link {...linkProps} />;
};

const getItem = (itemText, index, currentPage) => (
  <BreadcrumbItem currentPage={currentPage}>
    {getLink(itemText, index)}
  </BreadcrumbItem>
);

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Breadcrumb', (() => {
    const currentItemProp = {
      currentPage: text('currentPage', 'Suffolk DA - Historical Spending')
    };
    return(
      <Breadcrumb>
        {getItem('Appropriation Recommendation', 0)}
        {getItem('Independents', 1)}
        {getItem('District Attorneys', 2)}
        <BreadcrumbItem {...currentItemProp} />
      </Breadcrumb>
    );
  }));
