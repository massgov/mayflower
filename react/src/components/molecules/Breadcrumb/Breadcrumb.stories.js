import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';

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

const currentItem = (currentLinkText) => {
  const linkText = text('Breadcrumb.current.text', currentLinkText);
  return(
    <BreadcrumbItem>
      <a href="/" aria-current="page" onClick={(e) => e.preventDefault()}>{linkText}</a>
    </BreadcrumbItem>
  );
};

const getItem = (itemText, index) => (
  <BreadcrumbItem>
    {getLink(itemText, index)}
  </BreadcrumbItem>
);

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .add('Breadcrumb', withInfo('<div></div>')(() => (
    <Breadcrumb>
      {getItem('Appropriation Recommendation', 0)}
      {getItem('Independents', 1)}
      {getItem('District Attorneys', 2)}
      {currentItem('Suffolk DA - Historical Spending')}
    </Breadcrumb>
  )));
