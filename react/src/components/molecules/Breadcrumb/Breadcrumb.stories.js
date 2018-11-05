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

const getItem = (itemText, current, index) => {
  const itemProps = {
    current: boolean(`Breadcrumb.${index}.current`, current)
  };
  return(
    <BreadcrumbItem {...itemProps}>
      {!current ? (getLink(itemText, index)) : (<a href="/" aria-current="page" onClick={(e) => e.preventDefault()}>{itemText}</a>)}
    </BreadcrumbItem>
  );
};

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .add('Breadcrumb', withInfo('<div></div>')(() => (
    <Breadcrumb>
      {getItem('Appropriation Recommendation', false, 0)}
      {getItem('Independents', false, 1)}
      {getItem('District Attorneys', false, 2)}
      {getItem('Suffolk DA - Historical Spending', true, 3)}
    </Breadcrumb>
  )));
