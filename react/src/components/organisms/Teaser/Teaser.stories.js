import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import storyUtils from './storyutils';
import Teaser from '.';

storiesOf('organisms/Teaser', module)
  .addDecorator(withInfo)
  .add('Teaser: Title Only', (() => {
    const { getDecorativeLink } = storyUtils;
    const props = {
      title: getDecorativeLink()
    };
    return(
      <Teaser {...props} />
    );
  }))
  .add('Teaser: Left Side Only', (() => {
    const { leftSideProps } = storyUtils;
    const props = {
      left: leftSideProps()
    };
    return(
      <Teaser {...props} />
    );
  }))
  .add('Teaser: Right Side Only', (() => {
    const { rightSideProps } = storyUtils;
    const props = {
      right: rightSideProps()
    };
    return(
      <Teaser {...props} />
    );
  }))
  .add('Teaser: Left and Right Sides', (() => {
    const { leftSideProps, rightSideProps, getDecorativeLink } = storyUtils;
    const props = {
      title: getDecorativeLink(),
      left: leftSideProps(),
      right: rightSideProps()
    };
    return(
      <Teaser {...props} />
    );
  }))
  .add('Teaser: Contact Group Only', (() => {
    const { getContactGroup } = storyUtils;
    const props = {
      left: [getContactGroup()]
    };
    return(
      <Teaser {...props} />
    );
  }));
