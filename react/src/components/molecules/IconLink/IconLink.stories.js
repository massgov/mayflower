import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, array } from '@storybook/addon-knobs';

import { svgOptions } from '../../atoms/Icon/Icon.knob.options';
import IconLink from '.';
import { Icon, Link } from '../../../index';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('IconLink', (() => {
    const linkProps = {
      info: text('Link: info', 'Title info here', 'Link'),
      text: text('Link: text', 'Lorem ipsum dolor sit amet', 'Link'),
      href: text('Link: href', '#', 'Link')
    };
    const iconProps = {
      name: select('Icon: name', svgOptions, '', 'Icon'),
      svgWidth: text('Icon: svgWidth', 13, 'Icon'),
      svgHeight: text('Icon: svgHeight', 13, 'Icon'),
      title: text('Icon: title', 'Icon Title Here', 'Icon'),
      classes: array('Icon: classes', ['ma__general-teaser__secondaryicon'], ' ', 'Icon')
    };
    const props = {
      icon: <Icon {...iconProps} />,
      wrapperClasses: array('IconLink: wrapperClasses', ['']),
      link: <Link {...linkProps} />
    };
    return(<IconLink {...props} />);
  }));
