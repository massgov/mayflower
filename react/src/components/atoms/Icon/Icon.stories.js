import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, array, boolean, color } from '@storybook/addon-knobs';
import { assets, svgOptions } from './Icon.knob.options';
import Icon from './index';


storiesOf('atoms', module)
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

storiesOf('brand|icons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Icons', () => {
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
    const allIconProps = Object.keys(assets).map((key) => ({
      key,
      name: key,
      svgWidth,
      svgHeight,
      title
    }));
    return(
      <ul className="sg-colors">
        {
          allIconProps.map((iconProp) => (
            <li style={{ width: 300, margin: 10, padding: 10 }}>
              <div className="sg-info">
                <Icon {...iconProp} />
                <span>{iconProp.name}</span>

              </div>
            </li>
          ))
        }
      </ul>
    );
  });
