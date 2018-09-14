import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs/react';

import Icon from './index';

storiesOf('atoms/icons', module).addDecorator(withKnobs)
  .add('Icon', () => {
    // This needs to be dynamic somehow.
    const assets = {
      arrow: 'arrow.svg',
      arrowbent: 'arrowbent.svg',
      building: 'building.svg',
      chevron: 'chevron.svg',
      circlechevron: 'circlechevron.svg',
      fax: 'fax.svg',
      inputerror: 'inputerror.svg',
      inputsuccess: 'inputsuccess.svg',
      laptop: 'laptop.svg',
      latlonglobe: 'latlonglobe.svg',
      login: 'login.svg',
      marker: 'marker.svg',
      opennow: 'opennow.svg',
      phone: 'phone.svg',
      questionmark: 'questionmark.svg',
      search: 'search.svg',
      wheelchair: 'wheelchair.svg',
      xlxs: 'xlxs.svg',
      docx: 'docx.svg',
      pdf: 'pdf.svg',
      generic: 'generic.svg'
    };
    const options = {
      '': 'Choose',
      ...assets
    };
    const name = select('Icon.name', options, '');
    const svgWidth = text('Icon.svgWidth', 40);
    const svgHeight = text('Icon.svgHeight', 40);
    const title = text('Icon.title', 'Icon Title Here');
    const props = {
      name,
      svgWidth,
      svgHeight,
      title
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
