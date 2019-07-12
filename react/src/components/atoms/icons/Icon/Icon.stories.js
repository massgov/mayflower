import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, array, boolean } from '@storybook/addon-knobs';
import { assets, svgOptions } from './Icon.knob.options';
import Icon from './index';

storiesOf('atoms/icons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Icon', () => {
    // This needs to be dynamic somehow.

    const name = select('name', svgOptions, 'alert');
    const svgWidth = text('svgWidth', 40);
    const svgHeight = text('svgHeight', 40);
    const title = text('title', 'Icon Title Here');
    const classes = array('classes', ['']);
    const ariaHidden = boolean('ariaHidden', false);
    const props = {
      name,
      svgWidth,
      svgHeight,
      title,
      classes,
      ariaHidden
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
