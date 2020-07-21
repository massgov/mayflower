import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, array } from '@storybook/addon-knobs';

import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';
import IconLink from '.';
import * as Icon from 'MayflowerReactBase/Icon';
import Link from 'MayflowerReactMolecules/Link';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('IconLink', (() => {
    const linkProps = {
      info: text('Link: info', 'Title info here', 'Link'),
      text: text('Link: text', 'Lorem ipsum dolor sit amet', 'Link'),
      href: text('Link: href', '#', 'Link')
    };
    const iconProps = {
      width: text('Icon: width', 13, 'Icon'),
      height: text('Icon: height', 13, 'Icon'),
      title: text('Icon: title', 'Icon Title Here', 'Icon'),
      classes: array('Icon: classes', ['ma__general-teaser__secondaryicon'], ' ', 'Icon')
    };
    // Capitalizes the name of each SVG icon to match
    // what SVGR names components.
    const component = select('Icon: name',
      Object.fromEntries(
        Object.entries(svgOptions).map(([key, value]) => [key[0].toUpperCase() + key.slice(1), value ? value[0].toUpperCase() + value.slice(1) : value])
        ),
      '',
      'Icon'
    );
    const SelectedComponent = Icon[component];
    const props = {
      wrapperClasses: array('IconLink: wrapperClasses', ['']),
      link: <Link {...linkProps} />
    };
    if (SelectedComponent) {
      props.icon = <SelectedComponent {...iconProps} />;
    }
    return(<IconLink {...props} />);
  }));
