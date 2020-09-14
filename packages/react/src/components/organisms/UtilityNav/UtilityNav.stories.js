import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, object, boolean } from '@storybook/addon-knobs';

import UtilityNav from './index';
import UtilityNavDocs from './UtilityNav.md';
import UtilityNavData from './UtilityNav.knob.options';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'UtilityNav', () => {
      const googleLanguages = boolean('UtilityNav googleLanguages', false);
      const newProps = {
        items: [],
        googleLanguages
      };
      newProps.items = UtilityNavData.items.map((item, itemIndex) => {
        const icons = {
          building: 'building',
          login: 'login'
        };
        const storyProps = {
          text: text(`UtilityNav item${itemIndex}: text`, item.text, `Item ${itemIndex}`),
          ariaLabelText: text(`UtilityNav item${itemIndex}: ariaLabelText`, item.ariaLabelText, `Item ${itemIndex}`),
          closeText: text(`UtilityNav item${itemIndex}: closeText`, item.closeText, `Item ${itemIndex}`),
          href: text(`UtilityNav item${itemIndex}: href`, item.href, `Item ${itemIndex}`),
          panel: object(`UtilityNav item${itemIndex}: panel`, item.panel, `Item ${itemIndex}`)
        };
        storyProps.icon = select(`UtilityNav item${itemIndex}: icons`, icons, item.icon, `Item ${itemIndex}`);
        return(storyProps);
      });
      return(<UtilityNav {...newProps} />);
    },
    { info: UtilityNavDocs }
  );
