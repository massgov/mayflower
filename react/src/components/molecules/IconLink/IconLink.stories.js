import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, array } from '@storybook/addon-knobs';

import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';
import IconLink from '.';
import { Icon, Link } from '../../../index';

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('IconLink', (() => {
    const linkProps = {
      info: text('IconLink.link.info', 'Title info here'),
      text: text('IconLink.link.text', 'Lorem ipsum dolor sit amet'),
      href: text('IconLink.link.href', '#')
    };
    const iconProps = {
      name: select('Icon.name', svgOptions, ''),
      svgWidth: text('Icon.svgWidth', 13),
      svgHeight: text('Icon.svgHeight', 13),
      title: text('Icon.title', 'Icon Title Here'),
      classes: array('IconLink.iconClasses', ['ma__general-teaser__secondaryicon'])
    };
    const props = {
      icon: <Icon {...iconProps} />,
      wrapperClasses: array('IconLink.wrapperClasses', ['']),
      link: <Link {...linkProps} />
    };
    return(<IconLink {...props} />);
  }));
