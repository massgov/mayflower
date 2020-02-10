import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, array, boolean, color, number, button } from '@storybook/addon-knobs';
import { assets, svgOptions } from './Icon.knob.options';
import Icon from './index';
import IconDisplay from './IconDisplay';

storiesOf('brand|icons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Icon', () => {
    // This needs to be dynamic somehow.
    const name = select('name', svgOptions, 'alert');
    const svgWidth = text('svgWidth', 40);
    const svgHeight = text('svgHeight', 40);
    const title = text('title', 'Icon Title Here');
    const classes = array('classes', ['']);
    const ariaHidden = boolean('ariaHidden', false);
    const fill = color('fill color', '#000');
    const props = {
      name,
      svgWidth,
      svgHeight,
      title,
      classes,
      ariaHidden,
      fill
    };
    if (window.location.search.indexOf('backstop') > -1) {
      return Object.entries(assets).map(([key]) => {
        const backstopProps = {
          name: key,
          svgWidth,
          svgHeight,
          title
        };
        return<Icon {...backstopProps} />;
      });
    }
    return(<Icon {...props} key={name} />);
  });

storiesOf('brand|icons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('All Icons', () => {
    const [key, setKey] = useState(Math.random(100));
    const svgWidth = number('svgWidth', 40);
    const svgHeight = number('svgHeight', 40);
    const title = text('title', 'Icon Title Here');
    const classes = array('classes', ['']);
    const ariaHidden = boolean('ariaHidden', false);
    const fill = color('fill color', '#000');
    const allIconProps = Object.keys(assets).map((k) => ({
      k,
      name: k,
      svgWidth,
      svgHeight,
      title,
      classes,
      ariaHidden,
      fill
    }));
    const test = button('update', () => {
      const randomKey = Math.random(100);
      setKey(randomKey);
      return randomKey;
    });
    return(
      <ul className="sg-icons">
        {
          allIconProps.map((iconProp) => (
            <IconDisplay {...iconProp} key={`icon_${iconProp.k}`} random={key} />
          ))
        }
      </ul>
    );
  });
