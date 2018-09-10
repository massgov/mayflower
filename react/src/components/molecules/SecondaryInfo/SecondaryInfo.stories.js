import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select, array } from '@storybook/addon-knobs/react';

import SecondaryInfo from '.';
import { DecorativeLink } from '../../../index';

storiesOf('molecules/SecondaryInfo', module).addDecorator(withKnobs)
  .add('SecondaryInfo', withInfo('<div></div>')(() => {
    const decorProps = {
      info: text('SecondaryInfo.linkedTitle.info', 'Title info here'),
      text: text('SecondaryInfo.linkedTitle.text', 'Lorem ipsum dolor sit amet'),
      href: text('SecondaryInfo.linkedTitle.href', '#'),
      showFileIcon: boolean('SecondaryInfo.linkedTitle.showFileIcon', true)
    };
    const props = {
      icon: select('SecondaryInfo.icon', {
        marker: 'SvgMarker (Address Icon)',
        phone: 'SvgPhone (Phone Icon)',
        laptop: 'SvgLaptop (Laptop Icon)',
        fax: 'SvgFax (FaxIcon)'
      }, 'marker'),
      iconClasses: array('SecondaryInfo.iconClasses', ['ma__general-teaser__secondaryicon']),
      linkedTitle: <DecorativeLink {...decorProps} />
    };
    return(<SecondaryInfo {...props} />);
  }));
