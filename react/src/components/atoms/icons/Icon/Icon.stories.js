import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, array } from '@storybook/addon-knobs/react';
import { assets, svgOptions } from './Icon.knob.options';
import Icon from './index';

storiesOf('atoms/icons', module).addDecorator(withKnobs)
  .add('Icon', () => {
    // This needs to be dynamic somehow.

    const name = select('Icon.name', svgOptions, '');
    const svgWidth = text('Icon.svgWidth', 40);
    const svgHeight = text('Icon.svgHeight', 40);
    const title = text('Icon.title', 'Icon Title Here');
    const classes = array('Icon.classes', ['']);
    const props = {
      name,
      svgWidth,
      svgHeight,
      title,
      classes
    };
    if (window.location.search.indexOf('backstop') > -1) {
      return Object.entries(assets).map(([key]) => {
        const backstopProps = {
          key,
          name: key,
          svgWidth,
          svgHeight,
          title
        };
        return<Icon {...backstopProps} />;
      });
    }
    return(<Icon {...props} />);
  });
