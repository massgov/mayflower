import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, array, boolean, color, number } from '@storybook/addon-knobs';
import { assets, svgOptions } from './Icon.knob.options';
import * as Icon from './index';
import IconDisplay from './IconDisplay';

storiesOf('brand/icons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Icon', () => {
    // This needs to be dynamic somehow.

    const width = text('width', 40);
    const height = text('height', 40);
    const title = text('title', 'Icon Title Here');
    const classes = array('classes', ['']);
    const ariaHidden = boolean('ariaHidden', false);
    const fill = color('fill color', '#000');
    const props = {
      width,
      height,
      title,
      classes,
      ariaHidden,
      fill
    };
    // Capitalizes the name of each SVG icon to match
    // what SVGR names components.
    const component = select('name',
      Object.fromEntries(
        Object.entries(svgOptions).map(([key, value]) => [`Icon${key[0].toUpperCase() + key.slice(1)}`, value ? `Icon${value[0].toUpperCase() + value.slice(1)}` : value])
        ),
        'IconAlert'
    );
    const SelectedComponent = Icon[component];
    if (window.location.search.indexOf('backstop') > -1) {
      return Object.entries(assets).map(([key]) => {
        const backstopProps = {
          key,
          width,
          height,
          title
        };
        const BackstopIcon = Icon[`Icon${key[0].toUpperCase() + key.slice(1)}`];
        return<BackstopIcon {...backstopProps} />;
      });
    }
    return(<SelectedComponent {...props} />);
  });

storiesOf('brand/icons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('All Icons', () => {
    const width = number('width', 40);
    const height = number('height', 40);
    const title = text('title', 'Icon Title Here');
    const classes = array('classes', ['']);
    const ariaHidden = boolean('ariaHidden', false);
    const fill = color('fill color', '#000');
    const allIconProps = Object.keys(assets).map((key) => ({
      key,
      name: key,
      width,
      height,
      title,
      classes,
      ariaHidden,
      fill
    }));
    return(
      <ul className="sg-icons">
        {
          allIconProps.map((iconProp) => (
            <IconDisplay {...iconProp} key={`icon_${iconProp.key}`} />
          ))
        }
      </ul>
    );
  });
