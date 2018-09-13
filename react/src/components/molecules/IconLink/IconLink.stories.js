import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, array } from '@storybook/addon-knobs/react';

import IconLink from '.';
import { Link } from '../../../index';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('IconLink', withInfo('<div></div>')(() => {
    const linkProps = {
      info: text('IconLink.link.info', 'Title info here'),
      text: text('IconLink.link.text', 'Lorem ipsum dolor sit amet'),
      href: text('IconLink.link.href', '#')
    };
    const props = {
      icon: select('IconLink.icon', {
        marker: 'SvgMarker (Address Icon)',
        phone: 'SvgPhone (Phone Icon)',
        laptop: 'SvgLaptop (Laptop Icon)',
        fax: 'SvgFax (FaxIcon)'
      }, 'marker'),
      iconClasses: array('IconLink.iconClasses', ['ma__general-teaser__secondaryicon']),
      wrapperClasses: array('IconLink.wrapperClasses', ['']),
      link: <Link {...linkProps} />
    };
    return(<IconLink {...props} />);
  }));
